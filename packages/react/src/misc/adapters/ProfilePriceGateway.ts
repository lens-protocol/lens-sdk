import { permissionlessCreator } from '@lens-protocol/blockchain-bindings';
import { IGetProfilePriceGateway } from '@lens-protocol/domain/use-cases/profile';
import { Amount, ChainType, Denomination, Matic } from '@lens-protocol/shared-kernel';

import { RequiredConfig } from '../../config';
import { IProviderFactory } from '../../wallet/adapters/IProviderFactory';

export class ProfilePriceGateway implements IGetProfilePriceGateway {
  constructor(
    private readonly config: RequiredConfig,
    private readonly providerFactory: IProviderFactory,
  ) {}

  async getMaticPrice(): Promise<Amount<Matic>> {
    const provider = await this.providerFactory.createProvider({ chainType: ChainType.POLYGON });

    const contract = permissionlessCreator(
      this.config.environment.contracts.permissionlessCreator,
      provider,
    );

    const priceBN = await contract.getProfileWithHandleCreationPrice();

    return Amount.matic(Denomination.wei(priceBN.toString()));
  }
}
