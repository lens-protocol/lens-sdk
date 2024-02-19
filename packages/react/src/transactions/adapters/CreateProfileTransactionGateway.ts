import { JsonRpcProvider } from '@ethersproject/providers';
import {
  GenerateLensApiRelayAddressData,
  GenerateLensApiRelayAddressDocument,
  SafeApolloClient,
} from '@lens-protocol/api-bindings';
import { permissionlessCreator } from '@lens-protocol/blockchain-bindings';
import { CreateProfileRequest } from '@lens-protocol/domain/use-cases/profile';
import { Data, EvmAddress } from '@lens-protocol/shared-kernel';

import { RequiredConfig } from '../../config';
import { IProviderFactory } from '../../wallet/adapters/IProviderFactory';
import { AbstractContractCallGateway, ContractCallDetails } from './AbstractContractCallGateway';

export class CreateProfileTransactionGateway extends AbstractContractCallGateway<CreateProfileRequest> {
  constructor(
    private apolloClient: SafeApolloClient,
    config: RequiredConfig,
    providerFactory: IProviderFactory,
  ) {
    super(config, providerFactory);
  }

  protected async createCallDetails(
    request: CreateProfileRequest,
    provider: JsonRpcProvider,
  ): Promise<ContractCallDetails> {
    const delegatedExecutors = await this.resolveDelegatedExecutors(request);

    const contract = permissionlessCreator(
      this.config.environment.contracts.permissionlessCreator,
      provider,
    );

    const encodedData = contract.interface.encodeFunctionData('createProfileWithHandle', [
      {
        to: request.to,
        followModule: '0x0000000000000000000000000000000000000000',
        followModuleInitData: '0x',
      },
      request.localName,
      delegatedExecutors,
    ]);

    return {
      contractAddress: this.config.environment.contracts.permissionlessCreator,
      encodedData: encodedData as Data,
      value: await contract.getProfileWithHandleCreationPrice(),
    };
  }

  private async resolveDelegatedExecutors(request: CreateProfileRequest): Promise<EvmAddress[]> {
    if (!request.approveSignless) {
      return [];
    }

    const { data } = await this.apolloClient.query<GenerateLensApiRelayAddressData>({
      query: GenerateLensApiRelayAddressDocument,
    });

    return [data.result];
  }
}
