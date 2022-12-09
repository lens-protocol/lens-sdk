import { jest } from '@jest/globals';
import {
  ChainType,
  EthereumAddress,
  failure,
  PromiseResult,
  success,
} from '@lens-protocol/shared-kernel';
import { mock32BytesHexString, mockEthereumAddress } from '@lens-protocol/shared-kernel';
import { faker } from '@faker-js/faker';
import { mock } from 'jest-mock-extended';

import { ICredentials } from '../Credentials';
import { NftOwnershipChallenge } from '../Nft';
import { Profile } from '../Profile';
import {
  Challenge,
  IUnsignedProtocolCall,
  MetaTransaction,
  NativeTransaction,
  Nonce,
  ProxyActionStatus,
  ProxyTransaction,
  Signature,
  SignedProtocolCall,
  Transaction,
  TransactionError,
  TransactionErrorReason,
  TransactionEvent,
  TransactionKind,
  TransactionRequestModel,
  UnsignedTransaction,
} from '../Transactions';
import { Wallet, WalletType } from '../Wallet';

export function mockWallet({
  address = mockEthereumAddress(),
  type = WalletType.INJECTED,
}: { address?: EthereumAddress; type?: WalletType } = {}) {
  return mock<Wallet>({ address, type });
}

export function mockCredentials(overrides?: Partial<ICredentials>) {
  return mock<ICredentials>({
    address: mockEthereumAddress(),
    ...overrides,
  });
}

export function mockChallenge(): Challenge {
  return mock32BytesHexString();
}

export function mockSignature(): Signature {
  return mock32BytesHexString();
}

export function mockTransactionRequestModel(
  overrides?: Partial<TransactionRequestModel>,
): TransactionRequestModel {
  return {
    kind: TransactionKind.CREATE_POST,
    ...overrides,
  };
}

class MockedUnsignedProtocolCall<T extends TransactionRequestModel>
  implements IUnsignedProtocolCall<T>
{
  constructor(readonly id: string, readonly request: T, readonly nonce: Nonce = mockNonce()) {}

  async update(data: { nonce: Nonce }): Promise<IUnsignedProtocolCall<T>> {
    return new MockedUnsignedProtocolCall(this.id, this.request, data.nonce);
  }
}

export function mockUnsignedProtocolCall<T extends TransactionRequestModel>(
  request: T,
  overrides?: { nonce: Nonce },
): IUnsignedProtocolCall<T> {
  return new MockedUnsignedProtocolCall(faker.datatype.uuid(), request, overrides?.nonce);
}

export function mockSignedProtocolCall<T extends TransactionRequestModel>(
  unsignedCallOrRequest: IUnsignedProtocolCall<T> | T = mockUnsignedProtocolCall<T>(
    mockTransactionRequestModel() as T,
  ),
  overrides?: { nonce: Nonce },
): SignedProtocolCall<T> {
  if ('request' in unsignedCallOrRequest) {
    return SignedProtocolCall.create({
      id: unsignedCallOrRequest.id,
      signature: mockSignature(),
      request: unsignedCallOrRequest.request,
      nonce: overrides?.nonce ?? unsignedCallOrRequest.nonce,
    });
  }
  return SignedProtocolCall.create({
    id: faker.datatype.uuid(),
    signature: mockSignature(),
    request: unsignedCallOrRequest,
    nonce: overrides?.nonce ?? mockNonce(),
  });
}

export function mockUnsignedTransaction<T extends TransactionRequestModel>(
  request: T = mockTransactionRequestModel() as T,
): UnsignedTransaction<T> {
  return new UnsignedTransaction(faker.datatype.uuid(), ChainType.POLYGON, request);
}

export function mockTransactionHash() {
  return mock32BytesHexString();
}

export function mockNonce(): Nonce {
  return faker.datatype.number();
}

type MockedMetaTransactionInit<T extends TransactionRequestModel> = {
  chainType?: ChainType;
  hash?: string;
  id?: string;
  nonce?: Nonce;
  request: T;
};

type MockedTransactionUpdate =
  | {
      event: TransactionEvent;
      txHash?: string;
    }
  | {
      error: TransactionError;
    };

type MockedTransactionInstructions = {
  withUpdatesSequence: Array<MockedTransactionUpdate>;
  failsWith?: TransactionError;
};

export class MockedMetaTransaction<T extends TransactionRequestModel> extends MetaTransaction<T> {
  readonly chainType: ChainType;
  readonly id: string;
  readonly request: T;
  readonly nonce: Nonce;
  hash: string | undefined;

