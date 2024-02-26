import {
  CreateUnlinkHandleFromProfileBroadcastItemResult,
  CreateUnlinkHandleFromProfileTypedDataData,
  CreateUnlinkHandleFromProfileTypedDataDocument,
  CreateUnlinkHandleFromProfileTypedDataVariables,
  RelaySuccess,
  SafeApolloClient,
  UnlinkHandleFromProfileData,
  UnlinkHandleFromProfileDocument,
  UnlinkHandleFromProfileVariables,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { lensTokenHandleRegistry } from '@lens-protocol/blockchain-bindings';
import { NativeTransaction, Nonce } from '@lens-protocol/domain/entities';
import { UnlinkHandleRequest } from '@lens-protocol/domain/use-cases/profile';
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

export class UnlinkHandleGateway
  extends AbstractContractCallGateway<UnlinkHandleRequest>
  implements
    IDelegatedTransactionGateway<UnlinkHandleRequest>,
    ISignedOnChainGateway<UnlinkHandleRequest>
{
  constructor(
    config: RequiredConfig,
    providerFactory: IProviderFactory,
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<UnlinkHandleRequest>,
  ) {
    super(config, providerFactory);
  }

  async createDelegatedTransaction(
    request: UnlinkHandleRequest,
  ): PromiseResult<NativeTransaction<UnlinkHandleRequest>, BroadcastingError> {
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
    request: UnlinkHandleRequest,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<UnlinkHandleRequest>> {
    const result = await this.createTypedData(request, nonce);

    return UnsignedProtocolCall.create({
      id: result.id,
      request,
      typedData: omitTypename(result.typedData),
    });
  }

  protected async createCallDetails(request: UnlinkHandleRequest): Promise<ContractCallDetails> {
    const result = await this.createTypedData(request);
    return this.createUnlinkCallData(result);
  }

  private async relayWithProfileManager(
    request: UnlinkHandleRequest,
  ): PromiseResult<RelaySuccess, BroadcastingError> {
    const { data } = await this.apolloClient.mutate<
      UnlinkHandleFromProfileData,
      UnlinkHandleFromProfileVariables
    >({
      mutation: UnlinkHandleFromProfileDocument,
      variables: {
        request: {
          handle: request.fullHandle,
        },
      },
    });

    if (data.result.__typename === 'LensProfileManagerRelayError') {
      const result = await this.createTypedData(request);
      const fallback = this.createUnlinkCallData(result);

      return handleRelayError(data.result, fallback);
    }

    return success(data.result);
  }

  private async createTypedData(request: UnlinkHandleRequest, nonce?: Nonce) {
    const { data } = await this.apolloClient.mutate<
      CreateUnlinkHandleFromProfileTypedDataData,
      CreateUnlinkHandleFromProfileTypedDataVariables
    >({
      mutation: CreateUnlinkHandleFromProfileTypedDataDocument,
      variables: {
        request: {
          handle: request.fullHandle,
        },
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });

    return data.result;
  }

  private createUnlinkCallData(
    result: CreateUnlinkHandleFromProfileBroadcastItemResult,
  ): ContractCallDetails {
    const contract = lensTokenHandleRegistry(result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('unlink', [
      result.typedData.message.handleId,
      result.typedData.message.profileId,
    ]);
    return {
      contractAddress: result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
