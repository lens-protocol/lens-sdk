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
  IOnChainProtocolCallGateway,
} from '@lens-protocol/domain/use-cases/transactions';
import { Data, PromiseResult, failure, success } from '@lens-protocol/shared-kernel';

import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { ITransactionFactory } from '../ITransactionFactory';
import { SelfFundedProtocolTransactionRequest } from '../SelfFundedProtocolTransactionRequest';
import { handleRelayError } from '../relayer';

export class ProfileMetadataGateway
  implements
    IDelegatedTransactionGateway<SetProfileMetadataRequest>,
    IOnChainProtocolCallGateway<SetProfileMetadataRequest>
{
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<SetProfileMetadataRequest>,
  ) {}

  async createDelegatedTransaction(
    request: SetProfileMetadataRequest,
  ): PromiseResult<Transaction<SetProfileMetadataRequest>, BroadcastingError> {
    const result = await this.broadcast(request);

    if (result.isFailure()) {
      return result;
    }

    const receipt = result.value;
    const transaction = this.transactionFactory.createDataTransaction({
      id: receipt.txId,
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
      fallback: this.createRequestFallback(request, data),
    });
  }

  private async broadcast(
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
      const result = await this.createTypedData(request);
      const fallback = this.createRequestFallback(request, result);

      return handleRelayError(data.result, fallback);
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

  private createRequestFallback(
    request: SetProfileMetadataRequest,
    result: CreateOnchainSetProfileMetadataBroadcastItemResult,
  ): SelfFundedProtocolTransactionRequest<SetProfileMetadataRequest> {
    const contract = lensHub(result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('setProfileMetadataURI', [
      result.typedData.message.profileId,
      request.metadataURI,
    ]);
    return {
      ...request,
      contractAddress: result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
