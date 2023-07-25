import { Attribute, Maybe, Profile } from '@lens-protocol/api-bindings';
import {
  ProfileAttributeValue,
  UpdateProfileDetailsRequest,
  PartialAttributesUpdate,
} from '@lens-protocol/domain/use-cases/profile';
import {
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';

import { IProfileCacheManager } from '../IProfileCacheManager';

function attribute(key: string, value: ProfileAttributeValue): Attribute {
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

function mergeAttributes(
  existing: Maybe<Attribute[]>,
  update: PartialAttributesUpdate,
): Attribute[] {
  const acc = new Map<string, Attribute>();

  (existing ?? []).forEach((attr) => {
    acc.set(attr.key, attr);
  });

  for (const [key, value] of Object.entries(update)) {
    if (value === null) {
      acc.delete(key);
    } else {
      acc.set(key, attribute(key, value));
    }
  }
  return Array.from(acc.values());
}

export class UpdateProfileMetadataResponder
  implements ITransactionResponder<UpdateProfileDetailsRequest>
{
  private snapshots = new Map<UpdateProfileDetailsRequest, Profile | null>();

  constructor(private readonly profileCacheManager: IProfileCacheManager) {}

  async prepare({ request }: TransactionData<UpdateProfileDetailsRequest>) {
    this.profileCacheManager.updateProfile(request.profileId, (current) => {
      this.snapshots.set(request, current);

      return {
        ...current,
        name: request.name,
        bio: request.bio ?? current.bio,
        coverPicture: request.coverPicture
          ? {
              __typename: 'MediaSet',
              original: {
                __typename: 'Media',
                url: request.coverPicture,
                // we don't know the following (yet), not important for now
                altTag: null,
                cover: null,
                mimeType: null,
              },
              optimized: {
                __typename: 'Media',
                url: request.coverPicture,
                // we don't know the following (yet), not important for now
                altTag: null,
                cover: null,
                mimeType: null,
              },
            }
          : current.coverPicture,
        __attributes: request.attributes
          ? mergeAttributes(current.__attributes, request.attributes)
          : current.__attributes,
      };
    });
  }

  async rollback({ request }: TransactionData<UpdateProfileDetailsRequest>) {
    const snapshot = this.snapshots.get(request);

    if (snapshot) {
      this.profileCacheManager.updateProfile(request.profileId, () => snapshot);
    }
  }

  async commit({ request }: TransactionData<UpdateProfileDetailsRequest>) {
    await this.profileCacheManager.refreshProfile(request.profileId);
    this.snapshots.delete(request);
  }
}
