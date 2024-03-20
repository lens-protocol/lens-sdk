import { permissionlessCreator } from '@lens-protocol/blockchain-bindings';
import { IGetProfilePricesGateway, ReadPriceError } from '@lens-protocol/domain/use-cases/profile';
import {
  Amount,
  ChainType,
  Denomination,
  Matic,
  PromiseResult,
  assertError,
  failure,
  success,
} from '@lens-protocol/shared-kernel';

import { RequiredConfig } from '../../config';
import { IProviderFactory } from '../../wallet/adapters/IProviderFactory';

export class ProfilePricesGateway implements IGetProfilePricesGateway {
  constructor(
    private readonly config: RequiredConfig,
    private readonly providerFactory: IProviderFactory,
  ) {}

  async getMaticPrice(): PromiseResult<Amount<Matic>, ReadPriceError> {
    try {
      const provider = await this.providerFactory.createProvider({ chainType: ChainType.POLYGON });

      const contract = permissionlessCreator(
        this.config.environment.contracts.permissionlessCreator,
        provider,
      );

      const priceBN = await contract.getProfileWithHandleCreationPrice();

      return success(Amount.matic(Denomination.wei(priceBN.toString())));
    } catch (error) {
      assertError(error);
      return failure(new ReadPriceError(error));
    }
  }
}
