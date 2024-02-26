import {
  ChangeProfileManagerActionType,
  CreateChangeProfileManagersBroadcastItemResult,
  CreateChangeProfileManagersTypedDataData,
  CreateChangeProfileManagersTypedDataDocument,
  CreateChangeProfileManagersTypedDataVariables,
  SafeApolloClient,
  omitTypename,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { Nonce } from '@lens-protocol/domain/entities';
import { UpdateProfileManagersRequest } from '@lens-protocol/domain/use-cases/profile';
import { ISignedOnChainGateway } from '@lens-protocol/domain/use-cases/transactions';
import { Data } from '@lens-protocol/shared-kernel';

import { RequiredConfig } from '../../../config';
import { UnsignedProtocolCall } from '../../../wallet/adapters/ConcreteWallet';
import { IProviderFactory } from '../../../wallet/adapters/IProviderFactory';
import { AbstractContractCallGateway, ContractCallDetails } from '../AbstractContractCallGateway';

export class UpdateProfileManagersGateway
  extends AbstractContractCallGateway<UpdateProfileManagersRequest>
  implements ISignedOnChainGateway<UpdateProfileManagersRequest>
{
  constructor(
    config: RequiredConfig,
    providerFactory: IProviderFactory,
    private apolloClient: SafeApolloClient,
  ) {
    super(config, providerFactory);
  }

  async createUnsignedProtocolCall(
    request: UpdateProfileManagersRequest,
    nonceOverride?: Nonce,
  ): Promise<UnsignedProtocolCall<UpdateProfileManagersRequest>> {
    const result = await this.createTypedData(request, nonceOverride);

    return UnsignedProtocolCall.create({
      id: result.id,
      request,
      typedData: omitTypename(result.typedData),
    });
  }

  protected async createCallDetails(
    request: UpdateProfileManagersRequest,
  ): Promise<ContractCallDetails> {
    const result = await this.createTypedData(request);
    return this.createChangeDelegatedExecutorsConfigCallDetails(result);
  }

  private async createTypedData(request: UpdateProfileManagersRequest, nonce?: Nonce) {
    const { data } = await this.apolloClient.mutate<
      CreateChangeProfileManagersTypedDataData,
      CreateChangeProfileManagersTypedDataVariables
    >({
      mutation: CreateChangeProfileManagersTypedDataDocument,
      variables: {
        request: {
          approveSignless: request.approveSignless,
          changeManagers: [
            ...(request.add?.map((address) => ({
              action: ChangeProfileManagerActionType.Add,
              address,
            })) ?? []),
            ...(request.remove?.map((address) => ({
              action: ChangeProfileManagerActionType.Remove,
              address,
            })) ?? []),
          ],
        },
        options: nonce ? { overrideSigNonce: nonce } : undefined,
      },
    });

    return data.result;
  }

  private createChangeDelegatedExecutorsConfigCallDetails(
    data: CreateChangeProfileManagersBroadcastItemResult,
  ): ContractCallDetails {
    const contract = lensHub(data.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData(
      'changeDelegatedExecutorsConfig(uint256,address[],bool[],uint64,bool)',
      [
        data.typedData.message.delegatorProfileId,
        data.typedData.message.delegatedExecutors,
        data.typedData.message.approvals,
        data.typedData.message.configNumber,
        data.typedData.message.switchToGivenConfig,
      ],
    );
    return {
      contractAddress: data.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
