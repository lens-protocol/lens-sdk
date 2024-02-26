/*
 * @jest-environment node
 */

import {
  InsufficientGasError,
  NativeTransaction,
  PendingSigningRequestError,
  UnsignedTransaction,
  UserRejectedError,
  WalletConnectionError,
  WalletConnectionErrorReason,
} from '@lens-protocol/domain/entities';
import { mockProtocolTransactionRequestModel, mockSignature } from '@lens-protocol/domain/mocks';
import { ChainType, failure, success } from '@lens-protocol/shared-kernel';
import { mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';
import { errorCodes } from 'eth-rpc-errors';
import { MockProvider } from 'ethereum-waffle';
import { Wallet, errors, providers, utils } from 'ethers';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import {
  mockITransactionFactory,
  mockTypedData,
} from '../../../transactions/adapters/__helpers__/mocks';
import { ConcreteWallet, ISignerFactory, UnsignedProtocolCall } from '../ConcreteWallet';
import {
  mockErrorWithCode,
  mockISignerFactory,
  mockUnsignedProtocolCall,
  mockUnsignedTransactionRequest,
} from '../__helpers__/mocks';

const address = mockEvmAddress();
const chainType = ChainType.POLYGON;

function setupWalletInstance({ signerFactory }: { signerFactory: ISignerFactory }) {
  const transactionFactory = mockITransactionFactory();
  return ConcreteWallet.create(address, signerFactory, transactionFactory);
}

describe(`Given an instance of ${ConcreteWallet.name}`, () => {
  describe(`when signing an ${UnsignedProtocolCall.name}`, () => {
    const typedData = mockTypedData();
    const request = mockProtocolTransactionRequestModel();
    const unsignedCall = mockUnsignedProtocolCall({ typedData, request });
    const signature = mockSignature();

    it(`should resolve with a ISignedProtocolCall instance`, async () => {
      const signer = mock<providers.JsonRpcSigner>();
      when(signer._signTypedData)
        .calledWith(typedData.domain, typedData.types, typedData.message)
        .mockResolvedValue(signature);

      const signerFactory = mockISignerFactory({
        address,
        chainType: ChainType.POLYGON,
        signerResult: success(signer),
      });

      const wallet = setupWalletInstance({ signerFactory });
      const result = await wallet.signProtocolCall(unsignedCall);

      expect(result.unwrap()).toEqual({
        id: unsignedCall.id,
        nonce: unsignedCall.nonce,
        request,
        signature,
      });
    });

    it(`should fail with ${PendingSigningRequestError.name} in case of existing signing request`, async () => {
      const signer = mock<providers.JsonRpcSigner>();
      when(signer._signTypedData)
        .calledWith(typedData.domain, typedData.types, typedData.message)
        .mockResolvedValue(signature);

      const signerFactory = mockISignerFactory({
        address,
        signerResult: success(signer),
      });

      const wallet = setupWalletInstance({ signerFactory });

      void wallet.signProtocolCall(unsignedCall); // previous signing request
      const result = await wallet.signProtocolCall(unsignedCall);

      expect(() => result.unwrap()).toThrow(PendingSigningRequestError);
    });

    it.each([errors.ACTION_REJECTED, errorCodes.provider.userRejectedRequest])(
      `should fail with ${UserRejectedError.name} in case the wallet throws error with %p code`,
      async (code) => {
        const signer = mock<providers.JsonRpcSigner>();
        when(signer._signTypedData).mockRejectedValue(mockErrorWithCode(code));

        const signerFactory = mockISignerFactory({
          address,
          signerResult: success(signer),
        });

        const wallet = setupWalletInstance({ signerFactory });
        const result = await wallet.signProtocolCall(unsignedCall);

        expect(() => result.unwrap()).toThrow(UserRejectedError);
      },
    );

    it(`should forward any ${WalletConnectionError.name}`, async () => {
      const error = new WalletConnectionError(WalletConnectionErrorReason.INCORRECT_CHAIN);
      const signerFactory = mockISignerFactory({
        address,
        signerResult: failure(error),
      });

      const wallet = setupWalletInstance({ signerFactory });
      const result = await wallet.signProtocolCall(unsignedCall);

      expect(() => result.unwrap()).toThrow(error);
    });
  });

  describe('when signing a message', () => {
    const message = 'Sign this message from backend';
    const signature = mockSignature();

    it(`should use the user's wallet to sign the message and return the signature`, async () => {
      const signer = mock<providers.JsonRpcSigner>();
      when(signer.signMessage).calledWith(message).mockResolvedValue(signature);

      const signerFactory = mockISignerFactory({
        address,
        signerResult: success(signer),
      });
      const wallet = setupWalletInstance({ signerFactory });

      const result = await wallet.signMessage(message);

      expect(signer.signMessage).toHaveBeenCalledWith(message);
      expect(result.unwrap()).toBe(signature);
    });

    it(`should fail with ${PendingSigningRequestError.name} in case of existing signing request`, async () => {
      const signer = mock<providers.JsonRpcSigner>();
      when(signer.signMessage).calledWith(message).mockResolvedValue(signature);

      const signerFactory = mockISignerFactory({
        address,
        signerResult: success(signer),
      });
      const wallet = setupWalletInstance({ signerFactory });

      void wallet.signMessage(message); // previous signing request
      const result = await wallet.signMessage(message);

      expect(() => result.unwrap()).toThrow(PendingSigningRequestError);
    });

    it.each([errors.ACTION_REJECTED, errorCodes.provider.userRejectedRequest])(
      `should fail with ${UserRejectedError.name} if the user cancels the challenge message signing`,
      async (code) => {
        const signer = mock<providers.JsonRpcSigner>();
        when(signer.signMessage).calledWith(message).mockRejectedValue(mockErrorWithCode(code));

        const signerFactory = mockISignerFactory({
          address,
          signerResult: success(signer),
        });
        const wallet = setupWalletInstance({ signerFactory });

        const result = await wallet.signMessage(message);

        expect(() => result.unwrap()).toThrow(UserRejectedError);
      },
    );
  });

  describe(`when sending a ${UnsignedTransaction.name}`, () => {
    it(`should:
        - use the user's wallet to sign and send the transaction
        - resolve with with a ${NativeTransaction.name}`, async () => {
      // setup
      const provider = new MockProvider();
      const [sender, receiver] = provider.getWallets() as [Wallet, Wallet];
      const txRequest = await sender.populateTransaction({
        from: sender.address,
        to: receiver.address,
        value: utils.parseEther('1'),
      });
      const signerFactory = mockISignerFactory({
        address,
        chainType,
        signerResult: success(provider.getSigner()),
      });
      const wallet = setupWalletInstance({ signerFactory });
      const receiverBalanceBefore = await receiver.getBalance();

      // execute
      const unsignedTransaction = mockUnsignedTransactionRequest({ chainType, txRequest });
      const result = await wallet.sendTransaction(unsignedTransaction);

      // verify
      const receiverBalanceAfter = await receiver.getBalance();
      expect(receiverBalanceAfter.gt(receiverBalanceBefore)).toBe(true);

      expect(result.unwrap()).toBeInstanceOf(NativeTransaction);
      expect(result.unwrap()).toEqual(
        expect.objectContaining({
          chainType,
          hash: expect.any(String),
          id: unsignedTransaction.id,
          request: unsignedTransaction.request,
        }),
      );
    }, 15_000);

    it(`should fail with ${PendingSigningRequestError.name} in case of existing signing request`, async () => {
      // setup
      const provider = new MockProvider();
      const [sender, receiver] = provider.getWallets() as [Wallet, Wallet];
      const txRequest = await sender.populateTransaction({
        from: sender.address,
        to: receiver.address,
        value: utils.parseEther('1'),
      });
      const signerFactory = mockISignerFactory({
        address,
        chainType,
        signerResult: success(provider.getSigner()),
      });
      const wallet = setupWalletInstance({ signerFactory });

      // execute
      const unsignedTransaction = mockUnsignedTransactionRequest({ chainType, txRequest });
      void wallet.sendTransaction(unsignedTransaction); // previous signing request
      const result = await wallet.sendTransaction(unsignedTransaction);

      // verify
      expect(() => result.unwrap()).toThrow(PendingSigningRequestError);
    });

    it(`should fail with ${InsufficientGasError.name} in case the wallet does not have enough Matic/Ether`, async () => {
      // setup
      const signer = mock<providers.JsonRpcSigner>();
      when(signer.sendTransaction).mockRejectedValue(mockErrorWithCode(errors.INSUFFICIENT_FUNDS));

      const signerFactory = mockISignerFactory({
        address,
        chainType,
        signerResult: success(signer),
      });
      const wallet = setupWalletInstance({ signerFactory });

      // execute
      const unsignedTransaction = mockUnsignedTransactionRequest({ chainType, txRequest: {} });
      const result = await wallet.sendTransaction(unsignedTransaction);

      // verify
      expect(() => result.unwrap()).toThrow(InsufficientGasError);
    });

    it.each([errors.ACTION_REJECTED, errorCodes.provider.userRejectedRequest])(
      `should fail with ${UserRejectedError.name} in case the user refuse the operation`,
      async (code) => {
        const signer = mock<providers.JsonRpcSigner>();

        when(signer.sendTransaction).mockRejectedValue(mockErrorWithCode(code));

        const signerFactory = mockISignerFactory({
          address,
          chainType,
          signerResult: success(signer),
        });
        const wallet = setupWalletInstance({ signerFactory });

        const unsignedTransaction = mockUnsignedTransactionRequest({
          chainType,
          txRequest: {},
        });
        const result = await wallet.sendTransaction(unsignedTransaction);

        expect(() => result.unwrap()).toThrow(UserRejectedError);
      },
    );

    it(`should fail with ${WalletConnectionError.name} in case the ISignerFactory fails with it`, async () => {
      const signerFactory = mockISignerFactory({
        address,
        chainType,
        signerResult: failure(
          new WalletConnectionError(WalletConnectionErrorReason.INCORRECT_CHAIN),
        ),
      });
      const wallet = setupWalletInstance({ signerFactory });

      const unsignedTransaction = mockUnsignedTransactionRequest({
        chainType,
        txRequest: {},
      });
      const result = await wallet.sendTransaction(unsignedTransaction);

      expect(() => result.unwrap()).toThrow(WalletConnectionError);
    });
  });
});
