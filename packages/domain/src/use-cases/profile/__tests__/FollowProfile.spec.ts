/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { PaidTransaction } from '../../transactions';
import { DelegableSigning } from '../../transactions/DelegableSigning';
import { SignedOnChain } from '../../transactions/SignedOnChain';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
  TokenAvailability,
} from '../../wallets/TokenAvailability';
import { mockTokeAvailability } from '../../wallets/__helpers__/mocks';
import {
  FollowProfile,
  FollowRequest,
  IFollowProfilePresenter,
  FreeFollowRequest,
} from '../FollowProfile';
import { mockPaidFollowRequest, mockFreeFollowRequest } from '../__helpers__/mocks';

function mockSubsidizedCall<T extends FollowRequest>() {
  return mock<SignedOnChain<T>>();
}

function mockDelegableSigningCall<T extends FreeFollowRequest>() {
  return mock<DelegableSigning<T>>();
}

function setupTestScenario({
  tokenAvailability = mock<TokenAvailability>(),
}: {
  tokenAvailability?: TokenAvailability;
} = {}) {
  const presenter = mock<IFollowProfilePresenter>();
  const signedExecution = mockSubsidizedCall<FollowRequest>();
  const delegableExecution = mockDelegableSigningCall<FreeFollowRequest>();
  const paidExecution = mock<PaidTransaction<FollowRequest>>();
  const followProfile = new FollowProfile(
    tokenAvailability,
    signedExecution,
    delegableExecution,
    paidExecution,
    presenter,
  );

  return {
    followProfile,
    presenter,
    signedExecution,
    delegableExecution,
    paidExecution,
  };
}

describe(`Given an instance of the ${FollowProfile.name} interactor`, () => {
  describe(`when calling the "${FollowProfile.prototype.execute.name}" method`, () => {
    describe('with an FreeFollowRequest', () => {
      const request = mockFreeFollowRequest();

      it(`should execute the ${DelegableSigning.name}<FreeFollowRequest> strategy`, async () => {
        const { followProfile, signedExecution, delegableExecution } = setupTestScenario();

        await followProfile.execute(request);

        expect(delegableExecution.execute).toHaveBeenCalledWith(request);
        expect(signedExecution.execute).not.toHaveBeenCalled();
      });
    });

    describe('with a PaidFollowRequest', () => {
      const request = mockPaidFollowRequest();

      it(`should execute the ${SignedOnChain.name}<T> strategy`, async () => {
        const tokenAvailability = mockTokeAvailability({
          request: {
            amount: request.fee.amount,
            spender: request.fee.contractAddress,
          },
          result: success(),
        });
        const { followProfile, signedExecution, delegableExecution } = setupTestScenario({
          tokenAvailability,
        });

        await followProfile.execute(request);

        expect(signedExecution.execute).toHaveBeenCalledWith(request);
        expect(delegableExecution.execute).not.toHaveBeenCalled();
      });

      it.each([
        {
          error: new InsufficientAllowanceError(request.fee.amount),
        },
        {
          error: new InsufficientFundsError(request.fee.amount),
        },
      ])(
        `should present an $error.name if the token availability checks fails with it and abort the operation`,
        async ({ error }) => {
          const tokenAvailability = mockTokeAvailability({
            request: {
              amount: request.fee.amount,
              spender: request.fee.contractAddress,
            },
            result: failure(error),
          });
          const { followProfile, presenter } = setupTestScenario({
            tokenAvailability,
          });

          await followProfile.execute(request);

          expect(presenter.present).toHaveBeenCalledWith(failure(error));
        },
      );
    });
  });

  describe(`when executed with a request that has the "sponsored" flag set to false`, () => {
    it(`should support the ${PaidTransaction.name}<T> strategy`, async () => {
      const request = mockPaidFollowRequest({ sponsored: false });
      const tokenAvailability = mockTokeAvailability({
        request: {
          amount: request.fee.amount,
          spender: request.fee.contractAddress,
        },
        result: success(),
      });
      const { followProfile, signedExecution, delegableExecution, paidExecution } =
        setupTestScenario({
          tokenAvailability,
        });

      await followProfile.execute(request);

      expect(paidExecution.execute).toHaveBeenCalledWith(request);
      expect(signedExecution.execute).not.toHaveBeenCalled();
      expect(delegableExecution.execute).not.toHaveBeenCalled();
    });
  });
});
