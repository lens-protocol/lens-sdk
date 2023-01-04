import { erc20 } from '@lens-protocol/blockchain-bindings';
import { Wallet } from '@lens-protocol/domain/entities';
import { ITokenGateway } from '@lens-protocol/domain/use-cases/wallets';
import { Erc20, Amount, BigDecimal, ChainType } from '@lens-protocol/shared-kernel';

import { ProviderFactory } from '../infrastructure/ProviderFactory';

export class TokenGateway implements ITokenGateway {
  constructor(private readonly providerFactory: ProviderFactory) {}

  async getTransferAllowanceFor<T extends Erc20>(
    asset: T,
    owner: Wallet,
    spender: string,
  ): Promise<Amount<T>> {
    const provider = await this.providerFactory.createProvider({ chainType: ChainType.POLYGON });

    const contract = erc20(asset.address, provider);

    const allowance = await contract.allowance(owner.address, spender);

    return Amount.erc20(
      asset,
      BigDecimal.rescale(BigDecimal.from(allowance.toString()), -asset.decimals),
    );
  }
}
