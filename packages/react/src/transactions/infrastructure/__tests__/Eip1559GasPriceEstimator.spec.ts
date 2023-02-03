import { mockFeeHistoryResult } from '@lens-protocol/blockchain-bindings/mocks';
import { Amount, CryptoNativeAmount, CryptoNativeAsset } from '@lens-protocol/shared-kernel';
import { mockEtherGweiAmount, mockMaticGweiAmount } from '@lens-protocol/shared-kernel/mocks';
import { providers } from 'ethers';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import {
  Eip1559GasPriceEstimator,
  Eip1559GasPriceEstimate,
  TransactionExecutionSpeed,
  CryptoNativeAmountFactory,
} from '../Eip1559GasPriceEstimator';

function mockEip1559GasPriceSupport<T extends CryptoNativeAsset>(
  provider: providers.JsonRpcProvider,
  using: {
    currentBaseFee: Amount<T>;
    rewardPercentiles: AmountRewardPercentilesTuple<T>;
  },
) {
  const blockCount = 20;
  const originalSend = provider.send;

  jest.spyOn(provider, 'send');

  when(provider.send)
    .mockImplementation(async (method: string, params: unknown[]) => {
      return originalSend.call(provider, method, params);
    })
    .calledWith('eth_feeHistory', [blockCount, 'pending', [1, 50, 99]])
    .mockResolvedValue(
      mockFeeHistoryResult({
        blockCount: blockCount,
        lastBlockBaseFee: using.currentBaseFee,
        rewardPercentiles: using.rewardPercentiles,
      }),
    );
}

type AmountRewardPercentilesTuple<T extends CryptoNativeAsset> = [Amount<T>, Amount<T>, Amount<T>];

describe(`Given an instance of the ${Eip1559GasPriceEstimator.name}`, () => {
  describe.each<{
    baseFee: CryptoNativeAmount;
    createAmount: CryptoNativeAmountFactory<CryptoNativeAsset>;
    rewardPercentiles: AmountRewardPercentilesTuple<CryptoNativeAsset>;
    speed: TransactionExecutionSpeed;
    expectedMaxPriorityFeePerGas: CryptoNativeAmount;
  }>([
    {
      baseFee: mockEtherGweiAmount(80),
      createAmount: (value) => Amount.ether(value),
      rewardPercentiles: [mockEtherGweiAmount(2), mockEtherGweiAmount(3), mockEtherGweiAmount(5)],
      speed: TransactionExecutionSpeed.SLOW,
      expectedMaxPriorityFeePerGas: mockEtherGweiAmount(2),
    },
    {
      baseFee: mockMaticGweiAmount(80),
      createAmount: (value) => Amount.matic(value),
      rewardPercentiles: [mockMaticGweiAmount(2), mockMaticGweiAmount(3), mockMaticGweiAmount(5)],
      speed: TransactionExecutionSpeed.AVERAGE,
      expectedMaxPriorityFeePerGas: mockMaticGweiAmount(3),
    },
    {
      baseFee: mockEtherGweiAmount(80),
      createAmount: (value) => Amount.ether(value),
      rewardPercentiles: [mockEtherGweiAmount(2), mockEtherGweiAmount(3), mockEtherGweiAmount(5)],
      speed: TransactionExecutionSpeed.FAST,
      expectedMaxPriorityFeePerGas: mockEtherGweiAmount(5),
    },
  ])(
    'when estimating gas price for speed: $speed',
    ({ baseFee, createAmount, rewardPercentiles, speed, expectedMaxPriorityFeePerGas }) => {
      it(`should create a ${Eip1559GasPriceEstimate.name} w/ the expected estimates`, async () => {
        const provider = mock<providers.JsonRpcProvider>();

        mockEip1559GasPriceSupport(provider, {
          currentBaseFee: baseFee,
          rewardPercentiles,
        });

        const gasEstimator = new Eip1559GasPriceEstimator(provider, createAmount);
        const estimation = await gasEstimator.estimate(speed);

        const expected = new Eip1559GasPriceEstimate(baseFee, expectedMaxPriorityFeePerGas);
        expect(estimation).toEqual(expected);
      });
    },
  );
});
