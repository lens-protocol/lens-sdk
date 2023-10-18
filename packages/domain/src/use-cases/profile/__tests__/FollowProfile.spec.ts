/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { DelegableSigning } from '../../transactions/DelegableSigning';
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
  FreeFollowRequest,
} from '../FollowProfile';
import { mockPaidFollowRequest, mockFreeFollowRequest } from '../__helpers__/mocks';

function mockSubsidizedCall<T extends FollowRequest>() {
  return mock<SubsidizeOnChain<T>>();
}

function mockDelegableSigningCall<T extends FreeFollowRequest>() {
  return mock<DelegableSigning<T>>();
}

function setupFollowProfile({
  tokenAvailability = mock<TokenAvailability>(),
  presenter = mock<IFollowProfilePresenter>(),
  signedCall = mockSubsidizedCall<FollowRequest>(),
  delegableCall = mockDelegableSigningCall<FreeFollowRequest>(),
}: {
  tokenAvailability?: TokenAvailability;
  presenter?: IFollowProfilePresenter;
  signedCall?: SubsidizeOnChain<FollowRequest>;
  delegableCall?: DelegableSigning<FreeFollowRequest>;
}) {
  return new FollowProfile(tokenAvailability, signedCall, delegableCall, presenter);
}

describe(`Given an instance of the ${FollowProfile.name} interactor`, () => {
  describe(`when calling the "${FollowProfile.prototype.execute.name}" method`, () => {
    describe('with an FreeFollowRequest', () => {
      const request = mockFreeFollowRequest();

      it(`should execute the ${DelegableSigning.name}<FreeFollowRequest> strategy`, async () => {
        const signedCall = mockSubsidizedCall<FollowRequest>();
        const delegableCall = mockDelegableSigningCall<FreeFollowRequest>();

        const followProfile = setupFollowProfile({
          signedCall,
          delegableCall,
        });

        await followProfile.execute(request);

        expect(delegableCall.execute).toHaveBeenCalledWith(request);
        expect(signedCall.execute).not.toHaveBeenCalled();
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
        const delegableCall = mockDelegableSigningCall<FreeFollowRequest>();

        const followProfile = setupFollowProfile({
          signedCall,
          delegableCall,
          tokenAvailability,
        });

        await followProfile.execute(request);

        expect(signedCall.execute).toHaveBeenCalledWith(request);
        expect(delegableCall.execute).not.toHaveBeenCalled();
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
