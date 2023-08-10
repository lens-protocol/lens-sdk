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
  presenter = mock<ISignlessSubsidizeOnChainPresenter<T>>(),
}: {
  relayer: ISignlessSubsidizedCallRelayer<T>;
  transactionQueue?: TransactionQueue<T>;
  presenter?: ISignlessSubsidizeOnChainPresenter<T>;
}) {
  const useCase = new SignlessSubsidizeOnChain(relayer, transactionQueue, presenter);

  return { useCase, presenter, transactionQueue, relayer };
}

describe(`Given an instance of ${SignlessSubsidizeOnChain.name}<T> interactor`, () => {
  describe(`when calling "${SignlessSubsidizeOnChain.prototype.execute.name}" method`, () => {
    it(`should:
        - use the ISignlessSubsidizedCallRelayer to generate a ${ProxyTransaction.name}
        - push the ${ProxyTransaction.name} into the ${TransactionQueue.name}`, async () => {
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
      expect(transactionQueue.push).toHaveBeenCalledWith(transaction, presenter);
    });
  });
});
