import {
  CreateOnchainMirrorBroadcastItemResult,
  CreateOnchainMirrorTypedDataData,
  CreateOnchainMirrorTypedDataDocument,
  CreateOnchainMirrorTypedDataVariables,
  MirrorOnchainData,
  MirrorOnchainDocument,
  MirrorOnMomokaVariables,
  omitTypename,
  OnchainMirrorRequest,
  RelaySuccess,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { NativeTransaction, Nonce } from '@lens-protocol/domain/entities';
import { CreateMirrorRequest } from '@lens-protocol/domain/use-cases/publications';
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
import { resolveOnchainReferrers } from '../referrals';
import { handleRelayError } from '../relayer';

export class CreateOnChainMirrorGateway
  extends AbstractContractCallGateway<CreateMirrorRequest>
  implements
    IDelegatedTransactionGateway<CreateMirrorRequest>,
    ISignedOnChainGateway<CreateMirrorRequest>
{
  constructor(
    config: RequiredConfig,
    providerFactory: IProviderFactory,
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<CreateMirrorRequest>,
  ) {
    super(config, providerFactory);
  }

  async createDelegatedTransaction(
    request: CreateMirrorRequest,
  ): PromiseResult<NativeTransaction<CreateMirrorRequest>, BroadcastingError> {
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
    request: CreateMirrorRequest,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<CreateMirrorRequest>> {
    const input = this.resolveOnchainMirrorRequest(request);
    const result = await this.createTypedData(input, nonce);

    return UnsignedProtocolCall.create({
      id: result.id,
      request,
      typedData: omitTypename(result.typedData),
    });
  }

  protected override async createCallDetails(
    request: CreateMirrorRequest,
  ): Promise<ContractCallDetails> {
    const input = this.resolveOnchainMirrorRequest(request);
    const result = await this.createTypedData(input);
    return this.createMirrorCallDetails(result);
  }

  private async relayWithProfileManager(
    request: CreateMirrorRequest,
  ): PromiseResult<RelaySuccess, BroadcastingError> {
    const input = this.resolveOnchainMirrorRequest(request);

    const { data } = await this.apolloClient.mutate<MirrorOnchainData, MirrorOnMomokaVariables>({
      mutation: MirrorOnchainDocument,
      variables: {
        request: input,
      },
    });

    if (data.result.__typename === 'LensProfileManagerRelayError') {
      return handleRelayError(data.result);
    }

    return success(data.result);
  }

  private createMirrorCallDetails(
    result: CreateOnchainMirrorBroadcastItemResult,
  ): ContractCallDetails {
    const contract = lensHub(result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('mirror', [
      {
        profileId: result.typedData.message.profileId,
        metadataURI: result.typedData.message.metadataURI,
        pointedProfileId: result.typedData.message.pointedProfileId,
        pointedPubId: result.typedData.message.pointedPubId,
        referrerProfileIds: result.typedData.message.referrerProfileIds,
        referrerPubIds: result.typedData.message.referrerPubIds,
        referenceModuleData: result.typedData.message.referenceModuleData,
      },
    ]);
    return {
      contractAddress: result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }

  private async createTypedData(
    request: OnchainMirrorRequest,
    nonce?: Nonce,
  ): Promise<CreateOnchainMirrorBroadcastItemResult> {
    const { data } = await this.apolloClient.mutate<
      CreateOnchainMirrorTypedDataData,
      CreateOnchainMirrorTypedDataVariables
    >({
      mutation: CreateOnchainMirrorTypedDataDocument,
      variables: {
        request,
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });
    return data.result;
  }

  private resolveOnchainMirrorRequest(request: CreateMirrorRequest): OnchainMirrorRequest {
    return {
      mirrorOn: request.mirrorOn,
      mirrorReferenceModuleData: request.mirrorOnReferenceData,
      referrers: resolveOnchainReferrers(request.referrers),
    };
  }
}
