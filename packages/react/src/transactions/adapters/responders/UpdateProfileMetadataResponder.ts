import { Modifiers } from '@apollo/client/cache/core/types/common';
import {
  AttributeFragment,
  GetProfileDocument,
  GetProfileQuery,
  GetProfileQueryVariables,
  LensApolloClient,
  Maybe,
  ProfileFragment,
  ProfileFragmentDoc,
} from '@lens-protocol/api-bindings';
import {
  ProfileAttributeValue,
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
  implements ITransactionResponder<UpdateProfileDetailsRequest>
{
  private snapshots = new Map<UpdateProfileDetailsRequest, ProfileFragment | null>();

  constructor(private readonly apolloClient: LensApolloClient) {}

  private get apolloCache() {
    return this.apolloClient.cache;
  }

  async prepare({ request }: TransactionData<UpdateProfileDetailsRequest>) {
    const profileIdentifier = this.apolloCache.identify({
      __typename: 'Profile',
      id: request.profileId,
    });

    const snapshot = this.apolloCache.readFragment<ProfileFragment>({
      id: profileIdentifier,
      fragmentName: 'Profile',
      fragment: ProfileFragmentDoc,
    });

    this.snapshots.set(request, snapshot);

    this.apolloCache.modify({
      id: profileIdentifier,
      fields: this.resolveOptimisticCacheUpdate(request),
      optimistic: true,
    });
  }

  async rollback({ request }: TransactionData<UpdateProfileDetailsRequest>) {
    const profileIdentifier = this.apolloCache.identify({
      __typename: 'Profile',
      id: request.profileId,
    });

    const snapshot = this.snapshots.get(request);

    if (snapshot) {
      this.apolloCache.writeFragment({
        id: profileIdentifier,
        fragment: ProfileFragmentDoc,
        fragmentName: 'Profile',
        data: snapshot,
      });
    }
  }

  async commit({ request }: BroadcastedTransactionData<UpdateProfileDetailsRequest>) {
    // ensure update of Profile in cache
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

  private resolveOptimisticCacheUpdate(request: UpdateProfileDetailsRequest): Modifiers {
    return {
      name: () => {
        return request.name;
      },
      bio: () => {
        return request.bio;
      },
      coverPicture: () => {
        return {
          __typename: 'MediaSet',
          original: {
            __typename: 'Media',
            url: request.coverPicture,
            width: null,
            height: null,
            mimeType: null,
          },
          medium: null,
          small: null,
        };
      },
      attributes: (existing: Maybe<AttributeFragment[]>) => {
        const acc = new Map<string, AttributeFragment>();

        (existing ?? []).forEach((attr) => {
          acc.set(attr.key, attr);
        });

        for (const [key, value] of Object.entries(request.attributes ?? {})) {
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
