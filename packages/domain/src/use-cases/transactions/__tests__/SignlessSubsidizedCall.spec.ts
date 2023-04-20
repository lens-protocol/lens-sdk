import { success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { ProxyTransaction, TransactionRequestModel } from '../../../entities';
import {
  MockedProxyTransaction,
  mockTransactionRequestModel,
} from '../../../entities/__helpers__/mocks';
import {
  ISignlessSubsidizedCallPresenter,
  ISignlessSubsidizedCallRelayer,
  SignlessSubsidizedCall,
} from '../SignlessSubsidizedCall';
import { TransactionQueue } from '../TransactionQueue';
import { mockISignlessSubsidizedCallRelayer, mockTransactionQueue } from '../__helpers__/mocks';

function setupTestScenario<T extends TransactionRequestModel>({
  relayer,
  transactionQueue = mockTransactionQueue(),
  presenter = mock<ISignlessSubsidizedCallPresenter>(),
}: {
  relayer: ISignlessSubsidizedCallRelayer<T>;
  transactionQueue?: TransactionQueue<T>;
  presenter?: ISignlessSubsidizedCallPresenter;
}) {
  const useCase = new SignlessSubsidizedCall(relayer, transactionQueue, presenter);

  return { useCase, presenter, transactionQueue, relayer };
}

describe(`Given an instance of ${SignlessSubsidizedCall.name}<T>`, () => {
  describe(`when calling "${SignlessSubsidizedCall.prototype.execute.name}" method`, () => {
    it(`should:
        - use the ISignlessSubsidizedCallRelayer to generate a ${ProxyTransaction.name}
        - push the ${ProxyTransaction.name} into the ${TransactionQueue.name}
        - call the presenter with success()`, async () => {
      const request = mockTransactionRequestModel();
      const transaction = MockedProxyTransaction.fromRequest(request);
      const relayer = mockISignlessSubsidizedCallRelayer({
        request,
        transaction,
      });

      const { useCase, presenter, transactionQueue } = setupTestScenario({
        relayer: relayer,
      });

      await useCase.execute(request);

      expect(relayer.createProxyTransaction).toHaveBeenCalledWith(request);
      expect(transactionQueue.push).toHaveBeenCalledWith(transaction);
      expect(presenter.present).toHaveBeenCalledWith(success());
    });
  });
});
