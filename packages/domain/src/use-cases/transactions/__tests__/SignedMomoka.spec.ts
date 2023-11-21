import { success } from '@lens-protocol/shared-kernel';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import {
  AnyTransactionRequestModel,
  DataTransaction,
  ProtocolTransactionRequestModel,
  Wallet,
} from '../../../entities';
import {
  mockActiveWallet,
  MockedDataTransaction,
  mockIMomokaRelayer,
  mockISignedProtocolCall,
  mockIUnsignedProtocolCall,
  mockISignedMomokaGateway,
  mockTransactionQueue,
  mockWallet,
  mockProtocolTransactionRequestModelWithOffChainFlag,
} from '../../../mocks';
import {
  IMomokaRelayer,
  ISignedMomokaPresenter,
  ISignedMomokaGateway,
  SubsidizeOffChain,
} from '../SignedMomoka';
import { TransactionQueue } from '../TransactionQueue';

function setup<T extends ProtocolTransactionRequestModel>({
  gateway,
  relayer = mock<IMomokaRelayer<T>>(),
  queue = mockTransactionQueue(),
  presenter,
  wallet,
}: {
  gateway: ISignedMomokaGateway<T>;
  relayer?: IMomokaRelayer<T>;
  queue?: TransactionQueue<AnyTransactionRequestModel>;
  presenter: ISignedMomokaPresenter<T>;
  wallet: Wallet;
}) {
  const activeWallet = mockActiveWallet({ wallet });
  return new SubsidizeOffChain(activeWallet, gateway, relayer, queue, presenter);
}

describe(`Given an instance of the ${SubsidizeOffChain.name}<T> interactor`, () => {
  describe(`when calling the "${SubsidizeOffChain.prototype.execute.name}" method`, () => {
    const request = mockProtocolTransactionRequestModelWithOffChainFlag();
    const unsignedCall = mockIUnsignedProtocolCall(request);

    it(`should:
        - create an IUnsignedProtocolCall<T>
        - sign it with the user's ${Wallet.name}
        - relay the resulting ISignedProtocolCall<T>
        - push the resulting ${DataTransaction.name}<T> into the ${TransactionQueue.name}`, async () => {
      const gateway = mockISignedMomokaGateway({
        request,
        unsignedCall,
      });

      const wallet = mockWallet();
      const signedCall = mockISignedProtocolCall(unsignedCall);
      when(wallet.signProtocolCall).calledWith(unsignedCall).mockResolvedValue(success(signedCall));

      const transaction = MockedDataTransaction.fromSignedCall(signedCall);
      const relayer = mockIMomokaRelayer({
        signedCall,
        result: success(transaction),
      });

      const queue = mockTransactionQueue();

      const presenter = mock<ISignedMomokaPresenter<typeof request>>();

      const useCase = setup({
        gateway,
        relayer,
        queue,
        presenter,
        wallet,
      });

      await useCase.execute(request);

      expect(queue.push).toHaveBeenCalledWith(transaction, presenter);
    });
  });
});
