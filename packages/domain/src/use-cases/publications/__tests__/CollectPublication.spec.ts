import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { ProtocolCallUseCase } from '../../transactions/ProtocolCallUseCase';
import { SignlessProtocolCallUseCase } from '../../transactions/SignlessProtocolCallUseCase';
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

function mockProtocolCallUseCase<T extends CollectRequest>() {
  return mock<ProtocolCallUseCase<T>>();
}

function mockSignlessProtocolCallUseCase<T extends FreeCollectRequest>() {
  return mock<SignlessProtocolCallUseCase<T>>();
}

function setupCollectPublication({
  presenter,
  tokenAvailability,
  signedProtocolCall = mockProtocolCallUseCase<CollectRequest>(),
  signlessProtocolCall = mockSignlessProtocolCallUseCase<FreeCollectRequest>(),
}: {
  presenter: ICollectPublicationPresenter;
  tokenAvailability: TokenAvailability;
  signedProtocolCall?: ProtocolCallUseCase<CollectRequest>;
  signlessProtocolCall?: SignlessProtocolCallUseCase<FreeCollectRequest>;
}) {
  return new CollectPublication(
    tokenAvailability,
    signedProtocolCall,
    signlessProtocolCall,
    presenter,
  );
}

describe(`Given the ${CollectPublication.name} use-case interactor`, () => {
  const presenter = mock<ICollectPublicationPresenter>();

  describe(`when "${CollectPublication.prototype.execute.name}" method is invoked`, () => {
    describe('with a FreeCollectRequest', () => {
      it(`should execute the ${SignlessProtocolCallUseCase.name}<FreeCollectRequest> strategy`, async () => {
        const request = mockFreeCollectRequest();
        const signedProtocolCall = mockProtocolCallUseCase<CollectRequest>();
        const signlessProtocolCall = mockSignlessProtocolCallUseCase<FreeCollectRequest>();

        const followProfiles = setupCollectPublication({
          tokenAvailability: mock<TokenAvailability>(),
          signedProtocolCall,
          signlessProtocolCall,
          presenter,
        });

        await followProfiles.execute(request);

        expect(signlessProtocolCall.execute).toHaveBeenCalledWith(request);
        expect(signedProtocolCall.execute).not.toHaveBeenCalled();
      });
    });

    describe('with a FreeCollectRequest and followerOnly', () => {
      it(`should execute the ${ProtocolCallUseCase.name}<CollectRequest> strategy`, async () => {
        const request = mockFreeCollectRequest({
          followerOnly: true,
        });
        const signedProtocolCall = mockProtocolCallUseCase<CollectRequest>();
        const signlessProtocolCall = mockSignlessProtocolCallUseCase<FreeCollectRequest>();

        const followProfiles = setupCollectPublication({
          tokenAvailability: mock<TokenAvailability>(),
          signedProtocolCall,
          signlessProtocolCall,
          presenter,
        });

        await followProfiles.execute(request);

        expect(signedProtocolCall.execute).toHaveBeenCalledWith(request);
        expect(signlessProtocolCall.execute).not.toHaveBeenCalledWith(request);
      });
    });

    describe('with an associated collect fee', () => {
      const request = mockPaidCollectRequest();

      it(`should execute the ${ProtocolCallUseCase.name}<CollectRequest> strategy`, async () => {
        const request = mockPaidCollectRequest();
        const signedProtocolCall = mockProtocolCallUseCase<CollectRequest>();
        const signlessProtocolCall = mockSignlessProtocolCallUseCase<FreeCollectRequest>();
        const tokenAvailability = mockTokeAvailability({
          request: {
            amount: request.fee.amount,
            spender: request.fee.contractAddress,
          },
          result: success(),
        });

        const followProfiles = setupCollectPublication({
          tokenAvailability,
          signedProtocolCall,
          signlessProtocolCall,
          presenter,
        });

        await followProfiles.execute(request);

        expect(signedProtocolCall.execute).toHaveBeenCalled();
        expect(signlessProtocolCall.execute).not.toHaveBeenCalledWith(request);
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
