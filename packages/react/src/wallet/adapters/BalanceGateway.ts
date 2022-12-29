import { JsonRpcProvider } from '@ethersproject/providers';
import { erc20 } from '@lens-protocol/blockchain-bindings';
import { Wallet } from '@lens-protocol/domain/entities';
import { IBalanceGateway } from '@lens-protocol/domain/use-cases/wallets';
import { Amount, BigDecimal, Erc20 } from '@lens-protocol/shared-kernel';

export class BalanceGateway implements IBalanceGateway {
  constructor(private readonly provider: JsonRpcProvider) {}

  async getBalanceFor<T extends Erc20>(wallet: Wallet, asset: T): Promise<Amount<T>> {
    const contract = erc20(asset.address, this.provider);

    const balance = await contract.balanceOf(wallet.address);

    return Amount.erc20(
      asset,
      BigDecimal.rescale(BigDecimal.from(balance.toString()), -asset.decimals),
    );
  }
}
