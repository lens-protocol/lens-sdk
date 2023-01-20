import { Amount, CryptoNativeAsset, IGasEstimate } from '@lens-protocol/shared-kernel';

export class Eip1559GasEstimate<T extends CryptoNativeAsset = CryptoNativeAsset>
  implements IGasEstimate<T>
{
  constructor(
    readonly limit: number,
    readonly baseFee: Amount<T>,
    readonly maxPriorityFeePerGas: Amount<T>,
  ) {}

  get estimatedCost(): Amount<T> {
    return this.estimatedGasPrice.mul(this.limit);
  }

  get maxCost(): Amount<T> {
    return this.maxFeePerGas.mul(this.limit);
  }

  get maxFeePerGas() {
    // Heuristic logic based on https://www.blocknative.com/blog/eip-1559-fees
    // > maxFeePerGas = (2 * baseFee) + maxPriorityFeePerGas
    // Despite ethers.js uses an hardcoded value for maxPriorityFeePerGas they
    // use the same exact logic to compute maxFeePerGas.
    // see: https://github.com/ethers-io/ethers.js/blob/7175e2e99c2747e8d2314feb407bf0a0f9371ece/packages/abstract-provider/src.ts/index.ts#L247
    return this.baseFee.mul(2).add(this.maxPriorityFeePerGas);
  }

  private get estimatedGasPrice() {
    return this.baseFee.add(this.maxPriorityFeePerGas);
  }
}