  private constructor(
    {
      chainType = ChainType.POLYGON,
      id = faker.datatype.uuid(),
      hash,
      request,
      nonce = mockNonce(),
    }: MockedMetaTransactionInit<T>,
    private instructions: MockedTransactionInstructions = { withUpdatesSequence: [] },
  ) {
    super();

    this.chainType = chainType;
    this.id = id;
    this.request = request;
    this.nonce = nonce;
    this.hash = hash;
  }

  async waitNextEvent(): PromiseResult<TransactionEvent, TransactionError> {
    const item = this.instructions.withUpdatesSequence.shift();
    if (!item) {
      return success(TransactionEvent.SETTLED);
    }

    if ('error' in item) {
      return failure(item.error);
    }
    this.hash = item.txHash ?? this.hash;
    return success(item.event);
  }

  static fromSignedCall<T extends TransactionRequestModel>(
    signedCall: SignedProtocolCall<T>,
  ): MetaTransaction<T> {
    return new MockedMetaTransaction({
      chainType: ChainType.POLYGON,
      hash: mockTransactionHash(),
      id: signedCall.id,
      request: signedCall.request,
    });
  }

  static fromRawData<T extends TransactionRequestModel>(
    data: MockedMetaTransactionInit<T>,
    instructions?: MockedTransactionInstructions,
  ): MetaTransaction<T> {
    return new MockedMetaTransaction(data, instructions);
  }
}

type MockedNativeTransactionInit<T extends TransactionRequestModel> = {
  chainType?: ChainType;
  hash?: string;
  id?: string;
  indexingId?: string;
  request: T;
};

export class MockedNativeTransaction<
  T extends TransactionRequestModel,
> extends NativeTransaction<T> {
  waitNextEvent: () => PromiseResult<TransactionEvent, TransactionError> =
    jest.fn<() => PromiseResult<TransactionEvent, TransactionError>>();
  readonly chainType: ChainType;
  readonly id: string;
  readonly request: T;
  hash: string | undefined;

  private constructor({
    chainType = ChainType.POLYGON,
    hash,
    id = faker.datatype.uuid(),
    request,
  }: MockedNativeTransactionInit<T>) {
    super();

    this.chainType = chainType;
    this.id = id;
    this.request = request;
    this.hash = hash;
  }

  static fromUnsignedTransaction<T extends TransactionRequestModel>(
    unsignedTransaction: UnsignedTransaction<T>,
  ): Transaction<T> {
    return new MockedNativeTransaction({
      chainType: ChainType.POLYGON,
      hash: mockTransactionHash(),
      id: unsignedTransaction.id,
      request: unsignedTransaction.request,
    });
  }

  static fromRequest<T extends TransactionRequestModel>(request: T) {
    return new MockedNativeTransaction({ request });
  }
}

export function mockProfile() {
  return Profile.create({
    id: faker.datatype.uuid(),
    handle: faker.internet.userName(),
  });
}

export function mockTransactionError(txHash: string = mockTransactionHash()) {
  return new TransactionError(TransactionErrorReason.MINING_TIMEOUT, txHash);
}

export function mockNftOwnershipChallenge(): NftOwnershipChallenge {
  return {
    id: faker.datatype.uuid(),
    message: mockChallenge(),
  };
}

type MockedProxyTransactionInit<T extends TransactionRequestModel> = {
  request: T;
  chainType?: ChainType;
  hash?: string;
  id?: string;
  status: ProxyActionStatus;
};

export class MockedProxyTransaction<T extends TransactionRequestModel> extends ProxyTransaction<T> {
  readonly chainType: ChainType;
  readonly id: string;
  readonly request: T;
  hash: string | undefined;
  status: ProxyActionStatus;

  private constructor(
    {
      chainType = ChainType.POLYGON,
      id = faker.datatype.uuid(),
      hash,
      request,
      status,
    }: MockedProxyTransactionInit<T>,
    private instructions: MockedTransactionInstructions = { withUpdatesSequence: [] },
  ) {
    super();

    this.chainType = chainType;
    this.id = id;
    this.request = request;
    this.hash = hash;
    this.status = status;
  }

  async waitNextEvent(): PromiseResult<TransactionEvent, TransactionError> {
    const item = this.instructions.withUpdatesSequence.shift();
    if (!item) {
      return success(TransactionEvent.SETTLED);
    }

    if ('error' in item) {
      return failure(item.error);
    }
    this.hash = item.txHash ?? this.hash;
    return success(item.event);
  }

  static fromRequest<T extends TransactionRequestModel>(request: T): ProxyTransaction<T> {
    return new MockedProxyTransaction({ request, status: ProxyActionStatus.MINTING });
  }
}
