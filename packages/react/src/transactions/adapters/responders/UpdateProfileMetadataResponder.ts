import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { Modifiers } from '@apollo/client/cache/core/types/common';
import {
  AttributeFragment,
  GetProfileDocument,
  GetProfileQuery,
  GetProfileQueryVariables,
  Maybe,
  ProfileFieldsFragment,
  ProfileFieldsFragmentDoc,
} from '@lens-protocol/api-bindings';
import { TransactionKind } from '@lens-protocol/domain/entities';
import {
  ProfileAttributeValue,
  UpdateCoverImageRequest,
  UpdateProfileDetailsRequest,
} from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastedTransactionData,
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';

function newAttributeFragment(key: string, value: ProfileAttributeValue): AttributeFragment {
  if (value instanceof Date) {
    return {
      __typename: 'Attribute',
      key,
      value: value.toISOString(),
      displayType: 'date',
    };
  }

  return {
    __typename: 'Attribute',
    key,
    value: value.toString(),
    displayType: typeof value,
  };
}

export class UpdateProfileMetadataResponder
  implements ITransactionResponder<UpdateCoverImageRequest | UpdateProfileDetailsRequest>
{
  private snapshots = new Map<
    UpdateCoverImageRequest | UpdateProfileDetailsRequest,
    ProfileFieldsFragment | null
  >();

  constructor(private readonly apolloClient: ApolloClient<NormalizedCacheObject>) {}

  private get apolloCache() {
    return this.apolloClient.cache;
  }

  async prepare({
    request,
  }: TransactionData<UpdateCoverImageRequest | UpdateProfileDetailsRequest>) {
    const profileIdentifier = this.apolloCache.identify({
      __typename: 'Profile',
      id: request.profileId,
    });

    const snapshot = this.apolloCache.readFragment<ProfileFieldsFragment>({
      id: profileIdentifier,
      fragmentName: 'ProfileFields',
      fragment: ProfileFieldsFragmentDoc,
    });

    this.snapshots.set(request, snapshot);

    this.apolloCache.modify({
      id: profileIdentifier,
      fields: this.resolveOptimisticCacheUpdate(request),
      optimistic: true,
    });
  }

  async rollback({
    request,
  }: TransactionData<UpdateCoverImageRequest | UpdateProfileDetailsRequest>) {
    const profileIdentifier = this.apolloCache.identify({
      __typename: 'Profile',
      id: request.profileId,
    });

    const snapshot = this.snapshots.get(request);

    if (snapshot) {
      this.apolloCache.writeFragment({
        id: profileIdentifier,
        fragment: ProfileFieldsFragmentDoc,
        fragmentName: 'ProfileFields',
        data: snapshot,
      });
    }
  }

  async commit({
    request,
  }: BroadcastedTransactionData<UpdateCoverImageRequest | UpdateProfileDetailsRequest>) {
    // updates Profile in cache
    await this.apolloClient.query<GetProfileQuery, GetProfileQueryVariables>({
      query: GetProfileDocument,
      variables: {
        request: {
          profileId: request.profileId,
        },
        observerId: request.profileId,
      },
      fetchPolicy: 'network-only',
    });

    this.snapshots.delete(request);
  }

  private resolveOptimisticCacheUpdate(
    request: UpdateCoverImageRequest | UpdateProfileDetailsRequest,
  ): Modifiers {
    switch (request.kind) {
      case TransactionKind.UPDATE_COVER_IMAGE:
        return {
          coverPicture: () => {
            return {
              __typename: 'MediaSet',
              original: {
                __typename: 'Media',
                url: request.url,
                width: null,
                height: null,
                mimeType: null,
              },
              medium: null,
              small: null,
            };
          },
        };
      case TransactionKind.UPDATE_PROFILE_DETAILS:
        return {
          name: () => {
            return request.details.name;
          },
          bio: () => {
            return request.details.bio;
          },
          attributes: (existing: Maybe<AttributeFragment[]>) => {
            const acc = new Map<string, AttributeFragment>();

            (existing ?? []).forEach((attr) => {
              acc.set(attr.key, attr);
            });

            for (const [key, value] of Object.entries(request.details.attributes)) {
              if (value === null) {
                acc.delete(key);
              } else {
                acc.set(key, newAttributeFragment(key, value));
              }
            }
            return Array.from(acc.values());
          },
        };
    }
  }
}
