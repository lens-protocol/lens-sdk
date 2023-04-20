/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { SignlessSubsidizedCall } from '../../transactions/SignlessSubsidizedCall';
import { SubsidizedCall } from '../../transactions/SubsidizedCall';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
  TokenAvailability,
} from '../../wallets/TokenAvailability';
import { mockTokeAvailability } from '../../wallets/__helpers__/mocks';
import {
  FollowProfiles,
  FollowRequest,
  IFollowProfilePresenter,
  UnconstrainedFollowRequest,
} from '../FollowProfiles';
import {
  mockPaidFollowRequest,
  mockProfileOwnerFollowRequest,
  mockUnconstrainedFollowRequest,
} from '../__helpers__/mocks';

function mockSubsidizedCall<T extends FollowRequest>() {
  return mock<SubsidizedCall<T>>();
}

function mockSignlessSubsidizedCall<T extends UnconstrainedFollowRequest>() {
  return mock<SignlessSubsidizedCall<T>>();
}

function setupFollowProfiles({
  tokenAvailability = mock<TokenAvailability>(),
  presenter = mock<IFollowProfilePresenter>(),
  signedCall = mockSubsidizedCall<FollowRequest>(),
  signlessCall = mockSignlessSubsidizedCall<UnconstrainedFollowRequest>(),
}: {
  tokenAvailability?: TokenAvailability;
  presenter?: IFollowProfilePresenter;
  signedCall?: SubsidizedCall<FollowRequest>;
  signlessCall?: SignlessSubsidizedCall<UnconstrainedFollowRequest>;
}) {
  return new FollowProfiles(tokenAvailability, signedCall, signlessCall, presenter);
}

describe(`Given an instance of the ${FollowProfiles.name} interactor`, () => {
  describe(`when calling the "${FollowProfiles.prototype.execute.name}" method`, () => {
    describe('with an UnconstrainedFollowRequest', () => {
      const request = mockUnconstrainedFollowRequest();

      it(`should execute the ${SignlessSubsidizedCall.name}<UnconstrainedFollowRequest> strategy`, async () => {
        const signedCall = mockSubsidizedCall<FollowRequest>();
        const signlessCall = mockSignlessSubsidizedCall<UnconstrainedFollowRequest>();

        const followProfiles = setupFollowProfiles({
          signedCall,
          signlessCall,
        });

        await followProfiles.execute(request);

        expect(signlessCall.execute).toHaveBeenCalledWith(request);
        expect(signedCall.execute).not.toHaveBeenCalled();
      });
    });

    describe('with a ProfileOwnerFollowRequest', () => {
      const request = mockProfileOwnerFollowRequest();

      it(`should execute the ${SubsidizedCall.name}<T> strategy`, async () => {
        const signedCall = mockSubsidizedCall<FollowRequest>();
        const signlessCall = mockSignlessSubsidizedCall<UnconstrainedFollowRequest>();

        const followProfiles = setupFollowProfiles({
          signedCall,
          signlessCall,
        });

        await followProfiles.execute(request);

        expect(signedCall.execute).toHaveBeenCalledWith(request);
        expect(signlessCall.execute).not.toHaveBeenCalled();
      });
    });

    describe('with a PaidFollowRequest', () => {
      const request = mockPaidFollowRequest();

      it(`should execute the ${SubsidizedCall.name}<T> strategy`, async () => {
        const tokenAvailability = mockTokeAvailability({
          request: {
            amount: request.fee.amount,
            spender: request.fee.contractAddress,
          },
          result: success(),
        });
        const signedCall = mockSubsidizedCall<FollowRequest>();
        const signlessCall = mockSignlessSubsidizedCall<UnconstrainedFollowRequest>();

        const followProfiles = setupFollowProfiles({
          signedCall,
          signlessCall,
          tokenAvailability,
        });

        await followProfiles.execute(request);

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

          const followProfiles = setupFollowProfiles({
            tokenAvailability,
            presenter,
          });

          await followProfiles.execute(request);

          expect(presenter.present).toHaveBeenCalledWith(failure(error));
        },
      );
    });
  });
});
