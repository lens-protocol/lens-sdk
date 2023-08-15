import { mockPostFragment } from '@lens-protocol/api-bindings/mocks';
import { TransactionError, TransactionErrorReason } from '@lens-protocol/domain/entities';
import { mockCreatePostRequest, mockTransactionData } from '@lens-protocol/domain/mocks';
import { CreatePostRequest } from '@lens-protocol/domain/use-cases/publications';
import { BroadcastingError, TransactionData } from '@lens-protocol/domain/use-cases/transactions';
import { failure, Result, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { CreatePostPresenter, INewPostCacheManager } from '../CreatePostPresenter';

function setupTestScenario() {
  const cacheManager = mock<INewPostCacheManager>();

  const presenter = new CreatePostPresenter(cacheManager);

  return {
    cacheManager,
    presenter,
  };
}

describe(`Given an instance of the ${CreatePostPresenter.name}`, () => {
  describe.each([new BroadcastingError('error')])(
    `and the "${CreatePostPresenter.prototype.present.name}" method is called with failure($name)`,
    (error) => {
      const result: Result<never, typeof error> = failure(error);

      describe(`when the "${CreatePostPresenter.prototype.asResult.name}" is called`, () => {
        it(`should eagerly return the failure`, async () => {
          const { presenter } = setupTestScenario();

          await presenter.present(result);

          expect(presenter.asResult()).toEqual(result);
        });
      });
    },
  );

  describe(`and the "${CreatePostPresenter.prototype.asResult.name}" method is called`, () => {
    describe(`when the "${CreatePostPresenter.prototype.present.name}" method is subsequently called`, () => {
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
          const { cacheManager, presenter } = setupTestScenario();
          cacheManager.fetchNewPost.mockResolvedValue(post);

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
