import { TransactionRequest } from '@ethersproject/providers';
import { SupportedTransactionRequest } from '@lens-protocol/domain/dist/esm/use-cases/transactions';
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
import { ChainType, failure, matic, PromiseResult, success } from '@lens-protocol/shared-kernel';
import { errors, TypedDataDomain, TypedDataField } from 'ethers';
import { z } from 'zod';

import { ITransactionFactory } from '../../transactions/adapters/ITransactionFactory';
import { ISignerFactory } from './ISignerFactory';
import { assertErrorObjectWithCode, ProviderErrorCode, ProviderErrors } from './errors';

export const WalletDataSchema = z.object({
  address: z.string(),
  type: z.nativeEnum(WalletType),
});

export type WalletDataSchema = z.infer<typeof WalletDataSchema>;

export type TypedData = {
  domain: TypedDataDomain;
  types: Record<string, Array<TypedDataField>>;
  value: {
    nonce: number;
    [k: string]: unknown;
  };
};

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

export class ExternalWallet extends Wallet {
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
      walletType: this.type,
      chainType: ChainType.POLYGON,
      walletAddress: this.address,
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
      assertErrorObjectWithCode<ProviderErrors>(err);

      if (err.code === ProviderErrorCode.userRejectedRequest) {
        return failure(new UserRejectedError(err.message));
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
      walletType: this.type,
      walletAddress: this.address,
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
      assertErrorObjectWithCode<ProviderErrors>(err);
      if (err.code === ProviderErrorCode.userRejectedRequest) {
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
      walletType: this.type,
      chainType: unsignedTransaction.chainType,
      walletAddress: this.address,
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
      assertErrorObjectWithCode<ProviderErrors | errors>(err);

      switch (err.code) {
        case ProviderErrorCode.userRejectedRequest:
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
    return new ExternalWallet(data, signerFactory, transactionFactory);
  }
}
