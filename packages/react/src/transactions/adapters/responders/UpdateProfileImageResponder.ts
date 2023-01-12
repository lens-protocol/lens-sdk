import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { MediaSetFragment } from '@lens-protocol/api-bindings';
import {
  UpdateOffChainProfileImageRequest,
  UpdateProfileImageRequest,
} from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastedTransactionData,
  ITransactionResponder,
} from '@lens-protocol/domain/use-cases/transactions';

function isUpdateOffChainProfileImageRequest(
  request: UpdateProfileImageRequest,
): request is UpdateOffChainProfileImageRequest {
  return 'url' in request;
}

export class UpdateProfileImageResponder
  implements ITransactionResponder<UpdateProfileImageRequest>
{
  constructor(private apolloCache: ApolloCache<NormalizedCacheObject>) {}

  async commit({ request }: BroadcastedTransactionData<UpdateProfileImageRequest>) {
    if (isUpdateOffChainProfileImageRequest(request)) {
      const profileIdentifier = this.apolloCache.identify({
        __typename: 'Profile',
        id: request.profileId,
      });
      this.apolloCache.modify({
        id: profileIdentifier,
        fields: {
          picture(oldPicture: MediaSetFragment) {
            return {
              ...oldPicture,
              original: {
                ...oldPicture.original,
                url: request.url,
              },
            };
          },
        },
      });
    }
  }
}
