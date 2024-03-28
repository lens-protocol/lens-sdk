import { CryptoNativeAsset, EvmAddress, PromiseResult } from '@lens-protocol/shared-kernel';

import { SignedFrameAction, UnsignedFrameAction } from './FrameAction';
import { Signature } from './Signature';
import {
  AnyTransactionRequestModel,
  ISignedProtocolCall,
  IUnsignedProtocolCall,
  NativeTransaction,
  ProtocolTransactionRequestModel,
  UnsignedTransaction,
} from './Transactions';

export class InsufficientGasError extends Error {
  name = 'InsufficientGasError' as const;

  constructor(readonly asset: CryptoNativeAsset) {
    super('Not enough gas to pay for the operation');
  }
}

export class PendingSigningRequestError extends Error {
  name = 'PendingSigningRequestError' as const;
  message = 'Clear or approve the pending wallet request and retry.';
}

export enum WalletConnectionErrorReason {
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
  message = 'User rejected the request';
}

export abstract class Wallet {
  constructor(readonly address: EvmAddress) {}

  abstract signProtocolCall<T extends ProtocolTransactionRequestModel>(
    unsignedCall: IUnsignedProtocolCall<T>,
  ): PromiseResult<
    ISignedProtocolCall<T>,
    PendingSigningRequestError | UserRejectedError | WalletConnectionError
  >;

  abstract signFrameAction<TData>(
    unsignedAction: UnsignedFrameAction<TData>,
  ): PromiseResult<
    SignedFrameAction<TData>,
    PendingSigningRequestError | UserRejectedError | WalletConnectionError
  >;

  abstract signMessage(
    message: string,
  ): PromiseResult<
    Signature,
    PendingSigningRequestError | UserRejectedError | WalletConnectionError
  >;

  abstract sendTransaction<T extends AnyTransactionRequestModel>(
    unsignedTransaction: UnsignedTransaction<T>,
  ): PromiseResult<
    NativeTransaction<T>,
    InsufficientGasError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
  >;
}
