import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import {
  NativeTransaction,
  ProtocolTransactionRequestModel,
  AnyTransactionRequestModel,
} from '../../../entities';
import { MockedNativeTransaction } from '../../../entities/__helpers__/mocks';
import { BroadcastingError } from '../BroadcastingError';
import {
  DelegableSigning,
  IDelegatedTransactionGateway,
  IDelegatedTransactionPresenter,
  ISignedOperation,
} from '../DelegableSigning';
import { TransactionQueue } from '../TransactionQueue';
import {
  mockIDelegatedTransactionGateway,
  mockTransactionQueue,
  mockProtocolTransactionRequestModelWithDelegateFlag,
} from '../__helpers__/mocks';

function setupDelegableSigning<T extends ProtocolTransactionRequestModel>({
  signedOperation = mock<ISignedOperation<T>>(),
  transactionGateway = mock<IDelegatedTransactionGateway<T>>(),
  transactionQueue = mockTransactionQueue<T>(),
  presenter = mock<IDelegatedTransactionPresenter>(),
}: {
  signedOperation?: ISignedOperation<T>;
  transactionGateway?: IDelegatedTransactionGateway<T>;
  transactionQueue?: TransactionQueue<AnyTransactionRequestModel>;
  presenter?: IDelegatedTransactionPresenter;
}) {
  return new DelegableSigning(signedOperation, transactionGateway, transactionQueue, presenter);
}

describe(`Given an instance of the ${DelegableSigning.name}<T> interactor`, () => {
  describe(`when calling the "${DelegableSigning.prototype.execute.name}" method`, () => {
    describe('with a WithDelegateFlag<ProtocolTransactionRequestModel> that has the "delegate" flag unset', () => {
      const request = mockProtocolTransactionRequestModelWithDelegateFlag({ delegate: false });

      it(`should execute the ISignedOperation<T>`, async () => {
        const signedOperation = mock<ISignedOperation<ProtocolTransactionRequestModel>>();
        const call = setupDelegableSigning({
          signedOperation,
        });

        await call.execute(request);

        expect(signedOperation.execute).toHaveBeenCalledWith(request);
      });
    });

    describe('with a WithDelegateFlag<ProtocolTransactionRequestModel> that has the "delegate" flag set', () => {
      const request = mockProtocolTransactionRequestModelWithDelegateFlag({ delegate: true });

      it(`should:
          - create a ${NativeTransaction.name}<T>
          - queue it into the ${TransactionQueue.name}
          - present successful result`, async () => {
        const transaction = MockedNativeTransaction.fromRequest(request);
        const transactionGateway = mockIDelegatedTransactionGateway({
          request,
          result: success(transaction),
        });

        const transactionQueue = mockTransactionQueue<AnyTransactionRequestModel>();

        const presenter = mock<IDelegatedTransactionPresenter>();

        const call = setupDelegableSigning({
          transactionGateway,
          transactionQueue,
          presenter,
        });

        await call.execute(request);

        expect(transactionGateway.createDelegatedTransaction).toHaveBeenCalledWith(request);
        expect(transactionQueue.push).toHaveBeenCalledWith(transaction);
        expect(presenter.present).toHaveBeenCalledWith(success());
      });

      it(`should present any ${BroadcastingError.name} from the IDelegableProtocolCallGateway<T>`, async () => {
        const error = new BroadcastingError('some reason');
        const transactionGateway = mockIDelegatedTransactionGateway({
          request,
          result: failure(error),
        });

        const presenter = mock<IDelegatedTransactionPresenter>();

        const call = setupDelegableSigning({
          transactionGateway,
          presenter,
        });

        await call.execute(request);

        expect(presenter.present).toHaveBeenCalledWith(failure(error));
      });
    });
  });
});
