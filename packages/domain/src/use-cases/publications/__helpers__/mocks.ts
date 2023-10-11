import { faker } from '@faker-js/faker';
import { ChainType, URI } from '@lens-protocol/shared-kernel';
import { mockDaiAmount, mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';

import { ReportReason, TransactionKind } from '../../../entities';
import { mockProfileId, mockPublicationId } from '../../../entities/__helpers__/mocks';
import { MomokaOptionRequest } from '../../transactions/MomokaOption';
import { CollectType, FreeCollectRequest, PaidCollectRequest } from '../CollectPublication';
import { CreateCommentRequest } from '../CreateComment';
import { CreateMirrorRequest } from '../CreateMirror';
import { CreatePostRequest } from '../CreatePost';
import { CreateQuoteRequest } from '../CreateQuote';
import { HidePublicationRequest } from '../HidePublication';
import { ReferencePolicyType } from '../ReferencePolicyConfig';
import { ReportPublicationRequest } from '../ReportPublication';
import { TogglePropertyRequest } from '../ToggleProperty';

export function mockCreateMirrorRequest(
  overrides?: Partial<CreateMirrorRequest>,
): CreateMirrorRequest {
  return {
    profileId: mockProfileId(),
    mirrorOn: mockPublicationId(),
    delegate: false,
    momoka: false,
    ...overrides,
    kind: TransactionKind.MIRROR_PUBLICATION,
  };
}

export function mockCreatePostRequest(overrides?: Partial<CreatePostRequest>): CreatePostRequest {
  return {
    momoka: false,
    delegate: false,
    metadata: faker.internet.url() as URI,
    reference: {
      type: ReferencePolicyType.ANYONE,
    },
    ...overrides,
    kind: TransactionKind.CREATE_POST,
  };
}

export function mockCreateCommentRequest(
  overrides?: Partial<CreateCommentRequest>,
): CreateCommentRequest {
  return {
    momoka: false,
    delegate: false,
    metadata: faker.internet.url() as URI,
    reference: {
      type: ReferencePolicyType.ANYONE,
    },
    commentOn: mockPublicationId(),
    ...overrides,
    kind: TransactionKind.CREATE_COMMENT,
  };
}

export function mockCreateQuoteRequest(
  overrides?: Partial<CreateQuoteRequest>,
): CreateQuoteRequest {
  return {
    momoka: false,
    delegate: false,
    metadata: faker.internet.url() as URI,
    reference: {
      type: ReferencePolicyType.ANYONE,
    },
    quoteOn: mockPublicationId(),
    ...overrides,
    kind: TransactionKind.CREATE_QUOTE,
  };
}

export function mockMomokaOptionRequest(
  overrides?: Partial<MomokaOptionRequest>,
): MomokaOptionRequest {
  return {
    momoka: false,
    delegate: false,
    ...overrides,
    kind: TransactionKind.CREATE_POST,
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
