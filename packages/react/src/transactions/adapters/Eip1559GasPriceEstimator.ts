import { JsonRpcProvider } from '@ethersproject/providers';
import { FeeHistoryResult } from '@lens-protocol/blockchain-bindings';
import {
  Amount,
  BigDecimal,
  CryptoNativeAsset,
  Denomination,
  never,
} from '@lens-protocol/shared-kernel';

export class Eip1559GasPriceEstimate<T extends CryptoNativeAsset = CryptoNativeAsset> {
  constructor(readonly baseFee: Amount<T>, readonly maxPriorityFeePerGas: Amount<T>) {}

  get maxFeePerGas() {
    // Heuristic logic based on https://www.blocknative.com/blog/eip-1559-fees
    // > maxFeePerGas = (2 * baseFee) + maxPriorityFeePerGas
    // Despite ethers.js uses an hardcoded value for maxPriorityFeePerGas they
    // use the same exact logic to compute maxFeePerGas.
    // see: https://github.com/ethers-io/ethers.js/blob/7175e2e99c2747e8d2314feb407bf0a0f9371ece/packages/abstract-provider/src.ts/index.ts#L247
    return this.baseFee.mul(2).add(this.maxPriorityFeePerGas);
  }

  get estimatedGasPrice() {
    return this.baseFee.add(this.maxPriorityFeePerGas);
  }
}

export enum TransactionExecutionSpeed {
  FAST = 'fast',
  AVERAGE = 'average',
  SLOW = 'slow',
}

const BLOCK_COUNT = 20;

const LOWER_PERCENTILE = 1;
const MEAN_PERCENTILE = 50;
const HIGHER_PERCENTILE = 99;
const REWARD_PERCENTILES = [LOWER_PERCENTILE, MEAN_PERCENTILE, HIGHER_PERCENTILE] as const;

const NEWEST_BLOCK = 'pending';

function computeFeeHistoryStats(result: FeeHistoryResult) {
  const oldestBlock = Number(result.oldestBlock);
  let blockNum = oldestBlock;
  let index = 0;
  const blocks = [];
  while (blockNum < oldestBlock + result.reward.length) {
    blocks.push({
      number: blockNum,
      baseFeePerGas: BigDecimal.from(
        result.baseFeePerGas[index] ?? never(`Cannot find baseFeePerGas for block ${blockNum}`),
      ),
      priorityFeePerGas: (
        result.reward[index] ?? never(`Cannot find reward for block ${blockNum}`)
      ).map((x) => BigDecimal.from(x)),
    });
    blockNum += 1;
    index += 1;
  }

  return {
    blocks,
    baseFee: (blocks[blocks.length - 1] ?? never('Cannot index last block')).baseFeePerGas,
  };
}

type FeeHistoryStats = ReturnType<typeof computeFeeHistoryStats>;
type BlockStats = FeeHistoryStats['blocks'][0];

const transactionSpeedToPercentileIndex: Record<TransactionExecutionSpeed, number> = {
  [TransactionExecutionSpeed.SLOW]: REWARD_PERCENTILES.indexOf(LOWER_PERCENTILE),
  [TransactionExecutionSpeed.AVERAGE]: REWARD_PERCENTILES.indexOf(MEAN_PERCENTILE),
  [TransactionExecutionSpeed.FAST]: REWARD_PERCENTILES.indexOf(HIGHER_PERCENTILE),
};

function computeMaxPriorityFeePerGas(blocks: BlockStats[], speed: TransactionExecutionSpeed) {
  // TODO: set min to 2 Gwei
  const index = transactionSpeedToPercentileIndex[speed];
  return BigDecimal.mean(
    blocks.map(
      (b) =>
        b.priorityFeePerGas[index] ??
        never('Cannot find priorityFeePerGas for the specified transactions execution speed'),
    ),
  );
}

export type CryptoNativeAmountFactory<T extends CryptoNativeAsset> = (
  value: BigDecimal,
) => Amount<T>;

export class Eip1559GasPriceEstimator<T extends CryptoNativeAsset> {
  constructor(
    private readonly provider: JsonRpcProvider,
    private readonly createAmount: CryptoNativeAmountFactory<T>,
  ) {}

  async estimate(speed: TransactionExecutionSpeed) {
    const { blocks, baseFee } = await this.fetchFeeHistoryStats();

    const maxPriorityFeePerGas = computeMaxPriorityFeePerGas(blocks, speed);

    return new Eip1559GasPriceEstimate(
      this.createAmount(Denomination.wei(baseFee)),
      this.createAmount(Denomination.wei(maxPriorityFeePerGas)),
    );
  }

  private async fetchFeeHistoryStats() {
    const response = (await this.provider.send('eth_feeHistory', [
      BLOCK_COUNT,
      NEWEST_BLOCK,
      REWARD_PERCENTILES,
    ])) as FeeHistoryResult;

    return computeFeeHistoryStats(response);
  }
}
