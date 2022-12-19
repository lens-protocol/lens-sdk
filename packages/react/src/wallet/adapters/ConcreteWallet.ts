import { TypedDataSigner } from '@ethersproject/abstract-signer';
import { TransactionRequest } from '@ethersproject/providers';
import {
  InsufficientGasError,
  Wallet,
  WalletConnectionError,
  WalletType,
  UserRejectedError,
  PendingSigningRequestError,
  TransactionRequestModel,
  SignedProtocolCall,
  IUnsignedProtocolCall,
  UnsignedTransaction,
  NativeTransaction,
} from '@lens-protocol/domain/entities';
import { SupportedTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import {
  ChainType,
  EthereumAddress,
  failure,
  matic,
  PromiseResult,
  success,
} from '@lens-protocol/shared-kernel';
import { errors, providers, Signer } from 'ethers';
import { z } from 'zod';

import { ITransactionFactory } from '../../transactions/adapters/ITransactionFactory';
import { TypedData } from '../../transactions/adapters/TypedData';
import { assertErrorObjectWithCode } from './errors';

export type RequiredSigner = Omit<Signer, 'provider'> &
  TypedDataSigner & {
    provider: providers.JsonRpcProvider;
  };

export type CreateSignerConfig = {
  address: EthereumAddress;
  chainType?: ChainType;
};

export interface ISignerFactory {
  createSigner(config: CreateSignerConfig): PromiseResult<RequiredSigner, WalletConnectionError>;
}

export const WalletDataSchema = z.object({
  address: z.string(),
  type: z.nativeEnum(WalletType),
});

export type WalletDataSchema = z.infer<typeof WalletDataSchema>;

export class UnsignedLensProtocolCall<T extends TransactionRequestModel>
  implements IUnsignedProtocolCall<T>
{
  constructor(readonly id: string, readonly request: T, readonly typedData: TypedData) {}

  get nonce() {
    return this.typedData.value.nonce;
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
    super(data.address, data.type);
  }

  async signProtocolCall<T extends TransactionRequestModel>(
    unsignedCall: UnsignedLensProtocolCall<T>,
  ): PromiseResult<
    SignedProtocolCall<T>,
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

      const signedCall = SignedProtocolCall.create({
        id: unsignedCall.id,
        request: unsignedCall.request,
        signature,
        nonce: unsignedCall.nonce,
      });
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
      type: this.type,
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
