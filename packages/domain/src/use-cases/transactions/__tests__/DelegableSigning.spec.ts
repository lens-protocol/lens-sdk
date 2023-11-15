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
  DelegableProtocolTransactionRequestModel,
  DelegableSigning,
  IDelegatedTransactionGateway,
  IDelegatedTransactionPresenter,
  ISignedOperation,
} from '../DelegableSigning';
import { TransactionQueue } from '../TransactionQueue';
import {
  mockIDelegatedTransactionGateway,
  mockTransactionQueue,
  mockDelegableProtocolTransactionRequestModel,
  mockAnyBroadcastingError,
} from '../__helpers__/mocks';

function setupDelegableSigning<T extends DelegableProtocolTransactionRequestModel>({
  signedOperation = mock<ISignedOperation<T>>(),
  transactionGateway = mock<IDelegatedTransactionGateway<T>>(),
  transactionQueue = mockTransactionQueue<AnyTransactionRequestModel>(),
  presenter = mock<IDelegatedTransactionPresenter<T>>(),
}: {
  signedOperation?: ISignedOperation<T>;
  transactionGateway?: IDelegatedTransactionGateway<T>;
  transactionQueue?: TransactionQueue<AnyTransactionRequestModel>;
  presenter?: IDelegatedTransactionPresenter<T>;
}) {
  return new DelegableSigning(signedOperation, transactionGateway, transactionQueue, presenter);
}

describe(`Given an instance of the ${DelegableSigning.name}<T> interactor`, () => {
  describe(`when calling the "${DelegableSigning.prototype.execute.name}" method`, () => {
    describe('with a request that has the "signless" flag unset', () => {
      const request = mockDelegableProtocolTransactionRequestModel({ signless: false });

      it(`should execute the ISignedOperation<T>`, async () => {
        const signedOperation = mock<ISignedOperation<ProtocolTransactionRequestModel>>();
        const call = setupDelegableSigning({
          signedOperation,
        });

        await call.execute(request);

        expect(signedOperation.execute).toHaveBeenCalledWith(request);
      });
    });

    describe('with a request that has the "signless" flag set', () => {
      const request = mockDelegableProtocolTransactionRequestModel({ signless: true });

      it(`should:
          - create a ${NativeTransaction.name}<T>
          - queue it into the ${TransactionQueue.name}`, async () => {
        const transaction = MockedNativeTransaction.fromRequest(request);
        const transactionGateway = mockIDelegatedTransactionGateway({
          request,
          result: success(transaction),
        });

        const transactionQueue = mockTransactionQueue<AnyTransactionRequestModel>();

        const presenter = mock<IDelegatedTransactionPresenter<typeof request>>();

        const call = setupDelegableSigning({
          transactionGateway,
          transactionQueue,
          presenter,
        });

        await call.execute(request);

        expect(transactionGateway.createDelegatedTransaction).toHaveBeenCalledWith(request);
        expect(transactionQueue.push).toHaveBeenCalledWith(transaction, presenter);
      });

      it(`should present any ${BroadcastingError.name} from the IDelegableProtocolCallGateway<T>`, async () => {
        const error = mockAnyBroadcastingError();
        const transactionGateway = mockIDelegatedTransactionGateway({
          request,
          result: failure(error),
        });

        const presenter = mock<IDelegatedTransactionPresenter<typeof request>>();

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
