import { MockedResponse } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import { Nonce } from '@lens-protocol/domain/entities';
import { mockNonce, mockProfileId, mockPublicationId } from '@lens-protocol/domain/mocks';
import { URI } from '@lens-protocol/shared-kernel';
import { mockEvmAddress } from '@lens-protocol/shared-kernel/mocks';

import {
  AddPublicationBookmarkData,
  AddPublicationBookmarkDocument,
  AddPublicationBookmarkVariables,
  AddPublicationNotInterestedData,
  AddPublicationNotInterestedDocument,
  AddPublicationNotInterestedVariables,
  AddReactionDocument,
  AddReactionVariables,
  CommentOnchainData,
  CommentOnchainDocument,
  CommentOnchainVariables,
  CommentOnMomokaData,
  CommentOnMomokaDocument,
  CommentOnMomokaVariables,
  CreateLegacyCollectTypedDataData,
  CreateLegacyCollectTypedDataDocument,
  CreateLegacyCollectTypedDataVariables,
  CreateMomokaCommentTypedDataData,
  CreateMomokaCommentTypedDataDocument,
  CreateMomokaCommentTypedDataVariables,
  CreateMomokaMirrorTypedDataData,
  CreateMomokaMirrorTypedDataDocument,
  CreateMomokaMirrorTypedDataVariables,
  CreateMomokaPostTypedDataData,
  CreateMomokaPostTypedDataDocument,
  CreateMomokaPostTypedDataVariables,
  CreateMomokaPublicationResult,
  CreateMomokaQuoteTypedDataData,
  CreateMomokaQuoteTypedDataDocument,
  CreateMomokaQuoteTypedDataVariables,
  CreateOnchainCommentTypedDataData,
  CreateOnchainCommentTypedDataDocument,
  CreateOnchainCommentTypedDataVariables,
  CreateOnchainMirrorTypedDataData,
  CreateOnchainMirrorTypedDataDocument,
  CreateOnchainMirrorTypedDataVariables,
  CreateOnchainPostTypedDataData,
  CreateOnchainPostTypedDataDocument,
  CreateOnchainPostTypedDataVariables,
  CreateOnchainQuoteTypedDataData,
  CreateOnchainQuoteTypedDataDocument,
  CreateOnchainQuoteTypedDataVariables,
  HidePublicationData,
  HidePublicationDocument,
  HidePublicationVariables,
  LegacyCollectData,
  LegacyCollectDocument,
  LegacyCollectVariables,
  MirrorOnchainData,
  MirrorOnchainDocument,
  MirrorOnchainVariables,
  MirrorOnMomokaData,
  MirrorOnMomokaDocument,
  MirrorOnMomokaVariables,
  PostOnchainData,
  PostOnchainDocument,
  PostOnchainVariables,
  PostOnMomokaData,
  PostOnMomokaDocument,
  PostOnMomokaVariables,
  QuoteOnchainData,
  QuoteOnchainDocument,
  QuoteOnchainVariables,
  QuoteOnMomokaData,
  QuoteOnMomokaDocument,
  QuoteOnMomokaVariables,
  RemovePublicationBookmarkData,
  RemovePublicationBookmarkDocument,
  RemovePublicationBookmarkVariables,
  RemoveReactionDocument,
  RemoveReactionVariables,
  ReportPublicationData,
  ReportPublicationDocument,
  ReportPublicationVariables,
  UndoPublicationNotInterestedData,
  UndoPublicationNotInterestedDocument,
  UndoPublicationNotInterestedVariables,
} from '../../graphql/generated';
import {
  mockCreateTypedDataResult,
  mockEIP712TypedDataDomain,
  mockEIP712TypedDataField,
} from './utils';

export function mockHidePublicationResponse(
  variables: HidePublicationVariables,
): MockedResponse<HidePublicationData> {
  return {
    request: {
      query: HidePublicationDocument,
      variables,
    },
    result: {
      data: { hidePublication: null },
    },
  };
}

export function mockReportPublicationResponse(args: {
  variables: ReportPublicationVariables;
}): MockedResponse<ReportPublicationData> {
  return {
    request: {
      query: ReportPublicationDocument,
      variables: args.variables,
    },
    result: { data: { reportPublication: null } },
  };
}

export function mockAddReactionResponse({ variables }: { variables: AddReactionVariables }) {
  return {
    request: {
      query: AddReactionDocument,
      variables,
    },
    result: {
      data: { addReaction: null },
    },
  };
}

