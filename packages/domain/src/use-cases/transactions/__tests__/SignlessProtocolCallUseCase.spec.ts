import { success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { TransactionRequestModel } from '../../../entities';
import { MockedProxyTransaction } from '../../../entities/__helpers__/mocks';
import { mockUnconstrainedFollowRequest } from '../../profile/__helpers__/mocks';
import { mockFreeCollectRequest } from '../../publications/__helpers__/mocks';
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
  describe(`when calling ${SignlessProtocolCallUseCase.prototype.execute.name}()`, () => {
    describe(`with a valid UnconstrainedFollowRequest`, () => {
      it(`should:
          - relay the request to generate a proxy transaction
          - push the proxy transaction to the transaction queue
          - call the presenter with success()`, async () => {
        const request = mockUnconstrainedFollowRequest();
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

    describe(`with a valid FreeCollectRequest`, () => {
      it(`should:
          - relay the request to generate a proxy transaction
          - push the proxy transaction to the transaction queue
          - call the presenter with success()`, async () => {
        const request = mockFreeCollectRequest();
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
});
