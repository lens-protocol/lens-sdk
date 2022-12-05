import { mockDaiAsset } from '../__helpers__/mocks';
import { ether, matic, usd } from '../Asset';
import { ChainType } from '../ChainType';

describe('Given the Asset type definition', () => {
  [
    {
      left: mockDaiAsset({
        chainType: ChainType.ETHEREUM,
      }),
      right: mockDaiAsset({
        chainType: ChainType.ETHEREUM,
      }),
      expected: true,
    },
    {
      left: usd(),
      right: usd(),
      expected: true,
    },
    {
      left: ether(),
      right: ether(),
      expected: true,
    },
    {
      left: matic(),
      right: matic(),
      expected: true,
    },
    {
      left: mockDaiAsset({
        chainType: ChainType.ETHEREUM,
      }),
      right: usd(),
      expected: false,
    },
    {
      left: mockDaiAsset({
        chainType: ChainType.ETHEREUM,
      }),
      right: ether(),
      expected: false,
    },
    {
      left: mockDaiAsset({
        chainType: ChainType.ETHEREUM,
      }),
      right: matic(),
      expected: false,
    },
    {
      left: usd(),
      right: ether(),
      expected: false,
    },
    {
      left: usd(),
      right: matic(),
      expected: false,
    },
    {
      left: ether(),
      right: matic(),
      expected: false,
    },
  ].forEach(({ left, right, expected }) => {
    describe(`when comparing ${left.constructor.name} and ${right.constructor.name} references`, () => {
      it(`should resolve reference equality to ${expected.toString()}`, () => {
        expect(left === right).toEqual(expected);
      });
    });
  });

  describe('when comparing 2 ERC20 Asset of the same token on different chains', () => {
    it('should resolve reference equality to false', () => {
      const left = mockDaiAsset({
        chainType: ChainType.ETHEREUM,
      });
      const right = mockDaiAsset({
        chainType: ChainType.POLYGON,
      });

      expect(left).not.toBe(right);
    });
  });
});
