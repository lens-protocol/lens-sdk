import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { NativeTransaction, TransactionRequestModel } from '../../../entities';
import { MockedNativeTransaction } from '../../../entities/__helpers__/mocks';
import { BroadcastingError } from '../BroadcastingError';
import {
  DelegableProtocolCallUseCase,
  IDelegableProtocolCallGateway,
  IProtocolCallPresenter,
} from '../DelegableProtocolCallUseCase';
import { SubsidizedCall } from '../SubsidizedCall';
import { TransactionQueue } from '../TransactionQueue';
import {
  mockIDelegableProtocolCallGateway,
  mockTransactionQueue,
  mockTransactionRequestModelWithDelegateFlag,
} from '../__helpers__/mocks';

function setupDelegableProtocolCallUseCase<T extends TransactionRequestModel>({
  subsidizedCall = mock<SubsidizedCall<T>>(),
  protocolCallGateway = mock<IDelegableProtocolCallGateway<T>>(),
  transactionQueue = mockTransactionQueue<T>(),
  presenter = mock<IProtocolCallPresenter>(),
}: {
  subsidizedCall?: SubsidizedCall<T>;
  protocolCallGateway?: IDelegableProtocolCallGateway<T>;
  transactionQueue?: TransactionQueue<TransactionRequestModel>;
  presenter?: IProtocolCallPresenter;
}) {
  return new DelegableProtocolCallUseCase(
    subsidizedCall,
    protocolCallGateway,
    transactionQueue,
    presenter,
  );
}

describe(`Given an instance of the ${DelegableProtocolCallUseCase.name}<T> interactor`, () => {
  describe(`when calling the "${DelegableProtocolCallUseCase.prototype.execute.name}" method`, () => {
    describe('with a WithDelegateFlag<TransactionRequestModel> that has the "delegate" flag unset', () => {
      const request = mockTransactionRequestModelWithDelegateFlag({ delegate: false });

      it(`should execute the ${SubsidizedCall.name}<T>`, async () => {
        const subsidizedCall = mock<SubsidizedCall<TransactionRequestModel>>();
        const useCase = setupDelegableProtocolCallUseCase({
          subsidizedCall,
        });

        await useCase.execute(request);

        expect(subsidizedCall.execute).toHaveBeenCalledWith(request);
      });
    });

    describe('with a WithDelegateFlag<TransactionRequestModel> that has the "delegate" flag set', () => {
      const request = mockTransactionRequestModelWithDelegateFlag({ delegate: true });

      it(`should:
          - create a ${NativeTransaction.name}<T>
          - queue it into the ${TransactionQueue.name}
          - present successful result`, async () => {
        const transaction = MockedNativeTransaction.fromRequest(request);
        const protocolCallGateway = mockIDelegableProtocolCallGateway({
          request,
          result: success(transaction),
        });

        const transactionQueue = mockTransactionQueue<TransactionRequestModel>();

        const presenter = mock<IProtocolCallPresenter>();

        const useCase = setupDelegableProtocolCallUseCase({
          protocolCallGateway: protocolCallGateway,
          transactionQueue,
          presenter,
        });

        await useCase.execute(request);

        expect(protocolCallGateway.createDelegatedTransaction).toHaveBeenCalledWith(request);
        expect(transactionQueue.push).toHaveBeenCalledWith(transaction);
        expect(presenter.present).toHaveBeenCalledWith(success());
      });

      it(`should present any ${BroadcastingError.name} from the IDelegableProtocolCallGateway<T>`, async () => {
        const error = new BroadcastingError('some reason');
        const protocolCallGateway = mockIDelegableProtocolCallGateway({
          request,
          result: failure(error),
        });

        const presenter = mock<IProtocolCallPresenter>();

        const useCase = setupDelegableProtocolCallUseCase({
          protocolCallGateway: protocolCallGateway,
          presenter,
        });

        await useCase.execute(request);

        expect(presenter.present).toHaveBeenCalledWith(failure(error));
      });
    });
  });
});
