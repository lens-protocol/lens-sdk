import {
  SafeApolloClient,
  omitTypename,
  isPublicationId,
  RelaySuccess,
  ActOnOpenActionData,
  ActOnOpenActionVariables,
  ActOnOpenActionDocument,
  LegacyCollectData,
  LegacyCollectVariables,
  LegacyCollectDocument,
} from '@lens-protocol/api-bindings';
import * as gql from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { NativeTransaction, Nonce } from '@lens-protocol/domain/entities';
import {
  AllOpenActionType,
  DelegableOpenActionRequest,
  LegacyCollectRequest,
  MultirecipientCollectRequest,
  OpenActionRequest,
  Referrers,
  SimpleCollectRequest,
  UnknownActionRequest,
} from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  IDelegatedTransactionGateway,
  IOnChainProtocolCallGateway,
} from '@lens-protocol/domain/use-cases/transactions';
import { ChainType, Data, PromiseResult, success } from '@lens-protocol/shared-kernel';
import { v4 } from 'uuid';

import { UnsignedProtocolCall } from '../../wallet/adapters/ConcreteWallet';
import { ITransactionFactory } from './ITransactionFactory';
import { SelfFundedProtocolTransactionRequest } from './SelfFundedProtocolTransactionRequest';
import { handleRelayError } from './relayer';

type NewOpenActionRequest =
  | SimpleCollectRequest
  | MultirecipientCollectRequest
  | UnknownActionRequest;

export class OpenActionGateway
  implements
    IOnChainProtocolCallGateway<OpenActionRequest>,
    IDelegatedTransactionGateway<DelegableOpenActionRequest>
{
  constructor(
    private readonly apolloClient: SafeApolloClient,
    private readonly transactionFactory: ITransactionFactory<OpenActionRequest>,
  ) {}

  async createDelegatedTransaction(
    request: DelegableOpenActionRequest,
  ): PromiseResult<NativeTransaction<DelegableOpenActionRequest>, BroadcastingError> {
    const result = await this.relayWithProfileManager(request);

    if (result.isFailure()) return result;

    const transaction = this.transactionFactory.createNativeTransaction({
      chainType: ChainType.POLYGON,
      id: v4(),
      request,
      indexingId: result.value.txId,
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
      fallback: this.createLegacyCollectFallback(request, result),
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
      const result = await this.createLegacyCollectTypedData(input);
      const fallback = this.createLegacyCollectFallback(request, result);

      return handleRelayError(data.result, fallback);
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
      const result = await this.createActOnOpenActionTypedData(input);
      const fallback = this.createActOnOpenActionFallback(request, result);

      return handleRelayError(data.result, fallback);
    }

    return success(data.result);
  }

  private async createOpenActionUnsignedProtocolCall(
    request: SimpleCollectRequest | MultirecipientCollectRequest | UnknownActionRequest,
    nonce?: number,
  ) {
    const input = this.resolveActOnOpenActionRequest(request);
    const result = await this.createActOnOpenActionTypedData(input, nonce);

    return UnsignedProtocolCall.create({
      id: result.id,
      request,
      typedData: omitTypename(result.typedData),
      fallback: this.createActOnOpenActionFallback(request, result),
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
          referrers: this.resolveOnchainReferrers(request.referrers),
        };
      case AllOpenActionType.MULTIRECIPIENT_COLLECT:
        return {
          for: request.publicationId,
          actOn: {
            multirecipientCollectOpenAction: true,
          },
          referrers: this.resolveOnchainReferrers(request.referrers),
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
        };
    }
  }

  resolveOnchainReferrers(referrers: Referrers | undefined): gql.OnchainReferrer[] | undefined {
    return referrers?.map((value) => {
      if (isPublicationId(value)) {
        return {
          publicationId: value,
        };
      }
      return {
        profileId: value,
      };
    });
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

  // TODO fix once API are also fixed... wrong typed data returned
  private createLegacyCollectFallback(
    request: LegacyCollectRequest,
    result: gql.CreateLegacyCollectBroadcastItemResult,
  ): SelfFundedProtocolTransactionRequest<LegacyCollectRequest> {
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
      ...request,
      contractAddress: result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }

  private createActOnOpenActionFallback(
    request: NewOpenActionRequest,
    result: gql.CreateActOnOpenActionBroadcastItemResult,
  ): SelfFundedProtocolTransactionRequest<NewOpenActionRequest> {
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
      ...request,
      contractAddress: result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
