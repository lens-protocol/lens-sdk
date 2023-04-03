import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { NativeTransaction, TransactionRequestModel } from '../../../entities';
import { MockedNativeTransaction } from '../../../entities/__helpers__/mocks';
import {
  DelegableProtocolCallUseCase,
  IDelegableProtocolCallGateway,
  IProtocolCallPresenter,
} from '../DelegableProtocolCallUseCase';
import { ProtocolCallUseCase } from '../ProtocolCallUseCase';
import { RelayError, RelayErrorReason } from '../RelayError';
import { TransactionQueue } from '../TransactionQueue';
import {
  mockIDelegableProtocolCallGateway,
  mockTransactionQueue,
  mockTransactionRequestModelWithDelegateFlag,
} from '../__helpers__/mocks';

function setupDelegableProtocolCallUseCase<T extends TransactionRequestModel>({
  protocolCallUseCase = mock<ProtocolCallUseCase<T>>(),
  protocolCallGateway = mock<IDelegableProtocolCallGateway<T>>(),
  transactionQueue = mockTransactionQueue<T>(),
  presenter = mock<IProtocolCallPresenter>(),
}: {
  protocolCallUseCase?: ProtocolCallUseCase<T>;
  protocolCallGateway?: IDelegableProtocolCallGateway<T>;
  transactionQueue?: TransactionQueue<TransactionRequestModel>;
  presenter?: IProtocolCallPresenter;
}) {
  return new DelegableProtocolCallUseCase(
    protocolCallUseCase,
    protocolCallGateway,
    transactionQueue,
    presenter,
  );
}

describe(`Given an instance of the ${DelegableProtocolCallUseCase.name}<T> interactor`, () => {
  describe(`when calling the "${DelegableProtocolCallUseCase.prototype.execute.name}" method`, () => {
    describe('with a WithDelegateFlag<TransactionRequestModel> that has the "delegate" flag unset', () => {
      const request = mockTransactionRequestModelWithDelegateFlag({ delegate: false });

      it(`should execute the ${ProtocolCallUseCase.name}<T>`, async () => {
        const protocolCallUseCase = mock<ProtocolCallUseCase<TransactionRequestModel>>();
        const useCase = setupDelegableProtocolCallUseCase({
          protocolCallUseCase,
        });

        await useCase.execute(request);

        expect(protocolCallUseCase.execute).toHaveBeenCalledWith(request);
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

      it(`should present any ${RelayError.name} from the IDelegableProtocolCallGateway<T>`, async () => {
        const error = new RelayError(RelayErrorReason.REJECTED);
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
