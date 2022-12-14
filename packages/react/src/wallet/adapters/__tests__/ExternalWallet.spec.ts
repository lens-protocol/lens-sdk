/*
 * @jest-environment node
 */

/* eslint-disable @typescript-eslint/unbound-method */
import {
  NativeTransaction,
  SignedProtocolCall,
  UnsignedTransaction,
  InsufficientGasError,
  WalletConnectionError,
  WalletConnectionErrorReason,
  WalletType,
  UserRejectedError,
  PendingSigningRequestError,
} from '@lens-protocol/domain/entities';
import { mockSignature, mockTransactionRequestModel } from '@lens-protocol/domain/mocks';
import { ChainType, failure, success } from '@lens-protocol/shared-kernel';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';
import { MockProvider } from 'ethereum-waffle';
import { errors, providers, utils, Wallet } from 'ethers';
import { mock } from 'jest-mock-extended';
import { when } from 'jest-when';

import {
  mockITransactionFactory,
  mockTypedData,
} from '../../../transactions/adapters/__helpers__/mocks';
import { ExternalWallet, UnsignedLensProtocolCall } from '../ExternalWallet';
import { ISignerFactory } from '../ISignerFactory';
import {
  mockErrorWithCode,
  mockISignerFactory,
  mockUnsignedLensProtocolCall,
  mockUnsignedTransactionRequest,
} from '../__helpers__/mocks';
import { ProviderErrorCode } from '../errors';

const chainType = ChainType.POLYGON;
const walletType = WalletType.INJECTED;

function setupExternalWallet({ signerFactory }: { signerFactory: ISignerFactory }) {
  const transactionFactory = mockITransactionFactory();
  return ExternalWallet.create(
    {
      address: mockEthereumAddress(),
      type: walletType,
    },
    signerFactory,
    transactionFactory,
  );
}

