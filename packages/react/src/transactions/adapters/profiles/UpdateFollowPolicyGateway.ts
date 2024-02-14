import {
  CreateSetFollowModuleBroadcastItemResult,
  CreateSetFollowModuleTypedDataData,
  CreateSetFollowModuleTypedDataDocument,
  CreateSetFollowModuleTypedDataVariables,
  RelaySuccess,
  SafeApolloClient,
  SetFollowModuleData,
  SetFollowModuleDocument,
  SetFollowModuleVariables,
  omitTypename,
  resolveFollowModuleInput,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { NativeTransaction, Nonce } from '@lens-protocol/domain/entities';
import { UpdateFollowPolicyRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastingError,
  IDelegatedTransactionGateway,
  ISignedOnChainGateway,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, Data, PromiseResult, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { RequiredConfig } from '../../../config';
import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { IProviderFactory } from '../../../wallet/adapters/IProviderFactory';
import { AbstractContractCallGateway, ContractCallDetails } from '../AbstractContractCallGateway';
import { ITransactionFactory } from '../ITransactionFactory';
import { handleRelayError } from '../relayer';

export class UpdateFollowPolicyGateway
  extends AbstractContractCallGateway<UpdateFollowPolicyRequest>
  implements
    IDelegatedTransactionGateway<UpdateFollowPolicyRequest>,
    ISignedOnChainGateway<UpdateFollowPolicyRequest>
{
  constructor(
    config: RequiredConfig,
    providerFactory: IProviderFactory,
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<UpdateFollowPolicyRequest>,
  ) {
    super(config, providerFactory);
  }

  async createDelegatedTransaction(
    request: UpdateFollowPolicyRequest,
  ): PromiseResult<NativeTransaction<UpdateFollowPolicyRequest>, BroadcastingError> {
    const result = await this.relayWithProfileManager(request);

    if (result.isFailure()) return result;

    const transaction = this.transactionFactory.createNativeTransaction({
      chainType: ChainType.POLYGON,
      id: v4(),
      request,
      relayerTxId: result.value.txId,
      txHash: result.value.txHash,
    });

    return success(transaction);
  }

  async createUnsignedProtocolCall(
    request: UpdateFollowPolicyRequest,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<UpdateFollowPolicyRequest>> {
    const result = await this.createTypedData(request, nonce);

    return UnsignedProtocolCall.create({
      id: result.id,
      request,
      typedData: omitTypename(result.typedData),
    });
  }

  protected override async createCallDetails(
    request: UpdateFollowPolicyRequest,
  ): Promise<ContractCallDetails> {
    const result = await this.createTypedData(request);
    return this.createSetFollowModuleCallDetails(result);
  }

  private async relayWithProfileManager(
    request: UpdateFollowPolicyRequest,
  ): PromiseResult<RelaySuccess, BroadcastingError> {
    const { data } = await this.apolloClient.mutate<SetFollowModuleData, SetFollowModuleVariables>({
      mutation: SetFollowModuleDocument,
      variables: {
        request: {
          followModule: resolveFollowModuleInput(request.policy),
        },
      },
    });

    if (data.result.__typename === 'LensProfileManagerRelayError') {
      return handleRelayError(data.result);
    }

    return success(data.result);
  }

  private async createTypedData(request: UpdateFollowPolicyRequest, nonce?: Nonce) {
    const { data } = await this.apolloClient.mutate<
      CreateSetFollowModuleTypedDataData,
      CreateSetFollowModuleTypedDataVariables
    >({
      mutation: CreateSetFollowModuleTypedDataDocument,
      variables: {
        request: {
          followModule: resolveFollowModuleInput(request.policy),
        },
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });

    return data.result;
  }

  private createSetFollowModuleCallDetails(
    result: CreateSetFollowModuleBroadcastItemResult,
  ): ContractCallDetails {
    const contract = lensHub(result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('setFollowModule', [
      result.typedData.message.profileId,
      result.typedData.message.followModule,
      result.typedData.message.followModuleInitData,
    ]);
    return {
      contractAddress: result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
