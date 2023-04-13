import { TypedDataSigner } from '@ethersproject/abstract-signer';
import { TransactionRequest } from '@ethersproject/providers';
import {
  InsufficientGasError,
  Wallet,
  WalletConnectionError,
  UserRejectedError,
  PendingSigningRequestError,
  TransactionRequestModel,
  ISignedProtocolCall,
  IUnsignedProtocolCall,
  UnsignedTransaction,
  NativeTransaction,
} from '@lens-protocol/domain/entities';
import {
  RequestFallback,
  SupportedTransactionRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import {
  ChainType,
  EthereumAddress,
  failure,
  matic,
  PromiseResult,
  success,
} from '@lens-protocol/shared-kernel';
import { errors, Signer } from 'ethers';
import { z } from 'zod';

import { ITransactionFactory } from '../../transactions/adapters/ITransactionFactory';
import { TypedData } from '../../transactions/adapters/TypedData';
import { assertErrorObjectWithCode } from './errors';

export type RequiredSigner = Signer & TypedDataSigner;

export type CreateSignerConfig = {
  address: EthereumAddress;
  chainType?: ChainType;
};

export interface ISignerFactory {
  createSigner(config: CreateSignerConfig): PromiseResult<RequiredSigner, WalletConnectionError>;
}

export const WalletDataSchema = z.object({
  address: z.string(),
});

export type WalletDataSchema = z.infer<typeof WalletDataSchema>;

export class UnsignedProtocolCall<T extends TransactionRequestModel>
  implements IUnsignedProtocolCall<T>
{
  private constructor(
    readonly id: string,
    readonly request: T,
    readonly typedData: TypedData,
    readonly fallback: RequestFallback,
  ) {}

  get nonce() {
    return this.typedData.value.nonce;
  }

  static create<T extends TransactionRequestModel>({
    id,
    request,
    typedData,
    fallback,
  }: {
    id: string;
    request: T;
    typedData: TypedData;
    fallback: RequestFallback;
  }): UnsignedProtocolCall<T> {
    return new UnsignedProtocolCall(id, request, typedData, fallback);
  }
}

export class SignedProtocolCall<T extends TransactionRequestModel>
  implements ISignedProtocolCall<T>
{
  private constructor(
    readonly id: string,
    readonly request: T,
    readonly signature: string,
    readonly nonce: number,
    readonly fallback: RequestFallback,
  ) {}

  static create<T extends TransactionRequestModel>({
    unsignedCall,
    signature,
  }: {
    unsignedCall: UnsignedProtocolCall<T>;
    signature: string;
  }): SignedProtocolCall<T> {
    return new SignedProtocolCall(
      unsignedCall.id,
      unsignedCall.request,
      signature,
      unsignedCall.nonce,
      unsignedCall.fallback,
    );
  }
}

export interface ITransactionRequest {
  get transactionRequest(): TransactionRequest;
}

export class ConcreteWallet extends Wallet {
  private signingInProgress = false;

  private constructor(
    data: WalletDataSchema,
    private readonly signerFactory: ISignerFactory,
    private readonly transactionFactory: ITransactionFactory<TransactionRequestModel>,
  ) {
    super(data.address);
  }

  async signProtocolCall<T extends TransactionRequestModel>(
    unsignedCall: UnsignedProtocolCall<T>,
  ): PromiseResult<
    ISignedProtocolCall<T>,
    PendingSigningRequestError | UserRejectedError | WalletConnectionError
  > {
    const result = await this.signerFactory.createSigner({
      address: this.address,
    });

    if (result.isFailure()) {
      return failure(result.error);
    }

    if (this.signingInProgress) {
      return failure(new PendingSigningRequestError());
    }
    this.signingInProgress = true;

    const signer = result.value;
    try {
      const signature = await signer._signTypedData(
        unsignedCall.typedData.domain,
        unsignedCall.typedData.types,
        unsignedCall.typedData.value,
      );

      const signedCall = SignedProtocolCall.create({ unsignedCall, signature });
      return success(signedCall);
    } catch (err) {
      assertErrorObjectWithCode<errors>(err);

      if (err.code === errors.ACTION_REJECTED) {
        return failure(new UserRejectedError());
      }

      throw err;
    } finally {
      this.signingInProgress = false;
    }
  }

  async signMessage(
    message: string,
  ): PromiseResult<string, PendingSigningRequestError | WalletConnectionError | UserRejectedError> {
    const result = await this.signerFactory.createSigner({
      address: this.address,
    });

    if (result.isFailure()) {
      return failure(result.error);
    }

    if (this.signingInProgress) {
      return failure(new PendingSigningRequestError());
    }
    this.signingInProgress = true;

    const signer = result.value;
    try {
      return success(await signer.signMessage(message));
    } catch (err) {
      assertErrorObjectWithCode<errors>(err);

      if (err.code === errors.ACTION_REJECTED) {
        return failure(new UserRejectedError());
      }
      throw err;
    } finally {
      this.signingInProgress = false;
    }
  }

  async sendTransaction<T extends TransactionRequestModel>(
    unsignedTransaction: UnsignedTransaction<T> & ITransactionRequest,
  ): PromiseResult<
    NativeTransaction<T>,
    InsufficientGasError | PendingSigningRequestError | UserRejectedError | WalletConnectionError
  > {
    const result = await this.signerFactory.createSigner({
      address: this.address,
      chainType: unsignedTransaction.chainType,
    });

    if (result.isFailure()) {
      return failure(result.error);
    }

    if (this.signingInProgress) {
      return failure(new PendingSigningRequestError());
    }
    this.signingInProgress = true;

    const signer = result.value;
    try {
      const response = await signer.sendTransaction(unsignedTransaction.transactionRequest);

      const transaction = this.transactionFactory.createNativeTransaction({
        chainType: unsignedTransaction.chainType,
        id: unsignedTransaction.id,
        request: unsignedTransaction.request,
        txHash: response.hash,
      });

      return success(transaction);
    } catch (err) {
      assertErrorObjectWithCode<errors>(err);

      switch (err.code) {
        case errors.ACTION_REJECTED:
          return failure(new UserRejectedError(err.message));
        case errors.INSUFFICIENT_FUNDS:
          return failure(new InsufficientGasError(matic()));
      }

      throw err;
    } finally {
      this.signingInProgress = false;
    }
  }

  toWalletData(): WalletDataSchema {
    return {
      address: this.address,
    };
  }

  static create(
    data: WalletDataSchema,
    signerFactory: ISignerFactory,
    transactionFactory: ITransactionFactory<SupportedTransactionRequest>,
  ) {
    return new ConcreteWallet(data, signerFactory, transactionFactory);
  }
}
