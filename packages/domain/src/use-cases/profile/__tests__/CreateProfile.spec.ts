import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { NativeTransaction } from '../../../entities';
import { MockedNativeTransaction } from '../../../entities/__helpers__/mocks';
import { BroadcastingError } from '../../transactions';
import { TransactionQueue } from '../../transactions/TransactionQueue';
import {
  mockAnyBroadcastingError,
  mockTransactionQueue,
} from '../../transactions/__helpers__/mocks';
import {
  CreateProfile,
  CreateProfileRequest,
  DuplicatedHandleError,
  ICreateProfilePresenter,
  IProfileTransactionGateway,
} from '../CreateProfile';
import { mockCreateProfileRequest, mockIProfileTransactionGateway } from '../__helpers__/mocks';

function setupCreateProfile({
  presenter,
  transactionFactory,
  transactionQueue = mockTransactionQueue<CreateProfileRequest>(),
}: {
  presenter: ICreateProfilePresenter;
  transactionFactory: IProfileTransactionGateway;
  transactionQueue?: TransactionQueue<CreateProfileRequest>;
}) {
  return new CreateProfile(transactionFactory, transactionQueue, presenter);
}

describe(`Given an instance of the ${CreateProfile.name} interactor`, () => {
  describe(`when calling the "${CreateProfile.prototype.execute.name}" method`, () => {
    const request = mockCreateProfileRequest();
    const transaction = MockedNativeTransaction.fromRequest(request);

    it(`should:
        - create a ${NativeTransaction.name}<CreateProfileRequest>
        - queue the resulting ${NativeTransaction.name} into the ${TransactionQueue.name}`, async () => {
      const presenter = mock<ICreateProfilePresenter>();
      const transactionFactory = mockIProfileTransactionGateway({
        request,
        result: success(transaction),
      });
      const transactionQueue = mockTransactionQueue<CreateProfileRequest>();

      const createProfile = setupCreateProfile({
        transactionFactory,
        presenter,
        transactionQueue,
      });

      await createProfile.execute(request);

      expect(transactionQueue.push).toHaveBeenCalledWith(transaction, presenter);
    });

    it.each([
      {
        ErrorCtor: DuplicatedHandleError,
        error: new DuplicatedHandleError('bob'),
      },
      {
        ErrorCtor: BroadcastingError,
        error: mockAnyBroadcastingError(),
      },
    ])(`should present any $ErrorCtor might occur`, async ({ error }) => {
      const transactionFactory = mockIProfileTransactionGateway({
        request,
        result: failure(error),
      });
      const presenter = mock<ICreateProfilePresenter>();

      const createProfile = setupCreateProfile({
        transactionFactory,
        presenter,
      });

      await createProfile.execute(request);

      expect(presenter.present).toHaveBeenCalledWith(failure(error));
    });
  });
});
