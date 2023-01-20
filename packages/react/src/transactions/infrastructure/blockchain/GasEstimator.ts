import { BigDecimal, CryptoNativeAsset, Denomination, never } from '@lens-protocol/shared-kernel';
import { providers } from 'ethers';

import {
  GasEstimationRequest,
  IGasEstimator,
  TransactionExecutionSpeed,
} from '../../adapters/ApproveTransactionGateway';
import { Eip1559GasEstimate } from './Eip1559GasEstimate';
import { FeeHistoryResult } from './types';
export const GAS_PADDING_FACTOR = 1.1;

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
  while (blockNum < oldestBlock + BLOCK_COUNT) {
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

async function fetchFeeHistoryStats(provider: providers.JsonRpcProvider) {
  const response = (await provider.send('eth_feeHistory', [
    BLOCK_COUNT,
    NEWEST_BLOCK,
    REWARD_PERCENTILES,
  ])) as FeeHistoryResult;

  return computeFeeHistoryStats(response);
}

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

export class GasEstimator implements IGasEstimator {
  async estimate<T extends CryptoNativeAsset>(
    request: GasEstimationRequest<T>,
    provider: providers.JsonRpcProvider,
  ) {
    const { blocks, baseFee } = await fetchFeeHistoryStats(provider);

    const maxPriorityFeePerGas = computeMaxPriorityFeePerGas(blocks, request.speed);

    return new Eip1559GasEstimate(
      Math.trunc(request.limit * GAS_PADDING_FACTOR),
      request.createAmount(Denomination.wei(baseFee)),
      request.createAmount(Denomination.wei(maxPriorityFeePerGas)),
    );
  }
}
