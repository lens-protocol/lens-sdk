import { CryptoNativeAsset, EthereumAddress, PromiseResult } from '@lens-protocol/shared-kernel';

import {
  SignedProtocolCall,
  TransactionRequestModel,
  IUnsignedProtocolCall,
  UnsignedTransaction,
  NativeTransaction,
  Signature,
} from './Transactions';

export class InsufficientGasError extends Error {
  name = 'InsufficientGasError' as const;

  constructor(readonly asset: CryptoNativeAsset) {
    super('Not enough gas to pay for the operation');
  }
}

export class PendingSigningRequestError extends Error {
  name = 'PendingSigningRequestError' as const;
}

export enum WalletConnectionErrorReason {
  CONNECTION_REFUSED = 'CONNECTION_REFUSED',
  INCORRECT_CHAIN = 'INCORRECT_CHAIN',
  /**
   * The connected account is not the one we expect
   */
  WRONG_ACCOUNT = 'WRONG_ACCOUNT',
  /**
   * A previous connection request that was not yet cancelled or approved
   */
  STALE_CONNECTION_REQUEST = 'STALE_CONNECTION_REQUEST',
}

export class WalletConnectionError extends Error {
  name = 'WalletConnectionError' as const;

  constructor(readonly reason: WalletConnectionErrorReason) {
    super(`Wallet connection failed due to ${reason} error`);
  }
}

export class UserRejectedError extends Error {
  name = 'UserRejectedError' as const;
}

export enum WalletType {
  INJECTED = 'injected',
  WALLET_CONNECT = 'wallet-connect',
}

export abstract class Wallet {
  constructor(readonly address: EthereumAddress, readonly type: WalletType) {}

  abstract signProtocolCall<T extends TransactionRequestModel>(
    unsignedCall: IUnsignedProtocolCall<T>,
  ): PromiseResult<
    SignedProtocolCall<T>,
    PendingSigningRequestError | UserRejectedError | WalletConnectionError
  >;

  abstract signMessage(
    message: string,
  ): PromiseResult<
    Signature,
    PendingSigningRequestError | UserRejectedError | WalletConnectionError
  >;

  abstract sendTransaction<T extends TransactionRequestModel>(
    unsignedTransaction: UnsignedTransaction<T>,
  ): PromiseResult<
    NativeTransaction<T>,
    InsufficientGasError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
  >;
}
