import { TypedDataSigner } from '@ethersproject/abstract-signer';
import { TransactionRequest } from '@ethersproject/providers';
import { TypedData } from '@lens-protocol/blockchain-bindings';
import {
  InsufficientGasError,
  Wallet,
  WalletConnectionError,
  UserRejectedError,
  PendingSigningRequestError,
  ISignedProtocolCall,
  IUnsignedProtocolCall,
  UnsignedTransaction,
  NativeTransaction,
  ProtocolTransactionRequestModel,
  AnyTransactionRequestModel,
  Signature,
  ISignedVote,
  PollId,
} from '@lens-protocol/domain/entities';
import { AnyTransactionRequest } from '@lens-protocol/domain/use-cases/transactions';
import {
  ChainType,
  EthereumAddress,
  failure,
  invariant,
  matic,
  PromiseResult,
  success,
} from '@lens-protocol/shared-kernel';
import { errors, Signer } from 'ethers';
import { getAddress } from 'ethers/lib/utils';
import { z } from 'zod';

import { UnsignedVote } from '../../polls/adapters/SnapshotVoteFactory';
import { ISnapshotVote } from '../../polls/adapters/SnapshotVoteRelayer';
import { ITransactionFactory } from '../../transactions/adapters/ITransactionFactory';
import { SelfFundedProtocolTransactionRequest } from '../../transactions/adapters/SelfFundedProtocolTransactionRequest';
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

export class UnsignedProtocolCall<T extends ProtocolTransactionRequestModel>
  implements IUnsignedProtocolCall<T>
{
  private constructor(
    readonly id: string,
    readonly request: T,
    readonly typedData: TypedData,
    readonly fallback: SelfFundedProtocolTransactionRequest<T>,
  ) {}

  get nonce() {
    invariant(typeof this.typedData.message.nonce === 'number', 'Nonce is not defined');
    return this.typedData.message.nonce;
  }

  static create<T extends ProtocolTransactionRequestModel>({
    id,
    request,
    typedData,
    fallback,
  }: {
    id: string;
    request: T;
    typedData: TypedData;
    fallback: SelfFundedProtocolTransactionRequest<T>;
  }): UnsignedProtocolCall<T> {
    return new UnsignedProtocolCall(id, request, typedData, fallback);
  }
}

export class SignedProtocolCall<T extends ProtocolTransactionRequestModel>
  implements ISignedProtocolCall<T>
{
  private constructor(
    readonly id: string,
    readonly request: T,
    readonly signature: Signature,
    readonly nonce: number,
    readonly fallback: SelfFundedProtocolTransactionRequest<T>,
  ) {}

  static create<T extends ProtocolTransactionRequestModel>({
    unsignedCall,
    signature,
  }: {
    unsignedCall: UnsignedProtocolCall<T>;
    signature: string;
  }): SignedProtocolCall<T> {
    return new SignedProtocolCall(
      unsignedCall.id,
      unsignedCall.request,
      signature as Signature,
      unsignedCall.nonce,
      unsignedCall.fallback,
    );
  }
}

export class SignedVote implements ISnapshotVote {
  constructor(
    readonly pollId: PollId,
    readonly signature: Signature,
    readonly data: TypedData,
    readonly voter: EthereumAddress,
  ) {}
}

export interface ITransactionRequest {
  get transactionRequest(): TransactionRequest;
}

export class ConcreteWallet extends Wallet {
  private signingInProgress = false;

  private constructor(
    data: WalletDataSchema,
    private readonly signerFactory: ISignerFactory,
    private readonly transactionFactory: ITransactionFactory<AnyTransactionRequestModel>,
  ) {
    super(data.address);
  }

  async signProtocolCall<T extends ProtocolTransactionRequestModel>(
    unsignedCall: UnsignedProtocolCall<T>,
  ): PromiseResult<
    ISignedProtocolCall<T>,
    PendingSigningRequestError | UserRejectedError | WalletConnectionError
  > {
    const result = await this.signerFactory.createSigner({
      address: this.address,
      chainType: ChainType.POLYGON,
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
        unsignedCall.typedData.message,
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
  ): PromiseResult<
    Signature,
    PendingSigningRequestError | WalletConnectionError | UserRejectedError
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
      const signature = await signer.signMessage(message);
      return success(signature as Signature);
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

  async sendTransaction<T extends AnyTransactionRequestModel>(
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

  async signVote(
    unsignedVote: UnsignedVote,
  ): PromiseResult<
    ISignedVote,
    WalletConnectionError | PendingSigningRequestError | UserRejectedError
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
        unsignedVote.typedData.domain,
        unsignedVote.typedData.types,
        unsignedVote.typedData.message,
      );

      const signedVote = new SignedVote(
        unsignedVote.pollId,
        signature as Signature,
        unsignedVote.typedData,
        getAddress(this.address),
      );
      return success(signedVote);
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

  toWalletData(): WalletDataSchema {
    return {
      address: this.address,
    };
  }

  static create(
    data: WalletDataSchema,
    signerFactory: ISignerFactory,
    transactionFactory: ITransactionFactory<AnyTransactionRequest>,
  ) {
    return new ConcreteWallet(data, signerFactory, transactionFactory);
  }
}
