import type { FragmentOf } from 'gql.tada';
import {
  PaginatedResultInfoFragment,
  SelfFundedTransactionRequestFragment,
  SponsoredTransactionRequestFragment,
  TransactionWillFailFragment,
} from './fragments';
import { type RequestOf, graphql } from './graphql';

const SponsorshipMetadataFragment = graphql(
  `fragment SponsorshipMetadata on SponsorshipMetadata {
    __typename
    id
    name
    description
  }`,
);
export type SponsorshipMetadata = FragmentOf<typeof SponsorshipMetadataFragment>;

const SponsorshipRateLimitFragment = graphql(
  `fragment SponsorshipRateLimit on SponsorshipRateLimit {
    __typename
    limit
    window
  }`,
);
export type SponsorshipRateLimit = FragmentOf<typeof SponsorshipRateLimitFragment>;

const SponsorshipFragment = graphql(
  `fragment Sponsorship on Sponsorship {
    __typename
    address
    isPaused
    allowsLensAccess
    createdAt
    metadata {
      ...SponsorshipMetadata
    }
    limits {
      __typename
      global {
        ...SponsorshipRateLimit
      }
      user {
        ...SponsorshipRateLimit
      }
    }
    owner
  }`,
  [SponsorshipMetadataFragment, SponsorshipRateLimitFragment],
);
export type Sponsorship = FragmentOf<typeof SponsorshipFragment>;

