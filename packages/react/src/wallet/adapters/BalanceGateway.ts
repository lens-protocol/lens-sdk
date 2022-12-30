import { erc20 } from '@lens-protocol/blockchain-bindings';
import { Wallet } from '@lens-protocol/domain/entities';
import { IBalanceGateway } from '@lens-protocol/domain/use-cases/wallets';
import { Amount, BigDecimal, ChainType, Erc20 } from '@lens-protocol/shared-kernel';

import { ProviderFactory } from '../infrastructure/ProviderFactory';

export class BalanceGateway implements IBalanceGateway {
  constructor(private readonly providerFactory: ProviderFactory) {}

  async getBalanceFor<T extends Erc20>(wallet: Wallet, asset: T): Promise<Amount<T>> {
    const provider = await this.providerFactory.createProvider({ chainType: ChainType.POLYGON });

    const contract = erc20(asset.address, provider);

    const balance = await contract.balanceOf(wallet.address);

    return Amount.erc20(
      asset,
      BigDecimal.rescale(BigDecimal.from(balance.toString()), -asset.decimals),
    );
  }
}