describe(`Given an instance of ${ExternalWallet.name}`, () => {
  describe(`when signing an ${UnsignedLensProtocolCall.name}`, () => {
    const typedData = mockTypedData();
    const request = mockTransactionRequestModel();
    const unsignedCall = mockUnsignedLensProtocolCall({ typedData, request });
    const signature = mockSignature();

    it(`should resolve with a ${SignedProtocolCall.name} instance`, async () => {
      const signer = mock<providers.JsonRpcSigner>();
      when(signer._signTypedData)
        .calledWith(typedData.domain, typedData.types, typedData.value)
        .mockResolvedValue(signature);

      const signerFactory = mockISignerFactory({
        chainType,
        walletType,
        signerResult: success(signer),
      });

      const wallet = setupExternalWallet({ signerFactory });
      const result = await wallet.signProtocolCall(unsignedCall);

      expect(result.unwrap()).toBeInstanceOf(SignedProtocolCall);
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
        .calledWith(typedData.domain, typedData.types, typedData.value)
        .mockResolvedValue(signature);

      const signerFactory = mockISignerFactory({
        chainType,
        walletType,
        signerResult: success(signer),
      });

      const wallet = setupExternalWallet({ signerFactory });

      void wallet.signProtocolCall(unsignedCall);
      const result = await wallet.signProtocolCall(unsignedCall);

      expect(() => result.unwrap()).toThrow(PendingSigningRequestError);
    });

    it(`should fail with ${UserRejectedError.name} in case the user refuse the operation`, async () => {
      const signer = mock<providers.JsonRpcSigner>();
      when(signer._signTypedData).mockRejectedValue(
        mockErrorWithCode(ProviderErrorCode.userRejectedRequest),
      );

      const signerFactory = mockISignerFactory({
        chainType,
        walletType,
        signerResult: success(signer),
      });

      const wallet = setupExternalWallet({ signerFactory });
      const result = await wallet.signProtocolCall(unsignedCall);

      expect(() => result.unwrap()).toThrow(UserRejectedError);
    });

    it(`should forward any ${WalletConnectionError.name}`, async () => {
      const error = new WalletConnectionError(WalletConnectionErrorReason.INCORRECT_CHAIN);
      const signerFactory = mockISignerFactory({
        chainType,
        walletType,
        signerResult: failure(error),
      });

      const wallet = setupExternalWallet({ signerFactory });
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
        walletType,
        signerResult: success(signer),
      });
      const wallet = setupExternalWallet({ signerFactory });

      const result = await wallet.signMessage(message);

      expect(signer.signMessage).toHaveBeenCalledWith(message);
      expect(result.unwrap()).toBe(signature);
    });

    it(`should fail with ${PendingSigningRequestError.name} in case of existing signing request`, async () => {
      const signer = mock<providers.JsonRpcSigner>();
      when(signer.signMessage).calledWith(message).mockResolvedValue(signature);

      const signerFactory = mockISignerFactory({
        walletType,
        signerResult: success(signer),
      });
      const wallet = setupExternalWallet({ signerFactory });

      void wallet.signMessage(message);
      const result = await wallet.signMessage(message);

      expect(() => result.unwrap()).toThrow(PendingSigningRequestError);
    });

    it(`should fail with ${UserRejectedError.name} if the user cancels the challenge message signing`, async () => {
      const signer = mock<providers.JsonRpcSigner>();
      when(signer.signMessage)
        .calledWith(message)
        .mockRejectedValue(mockErrorWithCode(ProviderErrorCode.userRejectedRequest));

      const signerFactory = mockISignerFactory({
        walletType,
        signerResult: success(signer),
      });
      const wallet = setupExternalWallet({ signerFactory });

      const result = await wallet.signMessage(message);

      expect(() => result.unwrap()).toThrow(UserRejectedError);
    });
  });

  describe(`when sending a ${UnsignedTransaction.name}`, () => {
    it(`should:
        - use the user's wallet to sign and send the transaction
        - resolve with with a ${NativeTransaction.name}`, async () => {
      const provider = new MockProvider();
      const [sender, receiver] = provider.getWallets() as [Wallet, Wallet];
      const txRequest = await sender.populateTransaction({
        from: sender.address,
        to: receiver.address,
        value: utils.parseEther('1'),
      });
      const signerFactory = mockISignerFactory({
        chainType,
        walletType,
        signerResult: success(provider.getSigner()),
      });
      const wallet = setupExternalWallet({ signerFactory });
      const receiverBalanceBefore = await receiver.getBalance();

      const unsignedTransaction = mockUnsignedTransactionRequest({ chainType, txRequest });
      const result = await wallet.sendTransaction(unsignedTransaction);

      const receiverBalanceAfter = await receiver.getBalance();
      expect(receiverBalanceAfter.gt(receiverBalanceBefore)).toBe(true);

      expect(result.unwrap()).toBeInstanceOf(NativeTransaction);
      expect(result.unwrap()).toEqual(
        expect.objectContaining({
          chainType,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          hash: expect.any(String),
          id: unsignedTransaction.id,
          request: unsignedTransaction.request,
        }),
      );
    }, 15_000);

    it(`should fail with ${PendingSigningRequestError.name} in case of existing signing request`, async () => {
      const provider = new MockProvider();
      const [sender, receiver] = provider.getWallets() as [Wallet, Wallet];
      const txRequest = await sender.populateTransaction({
        from: sender.address,
        to: receiver.address,
        value: utils.parseEther('1'),
      });
      const signerFactory = mockISignerFactory({
        chainType,
        walletType,
        signerResult: success(provider.getSigner()),
      });
      const wallet = setupExternalWallet({ signerFactory });

      const unsignedTransaction = mockUnsignedTransactionRequest({ chainType, txRequest });
      void wallet.sendTransaction(unsignedTransaction);
      const result = await wallet.sendTransaction(unsignedTransaction);

      expect(() => result.unwrap()).toThrow(PendingSigningRequestError);
    });

    it(`should fail with ${InsufficientGasError.name} in case the wallet does not have enough Matic/Ether`, async () => {
      const signer = mock<providers.JsonRpcSigner>();
      when(signer.sendTransaction).mockRejectedValue(mockErrorWithCode(errors.INSUFFICIENT_FUNDS));

      const signerFactory = mockISignerFactory({
        chainType,
        walletType,
        signerResult: success(signer),
      });
      const wallet = setupExternalWallet({ signerFactory });

      const unsignedTransaction = mockUnsignedTransactionRequest({ chainType, txRequest: {} });
      const result = await wallet.sendTransaction(unsignedTransaction);

      expect(() => result.unwrap()).toThrow(InsufficientGasError);
    });

    it(`should fail with ${UserRejectedError.name} in case the user refuse the operation`, async () => {
      const signer = mock<providers.JsonRpcSigner>();

      when(signer.sendTransaction).mockRejectedValue(
        mockErrorWithCode(ProviderErrorCode.userRejectedRequest),
      );

      const signerFactory = mockISignerFactory({
        chainType,
        walletType,
        signerResult: success(signer),
      });
      const wallet = setupExternalWallet({ signerFactory });

      const unsignedTransaction = mockUnsignedTransactionRequest({
        chainType,
        txRequest: {},
      });
      const result = await wallet.sendTransaction(unsignedTransaction);

      expect(() => result.unwrap()).toThrow(UserRejectedError);
    });

    it(`should fail with ${WalletConnectionError.name} in case the IsignerFactory fails with it`, async () => {
      const signerFactory = mockISignerFactory({
        chainType,
        walletType,
        signerResult: failure(
          new WalletConnectionError(WalletConnectionErrorReason.INCORRECT_CHAIN),
        ),
      });
      const wallet = setupExternalWallet({ signerFactory });

      const unsignedTransaction = mockUnsignedTransactionRequest({
        chainType,
        txRequest: {},
      });
      const result = await wallet.sendTransaction(unsignedTransaction);

      expect(() => result.unwrap()).toThrow(WalletConnectionError);
    });
  });
});
