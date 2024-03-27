import * as gql from '@lens-protocol/api-bindings';
import {
  ActOnOpenActionData,
  ActOnOpenActionDocument,
  ActOnOpenActionVariables,
  LegacyCollectData,
  LegacyCollectDocument,
  LegacyCollectVariables,
  RelaySuccess,
  SafeApolloClient,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { lensHub, publicActProxy } from '@lens-protocol/blockchain-bindings';
import { NativeTransaction, Nonce } from '@lens-protocol/domain/entities';
import {
  AllOpenActionType,
  DelegableOpenActionRequest,
  LegacyCollectRequest,
  MultirecipientCollectRequest,
  OpenActionRequest,
  SimpleCollectRequest,
  UnknownActionRequest,
} from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  IDelegatedTransactionGateway,
  ISignedOnChainGateway,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, Data, PromiseResult, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { RequiredConfig } from '../../config';
import { UnsignedProtocolCall } from '../../wallet/adapters/ConcreteWallet';
import { IProviderFactory } from '../../wallet/adapters/IProviderFactory';
import { AbstractContractCallGateway, ContractCallDetails } from './AbstractContractCallGateway';
import { ITransactionFactory } from './ITransactionFactory';
import { resolveOnchainReferrers } from './referrals';
import { handleRelayError } from './relayer';

type NewOpenActionRequest =
  | SimpleCollectRequest
  | MultirecipientCollectRequest
  | UnknownActionRequest;

export class OpenActionGateway
  extends AbstractContractCallGateway<OpenActionRequest>
  implements
    ISignedOnChainGateway<OpenActionRequest>,
    IDelegatedTransactionGateway<DelegableOpenActionRequest>
{
  constructor(
    config: RequiredConfig,
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<OpenActionRequest>,
    providerFactory: IProviderFactory,
  ) {
    super(config, providerFactory);
  }

  async createDelegatedTransaction(
    request: DelegableOpenActionRequest,
  ): PromiseResult<NativeTransaction<DelegableOpenActionRequest>, BroadcastingError> {
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
    request: OpenActionRequest,
    nonce?: number,
  ): Promise<UnsignedProtocolCall<OpenActionRequest>> {
    if (request.type === AllOpenActionType.LEGACY_COLLECT) {
      return this.createLegacyCollectUnsignedProtocolCall(request, nonce);
    }
    return this.createOpenActionUnsignedProtocolCall(request, nonce);
  }

  protected override async createCallDetails(
    request: OpenActionRequest,
  ): Promise<ContractCallDetails> {
    if (request.public) {
      const input = this.resolveActOnOpenActionRequest(request);
      const result = await this.createActOnOpenActionTypedData(input);
      return this.createPublicActProxyCallDetails(request, result);
    }

    if (request.type === AllOpenActionType.LEGACY_COLLECT) {
      const input = this.resolveLegacyCollectRequest(request);
      const result = await this.createLegacyCollectTypedData(input);
      return this.createLegacyCollectCallDetails(result);
    }

    const input = this.resolveActOnOpenActionRequest(request);
    const result = await this.createActOnOpenActionTypedData(input);
    return this.createActCallDetails(result);
  }

  private async createLegacyCollectUnsignedProtocolCall(
    request: LegacyCollectRequest,
    nonce?: number,
  ) {
    const input = this.resolveLegacyCollectRequest(request);
    const result = await this.createLegacyCollectTypedData(input, nonce);

    return UnsignedProtocolCall.create({
      id: result.id,
      request,
      typedData: omitTypename(result.typedData),
    });
  }

  private async relayWithProfileManager(
    request: DelegableOpenActionRequest,
  ): PromiseResult<RelaySuccess, BroadcastingError> {
    if (request.type === AllOpenActionType.LEGACY_COLLECT) {
      return this.relayLegacyCollectRequestWithProfileManager(request);
    }
    return this.relayActOnOpenActionRequestWithProfileManager(request);
  }

  private async relayLegacyCollectRequestWithProfileManager(
    request: LegacyCollectRequest,
  ): PromiseResult<RelaySuccess, BroadcastingError> {
    const input = this.resolveLegacyCollectRequest(request);

    const { data } = await this.apolloClient.mutate<LegacyCollectData, LegacyCollectVariables>({
      mutation: LegacyCollectDocument,
      variables: {
        request: input,
      },
    });

    if (data.result.__typename === 'LensProfileManagerRelayError') {
      return handleRelayError(data.result);
    }

    return success(data.result);
  }

  private async relayActOnOpenActionRequestWithProfileManager(
    request: SimpleCollectRequest | UnknownActionRequest,
  ): PromiseResult<RelaySuccess, BroadcastingError> {
    const input = this.resolveActOnOpenActionRequest(request);

    const { data } = await this.apolloClient.mutate<ActOnOpenActionData, ActOnOpenActionVariables>({
      mutation: ActOnOpenActionDocument,
      variables: {
        request: input,
      },
    });

    if (data.result.__typename === 'LensProfileManagerRelayError') {
      return handleRelayError(data.result);
    }

    return success(data.result);
  }

  private async createOpenActionUnsignedProtocolCall(
    request: NewOpenActionRequest,
    nonce?: number,
  ) {
    const input = this.resolveActOnOpenActionRequest(request);
    const result = await this.createActOnOpenActionTypedData(input, nonce);

    return UnsignedProtocolCall.create({
      id: result.id,
      request,
      typedData: omitTypename(result.typedData),
    });
  }

  private resolveLegacyCollectRequest(request: LegacyCollectRequest): gql.LegacyCollectRequest {
    return {
      on: request.publicationId,
      referrer: request.referrer,
    };
  }

  private resolveActOnOpenActionRequest(request: NewOpenActionRequest): gql.ActOnOpenActionRequest {
    switch (request.type) {
      case AllOpenActionType.SIMPLE_COLLECT:
        return {
          for: request.publicationId,
          actOn: {
            simpleCollectOpenAction: true,
          },
          referrers: resolveOnchainReferrers(request.referrers),
        };
      case AllOpenActionType.MULTIRECIPIENT_COLLECT:
        return {
          for: request.publicationId,
          actOn: {
            multirecipientCollectOpenAction: true,
          },
          referrers: resolveOnchainReferrers(request.referrers),
        };
      case AllOpenActionType.UNKNOWN_OPEN_ACTION:
        return {
          for: request.publicationId,
          actOn: {
            unknownOpenAction: {
              address: request.address,
              data: request.data,
            },
          },
          referrers: resolveOnchainReferrers(request.referrers),
        };
    }
  }

  private async createLegacyCollectTypedData(
    request: gql.LegacyCollectRequest,
    nonce?: Nonce,
  ): Promise<gql.CreateLegacyCollectBroadcastItemResult> {
    const { data } = await this.apolloClient.mutate<
      gql.CreateLegacyCollectTypedDataData,
      gql.CreateLegacyCollectTypedDataVariables
    >({
      mutation: gql.CreateLegacyCollectTypedDataDocument,
      variables: {
        request,
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });
    return data.result;
  }

  private async createActOnOpenActionTypedData(
    request: gql.ActOnOpenActionRequest,
    nonce?: Nonce,
  ): Promise<gql.CreateActOnOpenActionBroadcastItemResult> {
    const { data } = await this.apolloClient.mutate<
      gql.CreateActOnOpenActionTypedDataData,
      gql.CreateActOnOpenActionTypedDataVariables
    >({
      mutation: gql.CreateActOnOpenActionTypedDataDocument,
      variables: {
        request,
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });
    return data.result;
  }

  private createLegacyCollectCallDetails(
    result: gql.CreateLegacyCollectBroadcastItemResult,
  ): ContractCallDetails {
    const contract = lensHub(result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('collect', [
      {
        publicationCollectedProfileId: result.typedData.message.publicationCollectedProfileId,
        publicationCollectedId: result.typedData.message.publicationCollectedId,
        collectorProfileId: result.typedData.message.collectorProfileId,
        referrerProfileId: result.typedData.message.referrerProfileId,
        referrerPubId: result.typedData.message.referrerPubId,
        collectModuleData: result.typedData.message.collectModuleData,
      },
    ]);
    return {
      contractAddress: result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }

  private createActCallDetails(
    result: gql.CreateActOnOpenActionBroadcastItemResult,
  ): ContractCallDetails {
    const contract = lensHub(result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('act', [
      {
        publicationActedProfileId: result.typedData.message.publicationActedProfileId,
        publicationActedId: result.typedData.message.publicationActedId,
        actorProfileId: result.typedData.message.actorProfileId,
        referrerProfileIds: result.typedData.message.referrerProfileIds,
        referrerPubIds: result.typedData.message.referrerPubIds,
        actionModuleAddress: result.typedData.message.actionModuleAddress,
        actionModuleData: result.typedData.message.actionModuleData,
      },
    ]);
    return {
      contractAddress: result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }

  private createPublicActProxyCallDetails(
    request: NewOpenActionRequest,
    result: gql.CreateActOnOpenActionBroadcastItemResult,
  ): ContractCallDetails {
    if (
      request.type == AllOpenActionType.UNKNOWN_OPEN_ACTION ||
      (request.type == AllOpenActionType.SIMPLE_COLLECT && !request.fee)
    ) {
      return this.createPublicFreeActCallDetails(result);
    }
    return this.createPublicCollectCallDetails(result);
  }

  private createPublicFreeActCallDetails(
    result: gql.CreateActOnOpenActionBroadcastItemResult,
  ): ContractCallDetails {
    const contract = publicActProxy(result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('publicFreeAct', [
      {
        publicationActedProfileId: result.typedData.message.publicationActedProfileId,
        publicationActedId: result.typedData.message.publicationActedId,
        actorProfileId: result.typedData.message.actorProfileId,
        referrerProfileIds: result.typedData.message.referrerProfileIds,
        referrerPubIds: result.typedData.message.referrerPubIds,
        actionModuleAddress: result.typedData.message.actionModuleAddress,
        actionModuleData: result.typedData.message.actionModuleData,
      },
    ]);
    return {
      contractAddress: result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }

  private createPublicCollectCallDetails(
    result: gql.CreateActOnOpenActionBroadcastItemResult,
  ): ContractCallDetails {
    const contract = publicActProxy(result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData('publicCollect', [
      {
        publicationActedProfileId: result.typedData.message.publicationActedProfileId,
        publicationActedId: result.typedData.message.publicationActedId,
        actorProfileId: result.typedData.message.actorProfileId,
        referrerProfileIds: result.typedData.message.referrerProfileIds,
        referrerPubIds: result.typedData.message.referrerPubIds,
        actionModuleAddress: result.typedData.message.actionModuleAddress,
        actionModuleData: result.typedData.message.actionModuleData,
      },
    ]);
    return {
      contractAddress: result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
