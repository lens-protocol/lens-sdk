import {
  CreateFollowTypedDataDocument,
  CreateFollowTypedDataData,
  CreateFollowTypedDataVariables,
  Follow,
  LensApolloClient,
  moduleFeeAmountParams,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { Nonce } from '@lens-protocol/domain/entities';
import {
  FollowRequest,
  IFollowProfilesCallGateway,
  isPaidFollowRequest,
  isProfileOwnerFollowRequest,
} from '@lens-protocol/domain/use-cases/profile';

import { UnsignedProtocolCall } from '../../wallet/adapters/ConcreteWallet';

function resolveProfileFollow(request: FollowRequest): Follow[] {
  if (isPaidFollowRequest(request)) {
    return [
      {
        profile: request.profileId,
        followModule: {
          feeFollowModule: {
            amount: moduleFeeAmountParams({ from: request.fee.amount }),
          },
        },
      },
    ];
  }
  if (isProfileOwnerFollowRequest(request)) {
    return [
      {
        profile: request.profileId,
        followModule: {
          profileFollowModule: {
            profileId: request.followerProfileId,
          },
        },
      },
    ];
  }
  return [{ profile: request.profileId }];
}

export class FollowProfilesCallGateway implements IFollowProfilesCallGateway {
  constructor(private apolloClient: LensApolloClient) {}

  async createUnsignedProtocolCall<T extends FollowRequest>(
    request: T,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<T>> {
    const { data } = await this.apolloClient.mutate<
      CreateFollowTypedDataData,
      CreateFollowTypedDataVariables
    >({
      mutation: CreateFollowTypedDataDocument,
      variables: {
        request: {
          follow: resolveProfileFollow(request),
        },
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });

    return UnsignedProtocolCall.create({
      contractAddress: data.result.typedData.domain.verifyingContract,
      functionName: 'followWithSig',
      id: data.result.id,
      request,
      typedData: omitTypename(data.result.typedData),
    });
  }
}
