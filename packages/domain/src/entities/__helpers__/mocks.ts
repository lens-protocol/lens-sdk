import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';
import {
  ChainType,
  EvmAddress,
  failure,
  PromiseResult,
  success,
} from '@lens-protocol/shared-kernel';
import {
  mock32BytesHexString,
  mockDaiAmount,
  mockEvmAddress,
} from '@lens-protocol/shared-kernel/mocks';
import { mock } from 'jest-mock-extended';

import { AppId } from '../AppId';
import { ICredentials } from '../Credentials';
import { Challenge, NftContractType, NftOwnershipChallenge } from '../Nft';
import { Profile, ProfileId } from '../Profile';
import {
  NftOwnershipCriterion,
  Erc20OwnershipCriterion,
  AddressOwnershipCriterion,
  ProfileOwnershipCriterion,
  FollowProfileCriterion,
  CollectPublicationCriterion,
  CollectThisPublicationCriterion,
  OrCriterion,
  AndCriterion,
  Erc20ComparisonOperator,
  DecryptionCriteriaType,
  AnyCriterion,
  PublicationId,
} from '../Publication';
import { Signature } from '../Signature';
import {
  IUnsignedProtocolCall,
  MetaTransaction,
  NativeTransaction,
  Nonce,
  ProxyActionStatus,
  ProxyTransaction,
  ISignedProtocolCall,
  TransactionError,
  TransactionErrorReason,
  TransactionEvent,
  TransactionKind,
  AnyTransactionRequestModel,
  UnsignedTransaction,
  ProtocolTransactionRequestModel,
  DataTransaction,
} from '../Transactions';
import { Wallet } from '../Wallet';
import { ISignedVote, IUnsignedVote, PollId } from '../polls';

export function mockProfileId(): ProfileId {
  return faker.datatype.hexadecimal({ length: 2 }) as ProfileId;
}

export function mockPollId(): PollId {
  return faker.datatype.hexadecimal({ length: 2 }) as PollId;
}

export function mockPublicationId(profileId: ProfileId = mockProfileId()): PublicationId {
  return `${profileId}-${faker.datatype.hexadecimal({ length: 2 })}` as PublicationId;
}

export function mockWallet({ address = mockEvmAddress() }: { address?: EvmAddress } = {}) {
  return mock<Wallet>({ address });
}

export function mockCredentials(overrides?: Partial<ICredentials>) {
  return mock<ICredentials>({
    address: mockEvmAddress(),
    ...overrides,
  });
}

export function mockChallenge(): Challenge {
  return mock32BytesHexString();
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

export function mockNftOwnershipChallenge(): NftOwnershipChallenge {
  return {
    id: faker.datatype.uuid(),
    message: mockChallenge(),
  };
}

type MockedProxyTransactionInit<T extends ProtocolTransactionRequestModel> = {
  request: T;
  chainType?: ChainType;
  hash?: string;
  id?: string;
  status: ProxyActionStatus;
};

export class MockedProxyTransaction<
  T extends ProtocolTransactionRequestModel,
> extends ProxyTransaction<T> {
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

  static fromRequest<T extends ProtocolTransactionRequestModel>(request: T): ProxyTransaction<T> {
    return new MockedProxyTransaction({ request, status: ProxyActionStatus.MINTING });
  }
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

export function mockNftOwnershipCriterion(
  overrides?: Partial<NftOwnershipCriterion>,
): NftOwnershipCriterion {
  return {
    contractAddress: mockEvmAddress(),
    chainId: 1,
    contractType: NftContractType.Erc721,
    tokenIds: ['0x1', '0x2', '0x3'],
    ...overrides,
    type: DecryptionCriteriaType.NFT_OWNERSHIP,
  };
}

export function mockErc20OwnershipCriterion(
  overrides?: Partial<Erc20OwnershipCriterion>,
): Erc20OwnershipCriterion {
  return {
    amount: mockDaiAmount(1),
    condition: Erc20ComparisonOperator.GreaterThan,
    ...overrides,
    type: DecryptionCriteriaType.ERC20_OWNERSHIP,
  };
}

export function mockAddressOwnershipCriterion(
  overrides?: Partial<AddressOwnershipCriterion>,
): AddressOwnershipCriterion {
  return {
    address: mockEvmAddress(),
    ...overrides,
    type: DecryptionCriteriaType.ADDRESS_OWNERSHIP,
  };
}

export function mockProfileOwnershipCriterion(
  overrides?: Partial<ProfileOwnershipCriterion>,
): ProfileOwnershipCriterion {
  return {
    profileId: mockProfileId(),
    ...overrides,
    type: DecryptionCriteriaType.PROFILE_OWNERSHIP,
  };
}

export function mockFollowProfileCriterion(
  overrides?: Partial<FollowProfileCriterion>,
): FollowProfileCriterion {
  return {
    profileId: mockProfileId(),
    ...overrides,
    type: DecryptionCriteriaType.FOLLOW_PROFILE,
  };
}

export function mockCollectPublicationCriterion(
  overrides?: Partial<CollectPublicationCriterion>,
): CollectPublicationCriterion {
  return {
    publicationId: mockPublicationId(),
    ...overrides,
    type: DecryptionCriteriaType.COLLECT_PUBLICATION,
  };
}

export function mockCollectThisPublicationCriterion(): CollectThisPublicationCriterion {
  return {
    type: DecryptionCriteriaType.COLLECT_THIS_PUBLICATION,
  };
}

export function mockOrCriterion<T extends AnyCriterion[]>(criteria: T): OrCriterion<T> {
  return {
    or: criteria,
    type: DecryptionCriteriaType.OR,
  };
}

export function mockAndCriterion<T extends AnyCriterion[]>(criteria: T): AndCriterion<T> {
  return {
    and: criteria,
    type: DecryptionCriteriaType.AND,
  };
}

export function mockIUnsignedVote(overrides?: Partial<IUnsignedVote>): IUnsignedVote {
  return {
    pollId: mockPollId(),
    ...overrides,
  };
}

export function mockISignedVote(overrides?: Partial<ISignedVote>): ISignedVote {
  return {
    pollId: mockPollId(),
    signature: mockSignature(),
    ...overrides,
  };
}

export function mockAppId(): AppId {
  return faker.commerce.productName() as AppId;
}
