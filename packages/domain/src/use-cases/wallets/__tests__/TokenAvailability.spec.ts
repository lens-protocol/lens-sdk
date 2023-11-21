import { Amount, ChainType, Erc20 } from '@lens-protocol/shared-kernel';
import { mockDaiAmount, mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';

import { Wallet } from '../../../entities';
import {
  mockWallet,
  mockActiveWallet,
  mockIBalanceGateway,
  mockITokenGateway,
} from '../../../mocks';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
  TokenAvailability,
  TokenAvailabilityRequest,
} from '../TokenAvailability';

function setupTokenAvailability<T extends Erc20>({
  request,
  allowance,
  balance,
  wallet = mockWallet(),
}: {
  request: TokenAvailabilityRequest;
  allowance: Amount<T>;
  balance: Amount<T>;
  wallet?: Wallet;
}) {
  const balancesGateway = mockIBalanceGateway({
    wallet,
    asset: request.amount.asset,
    balance,
  });

  const tokenGateway = mockITokenGateway({
    asset: request.amount.asset,
    owner: wallet,
    spender: request.spender,
    allowance,
  });

  const activeWallet = mockActiveWallet({ wallet });

  return new TokenAvailability(balancesGateway, tokenGateway, activeWallet);
}

function mockTokenAvailabilityRequest(): TokenAvailabilityRequest {
  return {
    amount: mockDaiAmount(1, ChainType.POLYGON),
    spender: mockEvmAddress(),
  };
}

const request = mockTokenAvailabilityRequest();

describe(`Given the ${TokenAvailability.name} interactor`, () => {
  describe('and while checking availability of a token for a given fee module address (i.e. spender)', () => {
    describe('when the token allowance is enough to accommodate the requested amount', () => {
      it('should resolve with Success<void>', async () => {
        const tokenAvailability = setupTokenAvailability({
          request,
          allowance: request.amount,
          balance: request.amount,
        });

        const result = await tokenAvailability.checkAvailability(request);

        expect(result.isSuccess()).toBe(true);
      });
    });

    describe('when the user allowance is below the requested amount', () => {
      it(`should fail with ${InsufficientAllowanceError.name}`, async () => {
        const tokenAvailability = setupTokenAvailability({
          request,
          allowance: request.amount.clone(0),
          balance: request.amount,
        });

        const result = await tokenAvailability.checkAvailability(request);

        expect(() => result.unwrap()).toThrow(InsufficientAllowanceError);
      });
    });

    describe(`when the user's funds are not enough for the requested amount`, () => {
      it(`should fail with ${InsufficientFundsError.name}`, async () => {
        const tokenAvailability = setupTokenAvailability({
          request,
          allowance: request.amount,
          balance: request.amount.clone(0),
        });

        const result = await tokenAvailability.checkAvailability(request);

        expect(() => result.unwrap()).toThrow(InsufficientFundsError);
      });
    });
  });
});
