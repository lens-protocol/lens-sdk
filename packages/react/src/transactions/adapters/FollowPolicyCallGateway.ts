import {
  omitTypename,
  CreateSetFollowModuleTypedDataDocument,
  CreateSetFollowModuleTypedDataData,
  CreateSetFollowModuleTypedDataVariables,
  LensApolloClient,
} from '@lens-protocol/api-bindings';
import { Nonce } from '@lens-protocol/domain/entities';
import {
  FollowPolicyType,
  IFollowPolicyCallGateway,
  UpdateFollowPolicyRequest,
} from '@lens-protocol/domain/use-cases/profile';

import { UnsignedLensProtocolCall } from '../../wallet/adapters/ConcreteWallet';

function buildFollowModuleRequest(request: UpdateFollowPolicyRequest) {
  switch (request.policy.type) {
    case FollowPolicyType.CHARGE:
      return {
        feeFollowModule: {
          amount: {
            currency: request.policy.amount.asset.address,
            value: request.policy.amount.toSignificantDigits(),
          },
          recipient: request.policy.recipient,
        },
      };
    case FollowPolicyType.ANYONE:
      return {
        freeFollowModule: true,
      };
    case FollowPolicyType.NO_ONE:
      return {
        revertFollowModule: true,
      };
    case FollowPolicyType.ONLY_PROFILE_OWNERS:
      return {
        profileFollowModule: true,
      };
  }
}

export class FollowPolicyCallGateway implements IFollowPolicyCallGateway {
  constructor(private apolloClient: LensApolloClient) {}

  async createUnsignedProtocolCall<T extends UpdateFollowPolicyRequest>(
    request: T,
    nonce?: Nonce,
  ): Promise<UnsignedLensProtocolCall<T>> {
    const { data } = await this.apolloClient.mutate<
      CreateSetFollowModuleTypedDataData,
      CreateSetFollowModuleTypedDataVariables
    >({
      mutation: CreateSetFollowModuleTypedDataDocument,
      variables: {
        request: {
          profileId: request.profileId,
          followModule: buildFollowModuleRequest(request),
        },
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });

    return new UnsignedLensProtocolCall(
      data.result.id,
      request,
      omitTypename(data.result.typedData),
    );
  }
}
