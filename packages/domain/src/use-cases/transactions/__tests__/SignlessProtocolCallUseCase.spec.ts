import { success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { ProxyTransaction, TransactionRequestModel } from '../../../entities';
import {
  MockedProxyTransaction,
  mockTransactionRequestModel,
} from '../../../entities/__helpers__/mocks';
import {
  ISignlessProtocolCallPresenter,
  ISignlessProtocolCallRelayer,
  SignlessProtocolCallUseCase,
} from '../SignlessProtocolCallUseCase';
import { TransactionQueue } from '../TransactionQueue';
import { mockISignlessProtocolCallRelayer, mockTransactionQueue } from '../__helpers__/mocks';

function setup<T extends TransactionRequestModel>({
  relayer,
  transactionQueue = mockTransactionQueue(),
  presenter = mock<ISignlessProtocolCallPresenter>(),
}: {
  relayer: ISignlessProtocolCallRelayer<T>;
  transactionQueue?: TransactionQueue<T>;
  presenter?: ISignlessProtocolCallPresenter;
}) {
  const useCase = new SignlessProtocolCallUseCase(relayer, transactionQueue, presenter);

  return { useCase, presenter, transactionQueue, relayer };
}

describe(`Given an instance of ${SignlessProtocolCallUseCase.name}<T>`, () => {
  describe(`when calling "${SignlessProtocolCallUseCase.prototype.execute.name}" method`, () => {
    it(`should:
        - use the ISignlessProtocolCallRelayer to generate a ${ProxyTransaction.name}
        - push the ${ProxyTransaction.name} into the ${TransactionQueue.name}
        - call the presenter with success()`, async () => {
      const request = mockTransactionRequestModel();
      const transaction = MockedProxyTransaction.fromRequest(request);
      const signlessProtocolCallRelayer = mockISignlessProtocolCallRelayer({
        request,
        transaction,
      });

      const { useCase, presenter, transactionQueue } = setup({
        relayer: signlessProtocolCallRelayer,
      });

      await useCase.execute(request);

      expect(signlessProtocolCallRelayer.relaySignlessProtocolCall).toHaveBeenCalledWith(request);
      expect(transactionQueue.push).toHaveBeenCalledWith(transaction);
      expect(presenter.present).toHaveBeenCalledWith(success());
    });
  });
});
