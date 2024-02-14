import {
  CreateUnblockProfilesBroadcastItemResult,
  CreateUnblockProfilesTypedDataData,
  CreateUnblockProfilesTypedDataDocument,
  CreateUnblockProfilesTypedDataVariables,
  RelaySuccess,
  SafeApolloClient,
  UnblockData,
  UnblockDocument,
  UnblockVariables,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { Nonce, Transaction } from '@lens-protocol/domain/entities';
import { UnblockProfilesRequest } from '@lens-protocol/domain/use-cases/profile';
import {
  BroadcastingError,
  IDelegatedTransactionGateway,
  ISignedOnChainGateway,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, Data, PromiseResult, failure, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { RequiredConfig } from '../../../config';
import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { IProviderFactory } from '../../../wallet/adapters/IProviderFactory';
import { AbstractContractCallGateway, ContractCallDetails } from '../AbstractContractCallGateway';
import { ITransactionFactory } from '../ITransactionFactory';
import { handleRelayError } from '../relayer';

export class UnblockProfilesGateway
  extends AbstractContractCallGateway<UnblockProfilesRequest>
  implements
    IDelegatedTransactionGateway<UnblockProfilesRequest>,
    ISignedOnChainGateway<UnblockProfilesRequest>
{
  constructor(
    config: RequiredConfig,
    providerFactory: IProviderFactory,
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<UnblockProfilesRequest>,
  ) {
    super(config, providerFactory);
  }

  async createDelegatedTransaction(
    request: UnblockProfilesRequest,
  ): PromiseResult<Transaction<UnblockProfilesRequest>, BroadcastingError> {
    const result = await this.relayWithProfileManager(request);

    if (result.isFailure()) {
      return failure(result.error);
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
    request: UnblockProfilesRequest,
    nonceOverride?: number | undefined,
  ): Promise<UnsignedProtocolCall<UnblockProfilesRequest>> {
    const result = await this.createTypedData(request, nonceOverride);

    return UnsignedProtocolCall.create({
      id: result.id,
      request,
      typedData: omitTypename(result.typedData),
    });
  }

  protected async createCallDetails(request: UnblockProfilesRequest): Promise<ContractCallDetails> {
    const result = await this.createTypedData(request);
    return this.createSetBlockStatusCallDetails(result);
  }

  private async relayWithProfileManager(
    request: UnblockProfilesRequest,
  ): PromiseResult<RelaySuccess, BroadcastingError> {
    const { data } = await this.apolloClient.mutate<UnblockData, UnblockVariables>({
      mutation: UnblockDocument,
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

  private async createTypedData(
    request: UnblockProfilesRequest,
    nonce?: Nonce,
  ): Promise<CreateUnblockProfilesBroadcastItemResult> {
    const { data } = await this.apolloClient.mutate<
      CreateUnblockProfilesTypedDataData,
      CreateUnblockProfilesTypedDataVariables
    >({
      mutation: CreateUnblockProfilesTypedDataDocument,
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
    result: CreateUnblockProfilesBroadcastItemResult,
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
