/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { SignlessSubsidizeOnChain } from '../../transactions/SignlessSubsidizeOnChain';
import { SubsidizeOnChain } from '../../transactions/SubsidizeOnChain';
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
  UnconstrainedFollowRequest,
} from '../FollowProfile';
import {
  mockPaidFollowRequest,
  mockProfileOwnerFollowRequest,
  mockUnconstrainedFollowRequest,
} from '../__helpers__/mocks';

function mockSubsidizedCall<T extends FollowRequest>() {
  return mock<SubsidizeOnChain<T>>();
}

function mockSignlessSubsidizedCall<T extends UnconstrainedFollowRequest>() {
  return mock<SignlessSubsidizeOnChain<T>>();
}

function setupFollowProfile({
  tokenAvailability = mock<TokenAvailability>(),
  presenter = mock<IFollowProfilePresenter>(),
  signedCall = mockSubsidizedCall<FollowRequest>(),
  signlessCall = mockSignlessSubsidizedCall<UnconstrainedFollowRequest>(),
}: {
  tokenAvailability?: TokenAvailability;
  presenter?: IFollowProfilePresenter;
  signedCall?: SubsidizeOnChain<FollowRequest>;
  signlessCall?: SignlessSubsidizeOnChain<UnconstrainedFollowRequest>;
}) {
  return new FollowProfile(tokenAvailability, signedCall, signlessCall, presenter);
}

describe(`Given an instance of the ${FollowProfile.name} interactor`, () => {
  describe(`when calling the "${FollowProfile.prototype.execute.name}" method`, () => {
    describe('with an UnconstrainedFollowRequest', () => {
      const request = mockUnconstrainedFollowRequest();

      it(`should execute the ${SignlessSubsidizeOnChain.name}<UnconstrainedFollowRequest> strategy`, async () => {
        const signedCall = mockSubsidizedCall<FollowRequest>();
        const signlessCall = mockSignlessSubsidizedCall<UnconstrainedFollowRequest>();

        const followProfile = setupFollowProfile({
          signedCall,
          signlessCall,
        });

        await followProfile.execute(request);

        expect(signlessCall.execute).toHaveBeenCalledWith(request);
        expect(signedCall.execute).not.toHaveBeenCalled();
      });
    });

    describe('with a ProfileOwnerFollowRequest', () => {
      const request = mockProfileOwnerFollowRequest();

      it(`should execute the ${SubsidizeOnChain.name}<T> strategy`, async () => {
        const signedCall = mockSubsidizedCall<FollowRequest>();
        const signlessCall = mockSignlessSubsidizedCall<UnconstrainedFollowRequest>();

        const followProfile = setupFollowProfile({
          signedCall,
          signlessCall,
        });

        await followProfile.execute(request);

        expect(signedCall.execute).toHaveBeenCalledWith(request);
        expect(signlessCall.execute).not.toHaveBeenCalled();
      });
    });

    describe('with a PaidFollowRequest', () => {
      const request = mockPaidFollowRequest();

      it(`should execute the ${SubsidizeOnChain.name}<T> strategy`, async () => {
        const tokenAvailability = mockTokeAvailability({
          request: {
            amount: request.fee.amount,
            spender: request.fee.contractAddress,
          },
          result: success(),
        });
        const signedCall = mockSubsidizedCall<FollowRequest>();
        const signlessCall = mockSignlessSubsidizedCall<UnconstrainedFollowRequest>();

        const followProfile = setupFollowProfile({
          signedCall,
          signlessCall,
          tokenAvailability,
        });

        await followProfile.execute(request);

        expect(signedCall.execute).toHaveBeenCalledWith(request);
        expect(signlessCall.execute).not.toHaveBeenCalled();
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
          const presenter = mock<IFollowProfilePresenter>();

          const followProfile = setupFollowProfile({
            tokenAvailability,
            presenter,
          });

          await followProfile.execute(request);

          expect(presenter.present).toHaveBeenCalledWith(failure(error));
        },
      );
    });
  });
});
