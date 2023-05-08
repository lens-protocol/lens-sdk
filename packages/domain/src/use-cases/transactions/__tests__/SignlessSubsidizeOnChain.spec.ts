import { success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { ProtocolTransactionRequestModel, ProxyTransaction } from '../../../entities';
import {
  MockedProxyTransaction,
  mockProtocolTransactionRequestModel,
} from '../../../entities/__helpers__/mocks';
import {
  ISignlessSubsidizeOnChainPresenter,
  ISignlessSubsidizedCallRelayer,
  SignlessSubsidizeOnChain,
} from '../SignlessSubsidizeOnChain';
import { TransactionQueue } from '../TransactionQueue';
import { mockISignlessSubsidizedCallRelayer, mockTransactionQueue } from '../__helpers__/mocks';

function setupTestScenario<T extends ProtocolTransactionRequestModel>({
  relayer,
  transactionQueue = mockTransactionQueue(),
  presenter = mock<ISignlessSubsidizeOnChainPresenter>(),
}: {
  relayer: ISignlessSubsidizedCallRelayer<T>;
  transactionQueue?: TransactionQueue<T>;
  presenter?: ISignlessSubsidizeOnChainPresenter;
}) {
  const useCase = new SignlessSubsidizeOnChain(relayer, transactionQueue, presenter);

  return { useCase, presenter, transactionQueue, relayer };
}

describe(`Given an instance of ${SignlessSubsidizeOnChain.name}<T> interactor`, () => {
  describe(`when calling "${SignlessSubsidizeOnChain.prototype.execute.name}" method`, () => {
    it(`should:
        - use the ISignlessSubsidizedCallRelayer to generate a ${ProxyTransaction.name}
        - push the ${ProxyTransaction.name} into the ${TransactionQueue.name}
        - call the presenter with success()`, async () => {
      const request = mockProtocolTransactionRequestModel();
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
