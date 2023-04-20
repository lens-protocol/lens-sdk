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
  CollectPublication,
  CollectRequest,
  FreeCollectRequest,
  ICollectPublicationPresenter,
} from '../CollectPublication';
import { mockFreeCollectRequest, mockPaidCollectRequest } from '../__helpers__/mocks';

function mockSubsidizedCall<T extends CollectRequest>() {
  return mock<SubsidizedCall<T>>();
}

function mockSignlessSubsidizedCall<T extends FreeCollectRequest>() {
  return mock<SignlessSubsidizedCall<T>>();
}

function setupCollectPublication({
  presenter,
  tokenAvailability,
  signedCall = mockSubsidizedCall<CollectRequest>(),
  signlessCall = mockSignlessSubsidizedCall<FreeCollectRequest>(),
}: {
  presenter: ICollectPublicationPresenter;
  tokenAvailability: TokenAvailability;
  signedCall?: SubsidizedCall<CollectRequest>;
  signlessCall?: SignlessSubsidizedCall<FreeCollectRequest>;
}) {
  return new CollectPublication(tokenAvailability, signedCall, signlessCall, presenter);
}

describe(`Given the ${CollectPublication.name} use-case interactor`, () => {
  const presenter = mock<ICollectPublicationPresenter>();

  describe(`when "${CollectPublication.prototype.execute.name}" method is invoked`, () => {
    describe('with a FreeCollectRequest', () => {
      it(`should execute the ${SignlessSubsidizedCall.name}<FreeCollectRequest> strategy`, async () => {
        const request = mockFreeCollectRequest();
        const signedCall = mockSubsidizedCall<CollectRequest>();
        const signlessCall = mockSignlessSubsidizedCall<FreeCollectRequest>();

        const followProfiles = setupCollectPublication({
          tokenAvailability: mock<TokenAvailability>(),
          signedCall,
          signlessCall,
          presenter,
        });

        await followProfiles.execute(request);

        expect(signlessCall.execute).toHaveBeenCalledWith(request);
        expect(signedCall.execute).not.toHaveBeenCalled();
      });
    });

    describe('with a FreeCollectRequest and followerOnly', () => {
      it(`should execute the ${SubsidizedCall.name}<CollectRequest> strategy`, async () => {
        const request = mockFreeCollectRequest({
          followerOnly: true,
        });
        const signedCall = mockSubsidizedCall<CollectRequest>();
        const signlessCall = mockSignlessSubsidizedCall<FreeCollectRequest>();

        const followProfiles = setupCollectPublication({
          tokenAvailability: mock<TokenAvailability>(),
          signedCall,
          signlessCall,
          presenter,
        });

        await followProfiles.execute(request);

        expect(signedCall.execute).toHaveBeenCalledWith(request);
        expect(signlessCall.execute).not.toHaveBeenCalledWith(request);
      });
    });

    describe('with an associated collect fee', () => {
      const request = mockPaidCollectRequest();

      it(`should execute the ${SubsidizedCall.name}<CollectRequest> strategy`, async () => {
        const request = mockPaidCollectRequest();
        const signedCall = mockSubsidizedCall<CollectRequest>();
        const signlessCall = mockSignlessSubsidizedCall<FreeCollectRequest>();
        const tokenAvailability = mockTokeAvailability({
          request: {
            amount: request.fee.amount,
            spender: request.fee.contractAddress,
          },
          result: success(),
        });

        const followProfiles = setupCollectPublication({
          tokenAvailability,
          signedCall,
          signlessCall,
          presenter,
        });

        await followProfiles.execute(request);

        expect(signedCall.execute).toHaveBeenCalled();
        expect(signlessCall.execute).not.toHaveBeenCalledWith(request);
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

          const collectPublication = setupCollectPublication({
            tokenAvailability,
            presenter,
          });

          await collectPublication.execute(request);

          expect(presenter.present).toHaveBeenLastCalledWith(failure(error));
        },
      );
    });
  });
});
