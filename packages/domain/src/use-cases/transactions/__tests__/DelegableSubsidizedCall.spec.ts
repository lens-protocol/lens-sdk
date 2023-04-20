import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import {
  NativeTransaction,
  ProtocolCallRequestModel,
  TransactionRequestModel,
} from '../../../entities';
import { MockedNativeTransaction } from '../../../entities/__helpers__/mocks';
import { BroadcastingError } from '../BroadcastingError';
import {
  DelegableSubsidizedCall,
  IDelegatedCallGateway,
  IProtocolCallPresenter,
} from '../DelegableSubsidizedCall';
import { SubsidizedCall } from '../SubsidizedCall';
import { TransactionQueue } from '../TransactionQueue';
import {
  mockIDelegatedCallGateway,
  mockTransactionQueue,
  mockProtocolCallRequestModelWithDelegateFlag,
} from '../__helpers__/mocks';

function setupDelegableSubsidizedCall<T extends ProtocolCallRequestModel>({
  subsidizedCall = mock<SubsidizedCall<T>>(),
  protocolCallGateway = mock<IDelegatedCallGateway<T>>(),
  transactionQueue = mockTransactionQueue<T>(),
  presenter = mock<IProtocolCallPresenter>(),
}: {
  subsidizedCall?: SubsidizedCall<T>;
  protocolCallGateway?: IDelegatedCallGateway<T>;
  transactionQueue?: TransactionQueue<TransactionRequestModel>;
  presenter?: IProtocolCallPresenter;
}) {
  return new DelegableSubsidizedCall(
    subsidizedCall,
    protocolCallGateway,
    transactionQueue,
    presenter,
  );
}

describe(`Given an instance of the ${DelegableSubsidizedCall.name}<T> interactor`, () => {
  describe(`when calling the "${DelegableSubsidizedCall.prototype.execute.name}" method`, () => {
    describe('with a WithDelegateFlag<ProtocolCallRequestModel> that has the "delegate" flag unset', () => {
      const request = mockProtocolCallRequestModelWithDelegateFlag({ delegate: false });

      it(`should execute the ${SubsidizedCall.name}<T>`, async () => {
        const subsidizedCall = mock<SubsidizedCall<ProtocolCallRequestModel>>();
        const call = setupDelegableSubsidizedCall({
          subsidizedCall,
        });

        await call.execute(request);

        expect(subsidizedCall.execute).toHaveBeenCalledWith(request);
      });
    });

    describe('with a WithDelegateFlag<ProtocolCallRequestModel> that has the "delegate" flag set', () => {
      const request = mockProtocolCallRequestModelWithDelegateFlag({ delegate: true });

      it(`should:
          - create a ${NativeTransaction.name}<T>
          - queue it into the ${TransactionQueue.name}
          - present successful result`, async () => {
        const transaction = MockedNativeTransaction.fromRequest(request);
        const protocolCallGateway = mockIDelegatedCallGateway({
          request,
          result: success(transaction),
        });

        const transactionQueue = mockTransactionQueue<TransactionRequestModel>();

        const presenter = mock<IProtocolCallPresenter>();

        const call = setupDelegableSubsidizedCall({
          protocolCallGateway: protocolCallGateway,
          transactionQueue,
          presenter,
        });

        await call.execute(request);

        expect(protocolCallGateway.createDelegatedTransaction).toHaveBeenCalledWith(request);
        expect(transactionQueue.push).toHaveBeenCalledWith(transaction);
        expect(presenter.present).toHaveBeenCalledWith(success());
      });

      it(`should present any ${BroadcastingError.name} from the IDelegableProtocolCallGateway<T>`, async () => {
        const error = new BroadcastingError('some reason');
        const protocolCallGateway = mockIDelegatedCallGateway({
          request,
          result: failure(error),
        });

        const presenter = mock<IProtocolCallPresenter>();

        const call = setupDelegableSubsidizedCall({
          protocolCallGateway: protocolCallGateway,
          presenter,
        });

        await call.execute(request);

        expect(presenter.present).toHaveBeenCalledWith(failure(error));
      });
    });
  });
});
