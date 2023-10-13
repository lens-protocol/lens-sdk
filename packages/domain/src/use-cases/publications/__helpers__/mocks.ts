import { faker } from '@faker-js/faker';
import { ChainType, Data, URI } from '@lens-protocol/shared-kernel';
import { mockDaiAmount, mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';

import { ReportReason, TransactionKind } from '../../../entities';
import { mockProfileId, mockPublicationId } from '../../../entities/__helpers__/mocks';
import { CollectType, FreeCollectRequest, PaidCollectRequest } from '../CollectPublication';
import { CreateCommentRequest } from '../CreateComment';
import { CreateMirrorRequest } from '../CreateMirror';
import { CreatePostRequest } from '../CreatePost';
import { CreateQuoteRequest } from '../CreateQuote';
import { HidePublicationRequest } from '../HidePublication';
import { OpenActionType, UnknownOpenActionConfig } from '../OpenActionConfig';
import { AnyoneReferencePolicyConfig, ReferencePolicyType } from '../ReferencePolicyConfig';
import { ReportPublicationRequest } from '../ReportPublication';
import { TogglePropertyRequest } from '../ToggleProperty';

export function mockCreateMirrorRequest(
  overrides?: Partial<CreateMirrorRequest>,
): CreateMirrorRequest {
  return {
    mirrorOn: mockPublicationId(),
    delegate: false,
    momoka: false,
    ...overrides,
    kind: TransactionKind.MIRROR_PUBLICATION,
  };
}

export function mockCreatePostRequest(overrides?: Partial<CreatePostRequest>): CreatePostRequest {
  return {
    delegate: false,
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
    delegate: false,
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
    delegate: false,
    metadata: faker.internet.url() as URI,
    actions: [mockUnknownOpenActionConfig()],
    reference: mockAnyoneReferencePolicyConfig(),
    quoteOn: mockPublicationId(),
    ...overrides,
    kind: TransactionKind.CREATE_QUOTE,
  };
}

export function mockTogglePropertyRequest(
  overrides?: Partial<TogglePropertyRequest>,
): TogglePropertyRequest {
  return {
    publicationId: mockPublicationId(),
    ...overrides,
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

export function mockFreeCollectRequest(
  overrides?: Partial<FreeCollectRequest>,
): FreeCollectRequest {
  return {
    profileId: mockProfileId(),
    type: CollectType.FREE,
    publicationId: mockPublicationId(),
    followerOnly: false,
    ...overrides,
    kind: TransactionKind.COLLECT_PUBLICATION,
  };
}

export function mockPaidCollectRequest(
  overrides?: Partial<PaidCollectRequest>,
): PaidCollectRequest {
  return {
    profileId: mockProfileId(),
    type: CollectType.PAID,
    publicationId: mockPublicationId(),
    fee: {
      amount: mockDaiAmount(1, ChainType.POLYGON),
      contractAddress: mockEvmAddress(),
    },
    ...overrides,
    kind: TransactionKind.COLLECT_PUBLICATION,
  };
}

export function mockReportPublicationRequest(
  overrides?: Partial<ReportPublicationRequest>,
): ReportPublicationRequest {
  return {
    publicationId: mockPublicationId(),
    reason: ReportReason.FAKE_ENGAGEMENT,
    additionalComments: faker.lorem.sentence(),
    ...overrides,
  };
}

export function mockUnknownOpenActionConfig(): UnknownOpenActionConfig {
  return {
    type: OpenActionType.UNKNOWN_OPEN_ACTION,
    address: mockEvmAddress(),
    data: '0x' as Data,
  };
}

export function mockAnyoneReferencePolicyConfig(): AnyoneReferencePolicyConfig {
  return {
    type: ReferencePolicyType.ANYONE,
  };
}
