import { AttributeFragment, Maybe, ProfileFragment } from '@lens-protocol/api-bindings';
import {
  ProfileAttributeValue,
  UpdateProfileDetailsRequest,
  PartialAttributesUpdate,
} from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastedTransactionData,
  ITransactionResponder,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';

import { IProfileCacheManager } from '../IProfileCacheManager';

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

function mergeAttributes(
  existing: Maybe<AttributeFragment[]>,
  update: PartialAttributesUpdate,
): AttributeFragment[] {
  const acc = new Map<string, AttributeFragment>();

  (existing ?? []).forEach((attr) => {
    acc.set(attr.key, attr);
  });

  for (const [key, value] of Object.entries(update)) {
    if (value === null) {
      acc.delete(key);
    } else {
      acc.set(key, newAttributeFragment(key, value));
    }
  }
  return Array.from(acc.values());
}

export class UpdateProfileMetadataResponder
  implements ITransactionResponder<UpdateProfileDetailsRequest>
{
  private snapshots = new Map<UpdateProfileDetailsRequest, ProfileFragment | null>();

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
                height: null,
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

  async commit({ request }: BroadcastedTransactionData<UpdateProfileDetailsRequest>) {
    await this.profileCacheManager.refreshProfile(request.profileId);
    this.snapshots.delete(request);
  }
}
