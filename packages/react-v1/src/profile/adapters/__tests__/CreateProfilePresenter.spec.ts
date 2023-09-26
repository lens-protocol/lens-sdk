import { mockProfileFragment } from '@lens-protocol/api-bindings/mocks';
import { TransactionError, TransactionErrorReason } from '@lens-protocol/domain/entities';
import { mockCreateProfileRequest, mockTransactionData } from '@lens-protocol/domain/mocks';
import {
  CreateProfileRequest,
  DuplicatedHandleError,
} from '@lens-protocol/domain/use-cases/profile';
import { BroadcastingError, TransactionData } from '@lens-protocol/domain/use-cases/transactions';
import { failure, Result, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { IProfileCacheManager } from '../../../transactions/adapters/IProfileCacheManager';
import { CreateProfilePresenter } from '../CreateProfilePresenter';

function setupTestScenario() {
  const cacheManager = mock<IProfileCacheManager>();

  const presenter = new CreateProfilePresenter(cacheManager);

  return {
    cacheManager,
    presenter,
  };
}

describe(`Given an instance of the ${CreateProfilePresenter.name}`, () => {
  describe.each([new DuplicatedHandleError('handle'), new BroadcastingError('error')])(
    `and the "${CreateProfilePresenter.prototype.present.name}" method is called with failure($name)`,
    (error) => {
      const result: Result<never, typeof error> = failure(error);

      describe(`when the "${CreateProfilePresenter.prototype.asResult.name}" is called`, () => {
        it(`should eagerly return the failure`, async () => {
          const { presenter } = setupTestScenario();

          await presenter.present(result);

          expect(presenter.asResult()).toEqual(result);
        });
      });
    },
  );

  describe(`and the "${CreateProfilePresenter.prototype.asResult.name}" method is called`, () => {
    describe(`when the "${CreateProfilePresenter.prototype.present.name}" method is subsequently called`, () => {
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

      describe(`with success(TransactionData<CreateProfileRequest>)`, () => {
        const request = mockCreateProfileRequest();
        const result: Result<TransactionData<CreateProfileRequest>, never> = success(
          mockTransactionData({ request }),
        );
        const profile = mockProfileFragment();

        it('should fetch and return the newly create Profile as result of the "waitForCompletion" callback', async () => {
          const { cacheManager, presenter } = setupTestScenario();
          cacheManager.fetchNewProfile.mockResolvedValue(profile);

          const broadcasted = presenter.asResult();

          const [completion] = await Promise.all([
            broadcasted.unwrap().waitForCompletion(),
            presenter.present(result),
          ]);

          expect(completion).toEqual(success(profile));
        });
      });
    });
  });
});
