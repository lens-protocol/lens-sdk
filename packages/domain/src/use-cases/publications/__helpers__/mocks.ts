import { faker } from '@faker-js/faker';
import { ChainType, Data, URI } from '@lens-protocol/shared-kernel';
import { mockDaiAmount, mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';

import { PublicationReportReason, TransactionKind } from '../../../entities';
import { mockPublicationId } from '../../../entities/__helpers__/mocks';
import { CreateCommentRequest } from '../CreateComment';
import { CreateMirrorRequest } from '../CreateMirror';
import { CreatePostRequest } from '../CreatePost';
import { CreateQuoteRequest } from '../CreateQuote';
import { HidePublicationRequest } from '../HidePublication';
import {
  AllOpenActionType,
  CollectFee,
  LegacyCollectRequest,
  MultirecipientCollectRequest,
  SimpleCollectRequest,
  UnknownActionRequest,
} from '../OpenAction';
import { OpenActionType, UnknownOpenActionConfig } from '../OpenActionConfig';
import {
  AnyoneReferencePolicyConfig,
  ReferencePolicyType,
  UnknownReferencePolicyConfig,
} from '../ReferencePolicyConfig';
import { ReportPublicationRequest } from '../ReportPublication';

export function mockCreateMirrorRequest(
  overrides?: Partial<CreateMirrorRequest>,
): CreateMirrorRequest {
  return {
    mirrorOn: mockPublicationId(),
    signless: false,
    sponsored: true,
    ...overrides,
    kind: TransactionKind.MIRROR_PUBLICATION,
  };
}

export function mockCreatePostRequest(overrides?: Partial<CreatePostRequest>): CreatePostRequest {
  return {
    signless: false,
    sponsored: true,
    metadata: faker.internet.url() as URI,
    actions: [mockUnknownOpenActionConfig()],
    reference: mockAnyoneReferencePolicyConfig(),
    ...overrides,
    kind: TransactionKind.CREATE_POST,
  };
}

export function mockCreateCommentRequest(
  overrides?: Partial<CreateCommentRequest>,
): CreateCommentRequest {
  return {
    signless: false,
    sponsored: true,
    metadata: faker.internet.url() as URI,
    actions: [mockUnknownOpenActionConfig()],
    reference: mockAnyoneReferencePolicyConfig(),
    commentOn: mockPublicationId(),
    ...overrides,
    kind: TransactionKind.CREATE_COMMENT,
  };
}

export function mockCreateQuoteRequest(
  overrides?: Partial<CreateQuoteRequest>,
): CreateQuoteRequest {
  return {
    signless: false,
    sponsored: true,
    metadata: faker.internet.url() as URI,
    actions: [mockUnknownOpenActionConfig()],
    reference: mockAnyoneReferencePolicyConfig(),
    quoteOn: mockPublicationId(),
    ...overrides,
    kind: TransactionKind.CREATE_QUOTE,
  };
}

export function mockHidePublicationRequest(
  overrides?: Partial<HidePublicationRequest>,
): HidePublicationRequest {
  return {
    publicationId: mockPublicationId(),
    ...overrides,
  };
}

export function mockReportPublicationRequest(
  overrides?: Partial<ReportPublicationRequest>,
): ReportPublicationRequest {
  return {
    publicationId: mockPublicationId(),
    reason: PublicationReportReason.FAKE_ENGAGEMENT,
    additionalComments: faker.lorem.sentence(),
    ...overrides,
  };
}

export function mockUnknownOpenActionConfig(
  overrides?: Partial<UnknownOpenActionConfig>,
): UnknownOpenActionConfig {
  return {
    address: mockEvmAddress(),
    data: '0x' as Data,
    ...overrides,
    type: OpenActionType.UNKNOWN_OPEN_ACTION,
  };
}

export function mockAnyoneReferencePolicyConfig(): AnyoneReferencePolicyConfig {
  return {
    type: ReferencePolicyType.ANYONE,
  };
}

export function mockUnknownReferencePolicyConfig(
  overrides?: Partial<UnknownReferencePolicyConfig>,
): UnknownReferencePolicyConfig {
  return {
    address: mockEvmAddress(),
    data: '0x' as Data,
    ...overrides,
    type: ReferencePolicyType.UNKNOWN,
  };
}

export function mockCollectFee(overrides?: Partial<CollectFee>): CollectFee {
  return {
    amount: mockDaiAmount(1, ChainType.POLYGON),
    contractAddress: mockEvmAddress(),
    ...overrides,
  };
}

export function mockLegacyCollectRequest(
  overrides?: Partial<LegacyCollectRequest>,
): LegacyCollectRequest {
  return {
    publicationId: mockPublicationId(),
    public: false,
    signless: true,
    sponsored: true,
    ...overrides,
    type: AllOpenActionType.LEGACY_COLLECT,
    kind: TransactionKind.ACT_ON_PUBLICATION,
  };
}

export function mockSimpleCollectRequest(
  overrides?: Partial<SimpleCollectRequest>,
): SimpleCollectRequest {
  return {
    publicationId: mockPublicationId(),
    public: false,
    signless: true,
    sponsored: true,
    ...overrides,
    type: AllOpenActionType.SIMPLE_COLLECT,
    kind: TransactionKind.ACT_ON_PUBLICATION,
  };
}

export function mockMultirecipientCollectRequest(
  overrides?: Partial<MultirecipientCollectRequest>,
): MultirecipientCollectRequest {
  return {
    publicationId: mockPublicationId(),
    fee: mockCollectFee(),
    public: false,
    signless: true,
    sponsored: true,
    ...overrides,
    type: AllOpenActionType.MULTIRECIPIENT_COLLECT,
    kind: TransactionKind.ACT_ON_PUBLICATION,
  };
}

export function mockUnknownActionRequest(
  overrides?: Partial<UnknownActionRequest>,
): UnknownActionRequest {
  return {
    publicationId: mockPublicationId(),
    address: mockEvmAddress(),
    data: '0x' as Data,
    public: false,
    signless: true,
    sponsored: true,
    ...overrides,
    type: AllOpenActionType.UNKNOWN_OPEN_ACTION,
    kind: TransactionKind.ACT_ON_PUBLICATION,
  };
}
