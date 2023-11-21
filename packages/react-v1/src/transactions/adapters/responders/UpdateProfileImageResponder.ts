import {
  UpdateOffChainProfileImageRequest,
  UpdateProfileImageRequest,
} from '@lens-protocol/domain/use-cases/profile';
import {
  TransactionData,
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

  async prepare({ request }: TransactionData<UpdateProfileImageRequest>) {
    if (isUpdateOffChainProfileImageRequest(request)) {
      this.profileCacheManager.updateProfile(request.profileId, (current) => {
        return {
          ...current,
          picture: {
            __typename: 'MediaSet',
            original: {
              __typename: 'Media',
              url: request.url,
              // we don't know the following (yet), not important for now
              altTag: null,
              cover: null,
              mimeType: null,
            },
            optimized: {
              __typename: 'Media',
              url: request.url,
              // we don't know the following (yet), not important for now
              altTag: null,
              cover: null,
              mimeType: null,
            },
            thumbnail: {
              __typename: 'Media',
              url: request.url,
              // we don't know the following (yet), not important for now
              altTag: null,
              cover: null,
              mimeType: null,
            },
          },
        };
      });
    }
  }

  async commit({ request }: TransactionData<UpdateProfileImageRequest>) {
    await this.profileCacheManager.refreshProfile(request.profileId);
  }

  async rollback({ request }: TransactionData<UpdateProfileImageRequest>) {
    await this.profileCacheManager.refreshProfile(request.profileId);
  }
}
