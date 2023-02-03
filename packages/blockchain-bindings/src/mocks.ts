import { Amount, BigDecimal, CryptoNativeAsset } from '@lens-protocol/shared-kernel';

import { FeeHistoryResult, RewardPercentiles } from './types';

export function mockFeeHistoryResult<T extends CryptoNativeAsset>({
  blockCount,
  lastBlockBaseFee,
  oldestBlock = 42,
  rewardPercentiles,
}: {
  blockCount: number;
  lastBlockBaseFee: Amount<T>;
  oldestBlock?: number;
  rewardPercentiles: Amount<T>[];
}): FeeHistoryResult {
  const rewardPercentilesInHex = rewardPercentiles.map((reward) =>
    BigDecimal.rescale(reward.toBigDecimal(), reward.asset.decimals).toHex(),
  );

  return {
    oldestBlock: oldestBlock,
    reward: new Array<RewardPercentiles>(blockCount).fill(rewardPercentilesInHex),
    // blockCount + 1 because it includes the next block after the newest of the returned range
    // see: https://docs.alchemy.com/alchemy/apis/ethereum/eth_feehistory
    baseFeePerGas: new Array<string>(blockCount + 1).fill(
      BigDecimal.rescale(lastBlockBaseFee.toBigDecimal(), lastBlockBaseFee.asset.decimals).toHex(),
    ),

    gasUsedRatio: new Array<number>(blockCount).fill(0.5),
  };
}
