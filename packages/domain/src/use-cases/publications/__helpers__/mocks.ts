import { faker } from '@faker-js/faker';
import { ChainType } from '@lens-protocol/shared-kernel';
import {
  mockDaiAmount,
  mockEthereumAddress,
  mockUsdcAmount,
} from '@lens-protocol/shared-kernel/mocks';

import { ReactionType, ReportReason, TransactionKind } from '../../../entities';
import { mockProfileId } from '../../profile/__helpers__/mocks';
import { CollectType, FreeCollectRequest, PaidCollectRequest } from '../CollectPublication';
import { CreateCommentRequest } from '../CreateComment';
import { CreateMirrorRequest } from '../CreateMirror';
import { CreatePostRequest } from '../CreatePost';
import { HidePublicationRequest } from '../HidePublication';
import { ReactionRequest } from '../Reaction';
import { ReferencePolicyType } from '../ReferencePolicyConfig';
import { ReportPublicationRequest } from '../ReportPublication';
import { ImageType } from '../config';
import {
  ChargeCollectPolicy,
  CollectPolicyType,
  ContentFocus,
  FreeCollectPolicy,
  Media,
  NftAttribute,
  NftAttributeDisplayType,
  NftMetadata,
  NoCollectPolicy,
} from '../types';

export function mockCreateCommentRequest(
  overrides?: Partial<CreateCommentRequest>,
): CreateCommentRequest {
  return {
    kind: TransactionKind.CREATE_COMMENT,

    contentFocus: ContentFocus.TEXT,
    publicationId: faker.datatype.uuid(),
    content: faker.lorem.paragraph(),
    reference: {
      type: ReferencePolicyType.ANYONE,
    },
    collect: {
      type: CollectPolicyType.NO_COLLECT,
    },
    profileId: mockProfileId(),
    delegate: false,
    locale: 'en',

    ...overrides,
  };
}

export function mockMedia(): Media {
  return {
    url: faker.image.imageUrl(),
    mimeType: ImageType.JPEG,
  };
}

export function mockDateNftAttribute(): NftAttribute {
  return {
    displayType: NftAttributeDisplayType.Date,
    traitType: faker.lorem.word(),
    value: faker.date.past(),
  };
}

export function mockNumberNftAttribute(): NftAttribute {
  return {
    displayType: NftAttributeDisplayType.Number,
    traitType: faker.lorem.word(),
    value: faker.datatype.number(),
  };
}

export function mockStringNftAttribute(): NftAttribute {
  return {
    displayType: NftAttributeDisplayType.String,
    traitType: faker.lorem.word(),
    value: faker.lorem.word(),
  };
}

export function mockNftMetadata(overrides?: Partial<NftMetadata>): NftMetadata {
  return {
    name: faker.lorem.words(),
    attributes: [],
    ...overrides,
  };
}

export function mockNoCollectPolicy(): NoCollectPolicy {
  return {
    type: CollectPolicyType.NO_COLLECT,
  };
}

export function mockFreeCollectPolicy(overrides: Partial<FreeCollectPolicy>): FreeCollectPolicy {
  return {
    metadata: mockNftMetadata(),
    followersOnly: true,
    type: CollectPolicyType.FREE,
    ...overrides,
  };
}

export function mockChargeCollectPolicy({
  collectLimit,
  followersOnly,
  timeLimited = false,
}: {
  collectLimit?: number;
  followersOnly: boolean;
  timeLimited?: boolean;
}): ChargeCollectPolicy {
  return {
    type: CollectPolicyType.CHARGE,
    fee: mockUsdcAmount(42),
    followersOnly,
    metadata: mockNftMetadata(),
    mirrorReward: faker.datatype.float({
      min: 0,
      max: 100,
      precision: 0.01,
    }),
    recipient: mockEthereumAddress(),
    collectLimit,
    timeLimited,
  };
}

export function mockCreateMirrorRequest(
  overrides?: Partial<CreateMirrorRequest>,
): CreateMirrorRequest {
  return {
    profileId: mockProfileId(),
    publicationId: faker.datatype.uuid(),
    ...overrides,
    kind: TransactionKind.MIRROR_PUBLICATION,
    delegate: false,
  };
}

export function mockCreatePostRequest(overrides?: Partial<CreatePostRequest>): CreatePostRequest {
  return {
    kind: TransactionKind.CREATE_POST,

    contentFocus: ContentFocus.TEXT,
    content: faker.lorem.paragraph(),
    reference: {
      type: ReferencePolicyType.ANYONE,
    },
    collect: {
      type: CollectPolicyType.NO_COLLECT,
    },
    profileId: mockProfileId(),
    delegate: false,
    locale: 'en',

    ...overrides,
  };
}

export function mockReactionRequest(overrides?: Partial<ReactionRequest>): ReactionRequest {
  return {
    profileId: faker.datatype.uuid(),
    publicationId: faker.datatype.uuid(),
    reactionType: ReactionType.UPVOTE,
    ...overrides,
  };
}

export function mockHidePublicationRequest(
  overrides?: Partial<HidePublicationRequest>,
): HidePublicationRequest {
  return {
    publicationId: faker.datatype.uuid(),
    ...overrides,
  };
}

export function mockFreeCollectRequest(
  overrides?: Partial<FreeCollectRequest>,
): FreeCollectRequest {
  return {
    profileId: mockProfileId(),
    type: CollectType.FREE,
    publicationId: faker.datatype.uuid(),
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
    publicationId: faker.datatype.uuid(),
    fee: {
      amount: mockDaiAmount(1, ChainType.POLYGON),
      contractAddress: mockEthereumAddress(),
    },
    ...overrides,
    kind: TransactionKind.COLLECT_PUBLICATION,
  };
}

export function mockReportPublicationRequest(
  overrides?: Partial<ReportPublicationRequest>,
): ReportPublicationRequest {
  return {
    publicationId: faker.datatype.uuid(),
    reason: ReportReason.FAKE_ENGAGEMENT,
    additionalComments: faker.lorem.sentence(),
    ...overrides,
  };
}
