import {
  CreateFollowTypedDataData,
  CreateFollowTypedDataDocument,
  CreateFollowTypedDataVariables,
  Follow,
  LensApolloClient,
  ProxyActionData,
  ProxyActionDocument,
  ProxyActionRequest,
  ProxyActionVariables,
  moduleFeeAmountParams,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { Nonce, ProxyTransaction } from '@lens-protocol/domain/entities';
import {
  FollowRequest,
  UnconstrainedFollowRequest,
  isPaidFollowRequest,
  isProfileOwnerFollowRequest,
} from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastingError,
  IOnChainProtocolCallGateway,
  ISignlessSubsidizedCallRelayer,
} from '@lens-protocol/domain/use-cases/transactions';
import {
  ChainType,
  ILogger,
  PromiseResult,
  assertError,
  failure,
  getID,
  success,
} from '@lens-protocol/shared-kernel';

import { UnsignedProtocolCall } from '../../wallet/adapters/ConcreteWallet';
import { ITransactionFactory } from './ITransactionFactory';
import { ProxyReceipt } from './ProxyReceipt';
import { Data, SelfFundedProtocolTransactionRequest } from './SelfFundedProtocolTransactionRequest';

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

export class FollowProfilesCallGateway
  implements
    IOnChainProtocolCallGateway<FollowRequest>,
    ISignlessSubsidizedCallRelayer<UnconstrainedFollowRequest>
{
  constructor(
    private apolloClient: LensApolloClient,
    private factory: ITransactionFactory<UnconstrainedFollowRequest>,
    private logger: ILogger,
  ) {}

  async createProxyTransaction(
    request: UnconstrainedFollowRequest,
    nonce?: Nonce,
  ): PromiseResult<ProxyTransaction<UnconstrainedFollowRequest>, BroadcastingError> {
    const proxyReceipt = await this.proxy(request, nonce);

    if (proxyReceipt.isFailure()) {
      return failure(proxyReceipt.error);
    }

    return success(
      this.factory.createProxyTransaction({
        chainType: ChainType.POLYGON,
        id: getID(),
        request,
        proxyId: proxyReceipt.value.proxyId,
      }),
    );
  }

  async createUnsignedProtocolCall(
    request: FollowRequest,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<FollowRequest>> {
    const data = await this.createFollowTypedData(request, nonce);

    return UnsignedProtocolCall.create({
      id: data.result.id,
      request,
      typedData: omitTypename(data.result.typedData),
      fallback: this.createRequestFallback(request, data),
    });
  }

  private async proxy(
    request: UnconstrainedFollowRequest,
    nonce?: Nonce,
  ): PromiseResult<ProxyReceipt, BroadcastingError> {
    try {
      const broadcastResult = await this.broadcast({
        follow: {
          freeFollow: {
            profileId: request.profileId,
          },
        },
      });
      return success(broadcastResult);
    } catch (error) {
      assertError(error);
      this.logger.error(error, 'It was not possible to relay the transaction');
      return failure(
        new BroadcastingError(
          error.message,
          this.createRequestFallback(request, await this.createFollowTypedData(request, nonce)),
        ),
      );
    }
  }

  private async broadcast(request: ProxyActionRequest): Promise<ProxyReceipt> {
    const { data } = await this.apolloClient.mutate<ProxyActionData, ProxyActionVariables>({
      mutation: ProxyActionDocument,
      variables: {
        request,
      },
    });

    return { proxyId: data.result };
  }

  private async createFollowTypedData(
    request: FollowRequest,
    nonce?: Nonce,
  ): Promise<CreateFollowTypedDataData> {
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

    return data;
  }

  private createRequestFallback(
    request: FollowRequest,
    data: CreateFollowTypedDataData,
  ): SelfFundedProtocolTransactionRequest<FollowRequest> {
    const contract = lensHub(data.result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('follow', [
      data.result.typedData.value.profileIds,
      data.result.typedData.value.datas,
    ]);
    return {
      ...request,
      contractAddress: data.result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
