import {
  BlockData,
  BlockDocument,
  BlockVariables,
  CreateBlockProfilesBroadcastItemResult,
  CreateBlockProfilesTypedDataData,
  CreateBlockProfilesTypedDataDocument,
  CreateBlockProfilesTypedDataVariables,
  RelaySuccess,
  SafeApolloClient,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { Nonce, Transaction } from '@lens-protocol/domain/entities';
import { BlockProfilesRequest } from '@lens-protocol/domain/use-cases/profile';
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

export class BlockProfilesGateway
  extends AbstractContractCallGateway<BlockProfilesRequest>
  implements
    IDelegatedTransactionGateway<BlockProfilesRequest>,
    ISignedOnChainGateway<BlockProfilesRequest>
{
  constructor(
    config: RequiredConfig,
    providerFactory: IProviderFactory,
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<BlockProfilesRequest>,
  ) {
    super(config, providerFactory);
  }

  async createDelegatedTransaction(
    request: BlockProfilesRequest,
  ): PromiseResult<Transaction<BlockProfilesRequest>, BroadcastingError> {
    const result = await this.relayWithProfileManager(request);

    if (result.isFailure()) {
      return result;
    }

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
    request: BlockProfilesRequest,
    nonceOverride?: number | undefined,
  ): Promise<UnsignedProtocolCall<BlockProfilesRequest>> {
    const result = await this.createTypedData(request, nonceOverride);

    return UnsignedProtocolCall.create({
      id: result.id,
      request,
      typedData: omitTypename(result.typedData),
    });
  }

  private async relayWithProfileManager(
    request: BlockProfilesRequest,
  ): PromiseResult<RelaySuccess, BroadcastingError> {
    const { data } = await this.apolloClient.mutate<BlockData, BlockVariables>({
      mutation: BlockDocument,
      variables: {
        request: {
          profiles: request.profileIds,
        },
      },
    });

    if (data.result.__typename === 'LensProfileManagerRelayError') {
      return handleRelayError(data.result);
    }

    return success(data.result);
  }

  protected async createCallDetails(request: BlockProfilesRequest): Promise<ContractCallDetails> {
    const result = await this.createTypedData(request);
    return this.createSetBlockStatusCallDetails(result);
  }

  private async createTypedData(
    request: BlockProfilesRequest,
    nonce?: Nonce,
  ): Promise<CreateBlockProfilesBroadcastItemResult> {
    const { data } = await this.apolloClient.mutate<
      CreateBlockProfilesTypedDataData,
      CreateBlockProfilesTypedDataVariables
    >({
      mutation: CreateBlockProfilesTypedDataDocument,
      variables: {
        request: {
          profiles: request.profileIds,
        },
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });

    return data.result;
  }

  private createSetBlockStatusCallDetails(
    result: CreateBlockProfilesBroadcastItemResult,
  ): ContractCallDetails {
    const contract = lensHub(result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('setBlockStatus', [
      result.typedData.message.byProfileId,
      result.typedData.message.idsOfProfilesToSetBlockStatus,
      result.typedData.message.blockStatus,
    ]);
    return {
      contractAddress: result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
