import { ether, matic } from '../Asset';
import { ChainType } from '../ChainType';
import { mockDaiAsset, mockUsdAsset } from '../__helpers__/mocks';

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
      left: mockUsdAsset(),
      right: mockUsdAsset(),
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
      right: mockUsdAsset(),
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
      left: mockUsdAsset(),
      right: ether(),
      expected: false,
    },
    {
      left: mockUsdAsset(),
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
