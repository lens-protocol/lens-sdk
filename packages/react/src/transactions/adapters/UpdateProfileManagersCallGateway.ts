import {
  SafeApolloClient,
  omitTypename,
  CreateChangeProfileManagersTypedDataData,
  CreateChangeProfileManagersTypedDataVariables,
  CreateChangeProfileManagersTypedDataDocument,
  ChangeProfileManagerActionType,
} from '@lens-protocol/api-bindings';
import { lensHub } from '@lens-protocol/blockchain-bindings';
import { Nonce } from '@lens-protocol/domain/entities';
import { UpdateProfileManagersRequest } from '@lens-protocol/domain/use-cases/profile';
import { IOnChainProtocolCallGateway } from '@lens-protocol/domain/use-cases/transactions';

import { UnsignedProtocolCall } from '../../wallet/adapters/ConcreteWallet';
import { Data, SelfFundedProtocolTransactionRequest } from './SelfFundedProtocolTransactionRequest';

export class UpdateProfileManagersCallGateway
  implements IOnChainProtocolCallGateway<UpdateProfileManagersRequest>
{
  constructor(private apolloClient: SafeApolloClient) {}

  async createUnsignedProtocolCall(
    request: UpdateProfileManagersRequest,
    nonce?: Nonce,
  ): Promise<UnsignedProtocolCall<UpdateProfileManagersRequest>> {
    const { data } = await this.apolloClient.mutate<
      CreateChangeProfileManagersTypedDataData,
      CreateChangeProfileManagersTypedDataVariables
    >({
      mutation: CreateChangeProfileManagersTypedDataDocument,
      variables: {
        request: {
          approveLensManager: request.lensManager,
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

    return UnsignedProtocolCall.create({
      id: data.result.id,
      request,
      typedData: omitTypename(data.result.typedData),
      fallback: this.createRequestFallback(request, data),
    });
  }

  private createRequestFallback(
    request: UpdateProfileManagersRequest,
    data: CreateChangeProfileManagersTypedDataData,
  ): SelfFundedProtocolTransactionRequest<UpdateProfileManagersRequest> {
    const contract = lensHub(data.result.typedData.domain.verifyingContract);
    const encodedData = contract.interface.encodeFunctionData(
      'changeDelegatedExecutorsConfig(uint256,address[],bool[],uint64,bool)',
      [
        data.result.typedData.message.delegatorProfileId,
        data.result.typedData.message.delegatedExecutors,
        data.result.typedData.message.approvals,
        data.result.typedData.message.configNumber,
        data.result.typedData.message.switchToGivenConfig,
      ],
    );
    return {
      ...request,
      contractAddress: data.result.typedData.domain.verifyingContract,
      encodedData: encodedData as Data,
    };
  }
}
