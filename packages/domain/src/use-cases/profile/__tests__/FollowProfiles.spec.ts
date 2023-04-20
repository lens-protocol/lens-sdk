/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { SignlessProtocolCallUseCase } from '../../transactions/SignlessProtocolCallUseCase';
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

function mockProtocolCallUseCase<T extends FollowRequest>() {
  return mock<SubsidizedCall<T>>();
}

function mockSignlessProtocolCallUseCase<T extends UnconstrainedFollowRequest>() {
  return mock<SignlessProtocolCallUseCase<T>>();
}

function setupFollowProfiles({
  tokenAvailability = mock<TokenAvailability>(),
  presenter = mock<IFollowProfilePresenter>(),
  signedProtocolCall = mockProtocolCallUseCase<FollowRequest>(),
  signlessProtocolCall = mockSignlessProtocolCallUseCase<UnconstrainedFollowRequest>(),
}: {
  tokenAvailability?: TokenAvailability;
  presenter?: IFollowProfilePresenter;
  signedProtocolCall?: SubsidizedCall<FollowRequest>;
  signlessProtocolCall?: SignlessProtocolCallUseCase<UnconstrainedFollowRequest>;
}) {
  return new FollowProfiles(tokenAvailability, signedProtocolCall, signlessProtocolCall, presenter);
}

describe(`Given an instance of the ${FollowProfiles.name} interactor`, () => {
  describe(`when calling the "${FollowProfiles.prototype.execute.name}" method`, () => {
    describe('with an UnconstrainedFollowRequest', () => {
      const request = mockUnconstrainedFollowRequest();

      it(`should execute the ${SignlessProtocolCallUseCase.name}<UnconstrainedFollowRequest> strategy`, async () => {
        const signedProtocolCall = mockProtocolCallUseCase<FollowRequest>();
        const signlessProtocolCall = mockSignlessProtocolCallUseCase<UnconstrainedFollowRequest>();

        const followProfiles = setupFollowProfiles({
          signedProtocolCall,
          signlessProtocolCall,
        });

        await followProfiles.execute(request);

        expect(signlessProtocolCall.execute).toHaveBeenCalledWith(request);
        expect(signedProtocolCall.execute).not.toHaveBeenCalled();
      });
    });

    describe('with a ProfileOwnerFollowRequest', () => {
      const request = mockProfileOwnerFollowRequest();

      it(`should execute the ${SubsidizedCall.name}<T> strategy`, async () => {
        const signedProtocolCall = mockProtocolCallUseCase<FollowRequest>();
        const signlessProtocolCall = mockSignlessProtocolCallUseCase<UnconstrainedFollowRequest>();

        const followProfiles = setupFollowProfiles({
          signedProtocolCall,
          signlessProtocolCall,
        });

        await followProfiles.execute(request);

        expect(signedProtocolCall.execute).toHaveBeenCalledWith(request);
        expect(signlessProtocolCall.execute).not.toHaveBeenCalled();
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
        const signedProtocolCall = mockProtocolCallUseCase<FollowRequest>();
        const signlessProtocolCall = mockSignlessProtocolCallUseCase<UnconstrainedFollowRequest>();

        const followProfiles = setupFollowProfiles({
          signedProtocolCall,
          signlessProtocolCall,
          tokenAvailability,
        });

        await followProfiles.execute(request);

        expect(signedProtocolCall.execute).toHaveBeenCalledWith(request);
        expect(signlessProtocolCall.execute).not.toHaveBeenCalled();
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
