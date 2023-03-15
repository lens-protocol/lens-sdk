import {
  UpdateOffChainProfileImageRequest,
  UpdateProfileImageRequest,
} from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastedTransactionData,
  ITransactionResponder,
} from '@lens-protocol/domain/use-cases/transactions';

import { IProfileCacheManager } from '../IProfileCacheManager';

function isUpdateOffChainProfileImageRequest(
  request: UpdateProfileImageRequest,
): request is UpdateOffChainProfileImageRequest {
  return 'url' in request;
}

export class UpdateProfileImageResponder
  implements ITransactionResponder<UpdateProfileImageRequest>
{
  constructor(private readonly profileCacheManager: IProfileCacheManager) {}

  async prepare({ request }: BroadcastedTransactionData<UpdateProfileImageRequest>) {
    if (isUpdateOffChainProfileImageRequest(request)) {
      this.profileCacheManager.updateProfile(request.profileId, (current) => {
        return {
          ...current,
          picture: {
            __typename: 'MediaSet',
            original: {
              __typename: 'Media',
              url: request.url,
              mimeType: null, // we don't know (yet), not important for now
            },
          },
        };
      });
    }
  }

  async commit({ request }: BroadcastedTransactionData<UpdateProfileImageRequest>) {
    await this.profileCacheManager.refreshProfile(request.profileId);
  }

  async rollback({ request }: BroadcastedTransactionData<UpdateProfileImageRequest>) {
    await this.profileCacheManager.refreshProfile(request.profileId);
  }
}
