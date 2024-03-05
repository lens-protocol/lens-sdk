import {
  CreateOnchainSetProfileMetadataBroadcastItemResult,
  CreateOnchainSetProfileMetadataTypedDataData,
  CreateOnchainSetProfileMetadataTypedDataDocument,
  CreateOnchainSetProfileMetadataTypedDataVariables,
  RelaySuccess,
  SafeApolloClient,
  SetProfileMetadataData,
  SetProfileMetadataDocument,
  SetProfileMetadataVariables,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { Nonce, Transaction } from '@lens-protocol/domain/entities';
import { SetProfileMetadataRequest } from '@lens-protocol/domain/use-cases/profile';
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

export class ProfileMetadataGateway
  extends AbstractContractCallGateway<SetProfileMetadataRequest>
  implements
    IDelegatedTransactionGateway<SetProfileMetadataRequest>,
    ISignedOnChainGateway<SetProfileMetadataRequest>
{
  constructor(
    config: RequiredConfig,
    providerFactory: IProviderFactory,
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<SetProfileMetadataRequest>,
  ) {
    super(config, providerFactory);
  }

  async createDelegatedTransaction(
    request: SetProfileMetadataRequest,
  ): PromiseResult<Transaction<SetProfileMetadataRequest>, BroadcastingError> {
    const result = await this.relayWithProfileManager(request);

    if (result.isFailure()) {
      return result;
    }

    const receipt = result.value;
    const transaction = this.transactionFactory.createNativeTransaction({
      chainType: ChainType.POLYGON,
      id: v4(),
      relayerTxId: receipt.txId,
      txHash: receipt.txHash,
      request,
    });

    return success(transaction);
  }

  async createUnsignedProtocolCall(
    request: SetProfileMetadataRequest,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<SetProfileMetadataRequest>> {
    const data = await this.createTypedData(request, nonce);

    return UnsignedProtocolCall.create({
      id: data.id,
      request,
      typedData: omitTypename(data.typedData),
    });
  }

  protected override async createCallDetails(
    request: SetProfileMetadataRequest,
  ): Promise<ContractCallDetails> {
    const result = await this.createTypedData(request);
    return this.createSetProfileMetadataUriCallDetails(result);
  }

  private async relayWithProfileManager(
    request: SetProfileMetadataRequest,
  ): PromiseResult<RelaySuccess, BroadcastingError> {
    const { data } = await this.apolloClient.mutate<
      SetProfileMetadataData,
      SetProfileMetadataVariables
    >({
      mutation: SetProfileMetadataDocument,
      variables: {
        request: {
          metadataURI: request.metadataURI,
        },
      },
    });

    if (data.result.__typename === 'LensProfileManagerRelayError') {
      return handleRelayError(data.result);
    }

    return success(data.result);
  }

  private async createTypedData(
    request: SetProfileMetadataRequest,
    nonce?: Nonce,
  ): Promise<CreateOnchainSetProfileMetadataBroadcastItemResult> {
    const { data } = await this.apolloClient.mutate<
      CreateOnchainSetProfileMetadataTypedDataData,
      CreateOnchainSetProfileMetadataTypedDataVariables
    >({
      mutation: CreateOnchainSetProfileMetadataTypedDataDocument,
      variables: {
        request: {
          metadataURI: request.metadataURI,
        },
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });

    return data.result;
  }

  private createSetProfileMetadataUriCallDetails(
    result: CreateOnchainSetProfileMetadataBroadcastItemResult,
  ): ContractCallDetails {
    const contract = lensHub(result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('setProfileMetadataURI', [
      result.typedData.message.profileId,
      result.typedData.message.metadataURI,
    ]);
    return {
      contractAddress: result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