export function mockRemoveReactionResponse({ variables }: { variables: RemoveReactionVariables }) {
  return {
    request: {
      query: RemoveReactionDocument,
      variables,
    },
    result: {
      data: { removeReaction: null },
    },
  };
}

export function mockCreateOnchainPostTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateOnchainPostTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateOnchainPostBroadcastItemResult', {
      types: {
        Post: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      message: {
        nonce,
        deadline: 1644303500,
        profileId: mockProfileId(),
        contentURI: 'ipfs://QmR5V6fwKWzoa9gevmYaQ11eMQsAahsjfWPz1rCoNJjN1K.json' as URI,
        actionModules: [mockEvmAddress()],
        actionModulesInitDatas: ['0x'],
        referenceModule: '0x0000000000000000000000000000000000000000',
        referenceModuleInitData: '0x',
      },
    }),
  };
}

export function mockCreateOnchainPostTypedDataResponse<T extends CreateOnchainPostTypedDataData>({
  variables,
  data,
}: {
  variables: CreateOnchainPostTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateOnchainPostTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockPostOnchainResponse<T extends PostOnchainData, V extends PostOnchainVariables>({
  variables,
  data,
}: {
  variables: V;
  data: T;
}): MockedResponse<T, V> {
  return {
    request: {
      query: PostOnchainDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockCreateMomokaPostTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateMomokaPostTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateMomokaPostBroadcastItemResult', {
      types: {
        Post: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      message: {
        nonce,
        deadline: 1644303500,
        profileId: mockProfileId(),
        contentURI: 'ipfs://QmR5V6fwKWzoa9gevmYaQ11eMQsAahsjfWPz1rCoNJjN1K.json' as URI,
        actionModules: ['0xd6072BB2ABc0a9d1331c7d0B83AE6C47f2Cb86A3'],
        actionModulesInitDatas: ['0x'],
        referenceModule: '0x0000000000000000000000000000000000000000',
        referenceModuleInitData: '0x',
      },
    }),
  };
}

export function mockCreateMomokaPostTypedDataResponse<T extends CreateMomokaPostTypedDataData>({
  variables,
  data,
}: {
  variables: CreateMomokaPostTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateMomokaPostTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockPostOnMomokaResponse<
  T extends PostOnMomokaData,
  V extends PostOnMomokaVariables,
>({ variables, data }: { variables: V; data: T }): MockedResponse<T, V> {
  return {
    request: {
      query: PostOnMomokaDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockCreateMomokaPublicationResult(): CreateMomokaPublicationResult {
  return {
    __typename: 'CreateMomokaPublicationResult',
    id: mockPublicationId(),
    momokaId: faker.datatype.uuid(),
    proof: '...',
  };
}

export function mockCreateOnchainCommentTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateOnchainCommentTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateOnchainCommentBroadcastItemResult', {
      types: {
        Comment: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      message: {
        nonce,
        deadline: 1644303500,
        profileId: mockProfileId(),
        contentURI: 'ipfs://QmR5V6fwKWzoa9gevmYaQ11eMQsAahsjfWPz1rCoNJjN1K.json' as URI,
        pointedProfileId: mockProfileId(),
        pointedPubId: '0x01',
        referrerProfileIds: [],
        referrerPubIds: [],
        referenceModuleData: '0x',
        actionModules: [mockEvmAddress()],
        actionModulesInitDatas: ['0x'],
        referenceModule: '0x0000000000000000000000000000000000000000',
        referenceModuleInitData: '0x',
      },
    }),
  };
}

export function mockCreateOnchainCommentTypedDataResponse<
  T extends CreateOnchainCommentTypedDataData,
>({
  variables,
  data,
}: {
  variables: CreateOnchainCommentTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateOnchainCommentTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockCommentOnchainResponse<
  T extends CommentOnchainData,
  V extends CommentOnchainVariables,
>({ variables, data }: { variables: V; data: T }): MockedResponse<T, V> {
  return {
    request: {
      query: CommentOnchainDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockCreateMomokaCommentTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateMomokaCommentTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateMomokaCommentBroadcastItemResult', {
      types: {
        Comment: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      message: {
        nonce,
        deadline: 1644303500,
        profileId: mockProfileId(),
        contentURI: 'ipfs://QmR5V6fwKWzoa9gevmYaQ11eMQsAahsjfWPz1rCoNJjN1K.json' as URI,
        pointedProfileId: mockProfileId(),
        pointedPubId: '0x01',
        referrerProfileIds: [],
        referrerPubIds: [],
        referenceModuleData: '0x',
        actionModules: [mockEvmAddress()],
        actionModulesInitDatas: ['0x'],
        referenceModule: '0x0000000000000000000000000000000000000000',
        referenceModuleInitData: '0x',
      },
    }),
  };
}

export function mockCreateMomokaCommentTypedDataResponse<
  T extends CreateMomokaCommentTypedDataData,
>({
  variables,
  data,
}: {
  variables: CreateMomokaCommentTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateMomokaCommentTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockCommentOnMomokaResponse<
  T extends CommentOnMomokaData,
  V extends CommentOnMomokaVariables,
>({ variables, data }: { variables: V; data: T }): MockedResponse<T, V> {
  return {
    request: {
      query: CommentOnMomokaDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockCreateMomokaMirrorTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateMomokaMirrorTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateMomokaMirrorBroadcastItemResult', {
      types: {
        Mirror: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      message: {
        nonce,
        deadline: 1644303500,
        profileId: mockProfileId(),
        metadataURI: 'ipfs://QmR5V6fwKWzoa9gevmYaQ11eMQsAahsjfWPz1rCoNJjN1K.json',
        pointedProfileId: mockProfileId(),
        pointedPubId: '0x01',
        referrerProfileIds: [],
        referrerPubIds: [],
        referenceModuleData: '0x',
      },
    }),
  };
}

export function mockCreateMomokaMirrorTypedDataResponse<T extends CreateMomokaMirrorTypedDataData>({
  variables,
  data,
}: {
  variables: CreateMomokaMirrorTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateMomokaMirrorTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockMirrorOnMomokaResponse<
  T extends MirrorOnMomokaData,
  V extends MirrorOnMomokaVariables,
>({ variables, data }: { variables: V; data: T }): MockedResponse<T, V> {
  return {
    request: {
      query: MirrorOnMomokaDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockCreateOnchainMirrorTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateOnchainMirrorTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateOnchainMirrorBroadcastItemResult', {
      types: {
        Mirror: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      message: {
        nonce,
        deadline: 1644303500,
        profileId: mockProfileId(),
        metadataURI: 'ipfs://QmR5V6fwKWzoa9gevmYaQ11eMQsAahsjfWPz1rCoNJjN1K.json',
        pointedProfileId: mockProfileId(),
        pointedPubId: '0x01',
        referrerProfileIds: [],
        referrerPubIds: [],
        referenceModuleData: '0x',
      },
    }),
  };
}

export function mockCreateOnchainMirrorTypedDataResponse<
  T extends CreateOnchainMirrorTypedDataData,
>({
  variables,
  data,
}: {
  variables: CreateOnchainMirrorTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateOnchainMirrorTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockMirrorOnchainResponse<
  T extends MirrorOnchainData,
  V extends MirrorOnchainVariables,
>({ variables, data }: { variables: V; data: T }): MockedResponse<T, V> {
  return {
    request: {
      query: MirrorOnchainDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockCreateOnchainQuoteTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateOnchainQuoteTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateOnchainQuoteBroadcastItemResult', {
      types: {
        Quote: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      message: {
        nonce,
        deadline: 1644303500,
        profileId: mockProfileId(),
        contentURI: 'ipfs://QmR5V6fwKWzoa9gevmYaQ11eMQsAahsjfWPz1rCoNJjN1K.json' as URI,
        pointedProfileId: mockProfileId(),
        pointedPubId: '0x01',
        referrerProfileIds: [],
        referrerPubIds: [],
        referenceModuleData: '0x',
        actionModules: [mockEvmAddress()],
        actionModulesInitDatas: ['0x'],
        referenceModule: '0x0000000000000000000000000000000000000000',
        referenceModuleInitData: '0x',
      },
    }),
  };
}

export function mockCreateOnchainQuoteTypedDataResponse<T extends CreateOnchainQuoteTypedDataData>({
  variables,
  data,
}: {
  variables: CreateOnchainQuoteTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateOnchainQuoteTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockQuoteOnchainResponse<
  T extends QuoteOnchainData,
  V extends QuoteOnchainVariables,
>({ variables, data }: { variables: V; data: T }): MockedResponse<T, V> {
  return {
    request: {
      query: QuoteOnchainDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockCreateMomokaQuoteTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateMomokaQuoteTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateMomokaQuoteBroadcastItemResult', {
      types: {
        Quote: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      message: {
        nonce,
        deadline: 1644303500,
        profileId: mockProfileId(),
        contentURI: 'ipfs://QmR5V6fwKWzoa9gevmYaQ11eMQsAahsjfWPz1rCoNJjN1K.json' as URI,
        pointedProfileId: mockProfileId(),
        pointedPubId: '0x01',
        referrerProfileIds: [],
        referrerPubIds: [],
        referenceModuleData: '0x',
        actionModules: [mockEvmAddress()],
        actionModulesInitDatas: ['0x'],
        referenceModule: '0x0000000000000000000000000000000000000000',
        referenceModuleInitData: '0x',
      },
    }),
  };
}

export function mockCreateMomokaQuoteTypedDataResponse<T extends CreateMomokaQuoteTypedDataData>({
  variables,
  data,
}: {
  variables: CreateMomokaQuoteTypedDataVariables;
  data: T;
}): MockedResponse<T> {
  return {
    request: {
      query: CreateMomokaQuoteTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockQuoteOnMomokaResponse<
  T extends QuoteOnMomokaData,
  V extends QuoteOnMomokaVariables,
>({ variables, data }: { variables: V; data: T }): MockedResponse<T, V> {
  return {
    request: {
      query: QuoteOnMomokaDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockAddToMyBookmarksResponse(
  variables: AddPublicationBookmarkVariables,
): MockedResponse<AddPublicationBookmarkData> {
  return {
    request: {
      query: AddPublicationBookmarkDocument,
      variables,
    },
    result: { data: { result: null } },
  };
}

export function mockRemoveFromMyBookmarksResponse(
  variables: RemovePublicationBookmarkVariables,
): MockedResponse<RemovePublicationBookmarkData> {
  return {
    request: {
      query: RemovePublicationBookmarkDocument,
      variables,
    },
    result: { data: { result: null } },
  };
}

export function mockCreateLegacyCollectTypedDataData({
  nonce = mockNonce(),
}: { nonce?: Nonce } = {}): CreateLegacyCollectTypedDataData {
  return {
    result: mockCreateTypedDataResult('CreateLegacyCollectBroadcastItemResult', {
      types: {
        CollectLegacy: [mockEIP712TypedDataField()],
      },
      domain: mockEIP712TypedDataDomain(),
      message: {
        nonce,
        deadline: 1644303500,
        publicationCollectedProfileId: mockProfileId(),
        publicationCollectedId: '0x01',
        collectorProfileId: mockProfileId(),
        referrerProfileId: mockProfileId(),
        referrerPubId: faker.datatype.hexadecimal({ length: 2 }),
        collectModuleData: '0x',
      },
    }),
  };
}

export function mockCreateLegacyCollectTypedDataResponse<
  T extends CreateLegacyCollectTypedDataData,
  V extends CreateLegacyCollectTypedDataVariables,
>({ variables, data }: { variables: V; data: T }): MockedResponse<T, V> {
  return {
    request: {
      query: CreateLegacyCollectTypedDataDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockLegacyCollectResponse<
  T extends LegacyCollectData,
  V extends LegacyCollectVariables,
>({ variables, data }: { variables: V; data: T }): MockedResponse<T, V> {
  return {
    request: {
      query: LegacyCollectDocument,
      variables,
    },
    result: {
      data,
    },
  };
}

export function mockAddPublicationNotInterestedResponse(
  variables: AddPublicationNotInterestedVariables,
): MockedResponse<AddPublicationNotInterestedData> {
  return {
    request: {
      query: AddPublicationNotInterestedDocument,
      variables,
    },
    result: { data: { addPublicationNotInterested: null } },
  };
}

export function mockUndoPublicationNotInterestedResponse(
  variables: UndoPublicationNotInterestedVariables,
): MockedResponse<UndoPublicationNotInterestedData> {
  return {
    request: {
      query: UndoPublicationNotInterestedDocument,
      variables,
    },
    result: { data: { undoPublicationNotInterested: null } },
  };
}