export const SponsorshipsQuery = graphql(
  `query Sponsorships($request: SponsorshipsRequest!) {
    value: sponsorships(request: $request) {
      items {
        ...Sponsorship
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [SponsorshipFragment, PaginatedResultInfoFragment],
);
export type SponsorshipsRequest = RequestOf<typeof SponsorshipsQuery>;

export const SponsorshipQuery = graphql(
  `query Sponsorship($request: SponsorshipRequest!) {
    value: sponsorship(request: $request) {
      ...Sponsorship
    }
  }`,
  [SponsorshipFragment],
);
export type SponsorshipRequest = RequestOf<typeof SponsorshipQuery>;

const SponsorshipSignerFragment = graphql(
  `fragment SponsorshipSigner on SponsorshipSigner {
    __typename
    sponsorship
    label
    address
    createdAt
  }`,
);
export type SponsorshipSigner = FragmentOf<typeof SponsorshipSignerFragment>;

export const SponsorshipSignerQuery = graphql(
  `query SponsorshipSigner($request: SponsorshipSignersRequest!) {
    value: sponsorshipSigners(request: $request) {
      items {
        ...SponsorshipSigner
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [SponsorshipSignerFragment, PaginatedResultInfoFragment],
);
export type SponsorshipSignersRequest = RequestOf<typeof SponsorshipSignerQuery>;

const SponsorshipLimitsExemptFragment = graphql(
  `fragment SponsorshipLimitsExempt on SponsorshipLimitsExempt {
    __typename
    sponsorship
    label
    address
    createdAt
  }`,
);
export type SponsorshipLimitsExempt = FragmentOf<typeof SponsorshipLimitsExemptFragment>;

export const SponsorshipLimitExclusionsQuery = graphql(
  `query  SponsorshipLimitExclusions($request:  SponsorshipLimitExclusionsRequest!) {
    value: sponsorshipLimitsExclusions(request: $request) {
      items {
        ... SponsorshipLimitsExempt
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [SponsorshipLimitsExemptFragment, PaginatedResultInfoFragment],
);
export type SponsorshipLimitExclusionsRequest = RequestOf<typeof SponsorshipLimitExclusionsQuery>;

const CreateSponsorshipResponse = graphql(
  `fragment CreateSponsorshipResponse on CreateSponsorshipResponse {
    __typename
    hash
  }`,
);
export type CreateSponsorshipResponse = FragmentOf<typeof CreateSponsorshipResponse>;

const CreateSponsorshipResultFragment = graphql(
  `fragment CreateSponsorshipResult on CreateSponsorshipResult {
    ...on CreateSponsorshipResponse {
      ...CreateSponsorshipResponse
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [CreateSponsorshipResponse, SelfFundedTransactionRequestFragment, TransactionWillFailFragment],
);
export type CreateSponsorshipResult = FragmentOf<typeof CreateSponsorshipResultFragment>;

export const CreateSponsorshipMutation = graphql(
  `mutation CreateSponsorship($request: CreateSponsorshipRequest!) {
    value: createSponsorship(request: $request) {
      ...CreateSponsorshipResult
    }
  }`,
  [CreateSponsorshipResultFragment],
);
export type CreateSponsorshipRequest = RequestOf<typeof CreateSponsorshipMutation>;

const SetSponsorshipMetadataResultFragment = graphql(
  `fragment SetSponsorshipMetadataResult on SetSponsorshipMetadataResult {
    ... on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type SetSponsorshipMetadataResult = FragmentOf<typeof SetSponsorshipMetadataResultFragment>;

export const SetSponsorshipMetadataMutation = graphql(
  `mutation SetSponsorshipMetadata($request: SetSponsorshipMetadataRequest!) {
    value: setSponsorshipMetadata(request: $request) {
      ...SetSponsorshipMetadataResult
    }
  }`,
  [SetSponsorshipMetadataResultFragment],
);
export type SetSponsorshipMetadataRequest = RequestOf<typeof SetSponsorshipMetadataMutation>;

const UpdateSponsorshipLimitsResultFragment = graphql(
  `fragment UpdateSponsorshipLimitsResult on UpdateSponsorshipLimitsResult {
    ... on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type UpdateSponsorshipLimitsResult = FragmentOf<
  typeof UpdateSponsorshipLimitsResultFragment
>;

export const UpdateSponsorshipLimitsMutation = graphql(
  `mutation UpdateSponsorshipLimits($request: UpdateSponsorshipLimitsRequest!) {
    value: updateSponsorshipLimits(request: $request) {
      ...UpdateSponsorshipLimitsResult
    }
  }`,
  [UpdateSponsorshipLimitsResultFragment],
);
export type UpdateSponsorshipLimitsRequest = RequestOf<typeof UpdateSponsorshipLimitsMutation>;

const UpdateSponsorshipExclusionListResultFragment = graphql(
  `fragment UpdateSponsorshipExclusionListResult on UpdateSponsorshipExclusionListResult {
    ... on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type UpdateSponsorshipExclusionListResult = FragmentOf<
  typeof UpdateSponsorshipExclusionListResultFragment
>;

export const UpdateSponsorshipExclusionListMutation = graphql(
  `mutation UpdateSponsorshipExclusionList($request: UpdateSponsorshipExclusionListRequest!) {
    value: updateSponsorshipExclusionList(request: $request) {
      ...UpdateSponsorshipExclusionListResult
    }
  }`,
  [UpdateSponsorshipExclusionListResultFragment],
);
export type UpdateSponsorshipExclusionListRequest = RequestOf<
  typeof UpdateSponsorshipExclusionListMutation
>;

const UpdateSponsorshipSignersResultFragment = graphql(
  `fragment UpdateSponsorshipSignersResult on UpdateSponsorshipSignersResult {
    ... on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type UpdateSponsorshipSignersResult = FragmentOf<
  typeof UpdateSponsorshipSignersResultFragment
>;

export const UpdateSponsorshipSignersMutation = graphql(
  `mutation UpdateSponsorshipSigners($request: UpdateSponsorshipSignersRequest!) {
    value: updateSponsorshipSigners(request: $request) {
      ...UpdateSponsorshipSignersResult
    }
  }`,
  [UpdateSponsorshipSignersResultFragment],
);
export type UpdateSponsorshipSignersRequest = RequestOf<typeof UpdateSponsorshipSignersMutation>;
