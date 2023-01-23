import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  GetProfileDocument,
  GetProfileQuery,
  GetProfileQueryVariables,
  MediaSetFragment,
} from '@lens-protocol/api-bindings';
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
  constructor(private readonly client: ApolloClient<NormalizedCacheObject>) {}

  async prepare({ request }: BroadcastedTransactionData<UpdateProfileImageRequest>) {
    if (isUpdateOffChainProfileImageRequest(request)) {
      const profileIdentifier = this.client.cache.identify({
        __typename: 'Profile',
        id: request.profileId,
      });
      this.client.cache.modify({
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

  async commit({ request }: BroadcastedTransactionData<UpdateProfileImageRequest>) {
    await this.client.query<GetProfileQuery, GetProfileQueryVariables>({
      query: GetProfileDocument,
      variables: {
        request: { profileId: request.profileId },
        observerId: request.profileId,
      },
      fetchPolicy: 'network-only',
    });
  }

  async rollback({ request }: BroadcastedTransactionData<UpdateProfileImageRequest>) {
    // we don't know the previous profile image url, so just query the profile again
    await this.client.query<GetProfileQuery, GetProfileQueryVariables>({
      query: GetProfileDocument,
      variables: {
        request: { profileId: request.profileId },
        observerId: request.profileId,
      },
      fetchPolicy: 'network-only',
    });
  }
}
