import { mockPostFragment } from '@lens-protocol/api-bindings/mocks';
import {
  PendingSigningRequestError,
  TransactionError,
  TransactionErrorReason,
  UserRejectedError,
  WalletConnectionError,
  WalletConnectionErrorReason,
} from '@lens-protocol/domain/entities';
import { mockCreatePostRequest, mockTransactionData } from '@lens-protocol/domain/mocks';
import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import {
  BroadcastingError,
  BroadcastingErrorReason,
  TransactionData,
} from '@lens-protocol/domain/use-cases/transactions';
import { failure, Result, success } from '@lens-protocol/shared-kernel';

import { NewPublicationPresenter } from '../NewPublicationPresenter';

function setupTestScenario() {
  const fetchNewPublicationHandler = jest.fn();

  const presenter = new NewPublicationPresenter(fetchNewPublicationHandler);

  return {
    fetchNewPublicationHandler,
    presenter,
  };
}

describe(`Given an instance of the ${NewPublicationPresenter.name}`, () => {
  describe.each([
    new BroadcastingError(BroadcastingErrorReason.UNKNOWN),
    new PendingSigningRequestError(),
    new UserRejectedError(),
    new WalletConnectionError(WalletConnectionErrorReason.INCORRECT_CHAIN),
  ])(
    `and the "${NewPublicationPresenter.prototype.present.name}" method is called with failure($name)`,
    (error) => {
      const result: Result<never, typeof error> = failure(error);

      describe(`when the "${NewPublicationPresenter.prototype.asResult.name}" is called`, () => {
        it(`should eagerly return the failure`, async () => {
          const { presenter } = setupTestScenario();

          await presenter.present(result);

          expect(presenter.asResult()).toEqual(result);
        });
      });
    },
  );

  describe(`and the "${NewPublicationPresenter.prototype.asResult.name}" method is called`, () => {
    describe(`when the "${NewPublicationPresenter.prototype.present.name}" method is subsequently called`, () => {
      describe(`with failure(${TransactionError.name})`, () => {
        const result: Result<never, TransactionError> = failure(
          new TransactionError(TransactionErrorReason.REVERTED),
        );

        it('should yield the failure as result of the "waitForCompletion" callback', async () => {
          const { presenter } = setupTestScenario();

          const broadcasted = presenter.asResult();

          const [completion] = await Promise.all([
            broadcasted.unwrap().waitForCompletion(),
            presenter.present(result),
          ]);

          expect(completion).toEqual(result);
        });
      });

      describe(`with success(TransactionData<CreatePostRequest>)`, () => {
        const request = mockCreatePostRequest();
        const result: Result<TransactionData<CreatePostRequest>, never> = success(
          mockTransactionData({ request }),
        );
        const post = mockPostFragment();

        it('should fetch and return the newly create Profile as result of the "waitForCompletion" callback', async () => {
          const { fetchNewPublicationHandler, presenter } = setupTestScenario();
          fetchNewPublicationHandler.mockResolvedValue(post);

          const broadcasted = presenter.asResult();

          const [completion] = await Promise.all([
            broadcasted.unwrap().waitForCompletion(),
            presenter.present(result),
          ]);

          expect(completion).toEqual(success(post));
        });
      });
    });
  });
});
