import { failure, invariant, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { DelegableSigning } from '../../transactions';
import { SubsidizeOnChain } from '../../transactions/SubsidizeOnChain';
import {
  InsufficientAllowanceError,
  InsufficientFundsError,
  TokenAvailability,
} from '../../wallets/TokenAvailability';
import { mockTokeAvailability } from '../../wallets/__helpers__/mocks';
import {
  OpenAction,
  OpenActionRequest,
  IOpenActionPresenter,
  LegacyCollectRequest,
  SimpleCollectRequest,
  UnknownActionRequest,
  isPaidCollectRequest,
} from '../OpenAction';
import {
  mockCollectFee,
  mockLegacyCollectRequest,
  mockMultirecipientCollectRequest,
  mockSimpleCollectRequest,
  mockUnknownActionRequest,
} from '../__helpers__/mocks';

function setupCollectPublication({
  tokenAvailability = mock<TokenAvailability>(),
}: {
  tokenAvailability?: TokenAvailability;
} = {}) {
  const presenter = mock<IOpenActionPresenter>();
  const signedExecution = mock<SubsidizeOnChain<OpenActionRequest>>();
  const delegableExecution =
    mock<DelegableSigning<LegacyCollectRequest | SimpleCollectRequest | UnknownActionRequest>>();
  const openAction = new OpenAction(
    tokenAvailability,
    signedExecution,
    delegableExecution,
    presenter,
  );

  return {
    delegableExecution,
    openAction,
    presenter,
    signedExecution,
  };
}

describe(`Given the ${OpenAction.name} use-case interactor`, () => {
  describe(`when "${OpenAction.prototype.execute.name}" method is invoked`, () => {
    describe.each([
      {
        type: 'LegacyCollectRequest',
        description: 'with a LegacyCollectRequest w/o a fee',
        request: mockLegacyCollectRequest({ fee: undefined }),
      },
      {
        type: 'SimpleCollectRequest',
        description: 'with a SimpleCollectRequest w/o a fee',
        request: mockSimpleCollectRequest({ fee: undefined }),
      },
      {
        type: 'UnknownActionRequest',
        description: 'with a UnknownActionRequest',
        request: mockUnknownActionRequest(),
      },
    ])('with a $description', ({ request, type }) => {
      it(`should execute the ${DelegableSigning.name}<${type}> strategy`, async () => {
        const { openAction, signedExecution, delegableExecution } = setupCollectPublication();

        await openAction.execute(request);

        expect(delegableExecution.execute).toHaveBeenCalledWith(request);
        expect(signedExecution.execute).not.toHaveBeenCalled();
      });
    });

    describe.each([
      {
        type: 'LegacyCollectRequest',
        description: 'with a LegacyCollectRequest w/ fee',
        request: mockLegacyCollectRequest({ fee: mockCollectFee() }),
      },
      {
        type: 'SimpleCollectRequest',
        description: 'with a SimpleCollectRequest w/ fee',
        request: mockSimpleCollectRequest({ fee: mockCollectFee() }),
      },
      {
        type: 'MultirecipientCollectRequest',
        description: 'with a SimpleCollectRequest (always w/ fee)',
        request: mockMultirecipientCollectRequest(),
      },
    ])('with a $description', ({ request, type }) => {
      invariant(isPaidCollectRequest(request), 'Test misconfiguration.');

      it(`should execute the ${DelegableSigning.name}<${type}> strategy`, async () => {
        const tokenAvailability = mockTokeAvailability({
          request: {
            amount: request.fee.amount,
            spender: request.fee.contractAddress,
          },
          result: success(),
        });

        const { openAction, signedExecution, delegableExecution } = setupCollectPublication({
          tokenAvailability,
        });

        await openAction.execute(request);

        expect(delegableExecution.execute).not.toHaveBeenCalled();
        expect(signedExecution.execute).toHaveBeenCalledWith(request);
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

          const { openAction, presenter } = setupCollectPublication({
            tokenAvailability,
          });

          await openAction.execute(request);

          expect(presenter.present).toHaveBeenLastCalledWith(failure(error));
        },
      );
    });
  });
});
