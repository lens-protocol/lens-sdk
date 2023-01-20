export type RewardPercentiles = string[];

export type FeeHistoryResult = {
  baseFeePerGas: string[];
  gasUsedRatio: number[];
  oldestBlock: number;
  reward: RewardPercentiles[];
};
