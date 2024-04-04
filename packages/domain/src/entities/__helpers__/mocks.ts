import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';
import {
  ChainType,
  EvmAddress,
  failure,
  PromiseResult,
  success,
} from '@lens-protocol/shared-kernel';
import { mock32BytesHexString, mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';
import { mock } from 'jest-mock-extended';

import { AppId } from '../AppId';
import { Credentials } from '../Credentials';
import { Profile, ProfileId } from '../Profile';
import { PublicationId } from '../Publication';
import { Signature } from '../Signature';
import {
  AnyTransactionRequestModel,
  DataTransaction,
  ISignedProtocolCall,
  IUnsignedProtocolCall,
  MetaTransaction,
  NativeTransaction,
  Nonce,
  ProtocolTransactionRequestModel,
  TransactionError,
  TransactionErrorReason,
  TransactionEvent,
  TransactionKind,
  UnsignedTransaction,
} from '../Transactions';
import { Wallet } from '../Wallet';

export function mockProfileId(): ProfileId {
  return faker.datatype.hexadecimal({ length: 2 }) as ProfileId;
}

export function mockPublicationId(profileId: ProfileId = mockProfileId()): PublicationId {
  return `${profileId}-${faker.datatype.hexadecimal({ length: 2 })}` as PublicationId;
}

export function mockMomokaPublicationId(): PublicationId {
  return `${mockProfileId()}-${faker.datatype.hexadecimal({
    length: 2,
  })}-DA-${faker.datatype.hexadecimal({ length: 2 })}` as PublicationId;
}

export function mockWallet({ address = mockEvmAddress() }: { address?: EvmAddress } = {}) {
  return mock<Wallet>({ address });
}

export function mockCredentials(overrides?: Partial<Credentials>) {
  return mock<Credentials>({
    address: mockEvmAddress(),
    profileId: mockProfileId(),
    ...overrides,
  });
}

export function mockSignature(): Signature {
  return mock32BytesHexString() as Signature;
}

export function mockAnyTransactionRequestModel(
  overrides?: Partial<AnyTransactionRequestModel>,
): AnyTransactionRequestModel {
  return {
    kind: TransactionKind.CREATE_POST,
    ...overrides,
  };
}

export function mockProtocolTransactionRequestModel(
  overrides?: Partial<ProtocolTransactionRequestModel>,
): ProtocolTransactionRequestModel {
  return {
    kind: TransactionKind.CREATE_POST,
    ...overrides,
  };
}

class MockedUnsignedProtocolCall<T extends ProtocolTransactionRequestModel>
  implements IUnsignedProtocolCall<T>
{
  constructor(readonly id: string, readonly request: T, readonly nonce: Nonce = mockNonce()) {}

  async update(data: { nonce: Nonce }): Promise<IUnsignedProtocolCall<T>> {
    return new MockedUnsignedProtocolCall(this.id, this.request, data.nonce);
  }
}

export function mockIUnsignedProtocolCall<T extends ProtocolTransactionRequestModel>(
  request: T,
  overrides?: { nonce: Nonce },
): IUnsignedProtocolCall<T> {
  return new MockedUnsignedProtocolCall(faker.datatype.uuid(), request, overrides?.nonce);
}

class MockedSignedProtocolCall<T extends ProtocolTransactionRequestModel>
  implements ISignedProtocolCall<T>
{
  constructor(
    readonly id: string,
    readonly signature: Signature,
    readonly request: T,
    readonly nonce: Nonce,
  ) {}
}

export function mockISignedProtocolCall<T extends ProtocolTransactionRequestModel>(
  unsignedCall: IUnsignedProtocolCall<T> = mockIUnsignedProtocolCall<T>(
    mockAnyTransactionRequestModel() as T,
  ),
): ISignedProtocolCall<T> {
  return new MockedSignedProtocolCall(
    unsignedCall.id,
    mockSignature(),
    unsignedCall.request,
    unsignedCall.nonce,
  );
}

export function mockUnsignedTransaction<T extends AnyTransactionRequestModel>(
  request: T = mockAnyTransactionRequestModel() as T,
): UnsignedTransaction<T> {
  return new UnsignedTransaction(faker.datatype.uuid(), ChainType.POLYGON, request);
}

export function mockTransactionHash() {
  return mock32BytesHexString();
}

export function mockNonce(): Nonce {
  return faker.datatype.number();
}

type MockedMetaTransactionInit<T extends AnyTransactionRequestModel> = {
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

export class MockedMetaTransaction<
  T extends ProtocolTransactionRequestModel,
> extends MetaTransaction<T> {
  readonly chainType: ChainType;
  readonly id: string;
  readonly request: T;
  readonly nonce: Nonce;
  hash: string;

  private constructor(
    {
      chainType = ChainType.POLYGON,
      id = faker.datatype.uuid(),
      hash = mockTransactionHash(),
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

  static fromSignedCall<T extends ProtocolTransactionRequestModel>(
    signedCall: ISignedProtocolCall<T>,
  ): MetaTransaction<T> {
    return new MockedMetaTransaction({
      chainType: ChainType.POLYGON,
      hash: mockTransactionHash(),
      id: signedCall.id,
      request: signedCall.request,
    });
  }

  static fromRawData<T extends ProtocolTransactionRequestModel>(
    data: MockedMetaTransactionInit<T>,
    instructions?: MockedTransactionInstructions,
  ): MetaTransaction<T> {
    return new MockedMetaTransaction(data, instructions);
  }
}

type MockedNativeTransactionInit<T extends AnyTransactionRequestModel> = {
  chainType?: ChainType;
  hash?: string;
  id?: string;
  request: T;
};

export class MockedNativeTransaction<
  T extends AnyTransactionRequestModel,
> extends NativeTransaction<T> {
  waitNextEvent: () => PromiseResult<TransactionEvent, TransactionError> =
    jest.fn<() => PromiseResult<TransactionEvent, TransactionError>>();
  readonly chainType: ChainType;
  readonly id: string;
  readonly request: T;
  hash: string;

  private constructor({
    chainType = ChainType.POLYGON,
    hash = mockTransactionHash(),
    id = faker.datatype.uuid(),
    request,
  }: MockedNativeTransactionInit<T>) {
    super();

    this.chainType = chainType;
    this.id = id;
    this.request = request;
    this.hash = hash;
  }

  static fromUnsignedTransaction<T extends AnyTransactionRequestModel>(
    unsignedTransaction: UnsignedTransaction<T>,
  ): NativeTransaction<T> {
    return new MockedNativeTransaction({
      chainType: ChainType.POLYGON,
      id: unsignedTransaction.id,
      request: unsignedTransaction.request,
    });
  }

  static fromRequest<T extends AnyTransactionRequestModel>(request: T) {
    return new MockedNativeTransaction({ request, hash: mockTransactionHash() });
  }
}

export function mockProfile() {
  return Profile.create({
    id: mockProfileId(),
    handle: faker.internet.userName(),
  });
}

export function mockTransactionError() {
  return new TransactionError(TransactionErrorReason.MINING_TIMEOUT);
}

type MockedDataTransactionInit<T extends ProtocolTransactionRequestModel> = {
  request: T;
  id?: string;
};

export class MockedDataTransaction<
  T extends ProtocolTransactionRequestModel,
> extends DataTransaction<T> {
  readonly id: string;
  readonly request: T;

  private constructor({ id = faker.datatype.uuid(), request }: MockedDataTransactionInit<T>) {
    super();
    this.id = id;
    this.request = request;
  }

  async waitNextEvent(): PromiseResult<TransactionEvent, TransactionError> {
    return success(TransactionEvent.SETTLED);
  }

  static fromSignedCall<T extends ProtocolTransactionRequestModel>(
    signedCall: ISignedProtocolCall<T>,
  ): MockedDataTransaction<T> {
    return new MockedDataTransaction({
      id: signedCall.id,
      request: signedCall.request,
    });
  }
}

export function mockAppId(): AppId {
  return faker.commerce.productName() as AppId;
}
