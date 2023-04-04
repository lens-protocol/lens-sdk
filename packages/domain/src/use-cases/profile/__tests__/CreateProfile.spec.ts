import { failure, success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';

import { NativeTransaction } from '../../../entities';
import { MockedNativeTransaction } from '../../../entities/__helpers__/mocks';
import { RelayError, RelayErrorReason } from '../../transactions';
import { TransactionQueue } from '../../transactions/TransactionQueue';
import { mockTransactionQueue } from '../../transactions/__helpers__/mocks';
import {
  CreateProfile,
  CreateProfileRequest,
  DuplicatedHandleError,
  ICreateProfilePresenter,
  IProfileTransactionGateway,
} from '../CreateProfile';
import { mockCreateProfileRequest, mockIProfileTransactionGateway } from '../__helpers__/mocks';

function setupCreateProfile({
  gateway,
  presenter,
  transactionQueue = mockTransactionQueue<CreateProfileRequest>(),
}: {
  gateway: IProfileTransactionGateway;
  presenter: ICreateProfilePresenter;
  transactionQueue?: TransactionQueue<CreateProfileRequest>;
}) {
  return new CreateProfile(gateway, presenter, transactionQueue);
}

describe(`Given an instance of the ${CreateProfile.name} interactor`, () => {
  describe(`when calling the "${CreateProfile.prototype.create.name}" method`, () => {
    const request = mockCreateProfileRequest();
    const transaction = MockedNativeTransaction.fromRequest(request);

    it(`should:
        - create a ${NativeTransaction.name}<CreateProfileRequest>
        - queue the resulting ${NativeTransaction.name} into the ${TransactionQueue.name}
        - present successful result`, async () => {
      const presenter = mock<ICreateProfilePresenter>();
      const gateway = mockIProfileTransactionGateway({
        request,
        result: success(transaction),
      });
      const transactionQueue = mockTransactionQueue<CreateProfileRequest>();

      const createProfile = setupCreateProfile({
        gateway,
        presenter,
        transactionQueue,
      });

      await createProfile.create(request);

      expect(transactionQueue.push).toHaveBeenCalledWith(transaction);
      expect(presenter.present).toHaveBeenCalledWith(success());
    });

    it.each([
      {
        ErrorCtor: DuplicatedHandleError,
        error: new DuplicatedHandleError('bob'),
      },
      {
        ErrorCtor: RelayError,
        error: new RelayError(RelayErrorReason.REJECTED),
      },
    ])(`should present any $ErrorCtor might occur`, async ({ error }) => {
      const gateway = mockIProfileTransactionGateway({
        request,
        result: failure(error),
      });
      const presenter = mock<ICreateProfilePresenter>();

      const createProfile = setupCreateProfile({
        gateway,
        presenter,
      });

      await createProfile.create(request);

      expect(presenter.present).toHaveBeenCalledWith(failure(error));
    });
  });
});
