import type { FragmentOf } from 'gql.tada';
import { PaginatedResultInfoFragment } from './fragments';
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

const SponsorLimitFragment = graphql(
  `fragment SponsorLimit on SponsorLimit {
    __typename
    window
    allowance
  }`,
);
export type SponsorLimitMetadata = FragmentOf<typeof SponsorLimitFragment>;

const SponsorshipFragment = graphql(
  `fragment Sponsorship on Sponsorship {
    address
    isPaused
    allowLensAccess
    createdAt
    metadata {
      ...SponsorshipMetadata
    }
    globalRateLimit {
      ...SponsorLimit
    }
    userRateLimit {
      ...SponsorLimit
    }
    owner
  }`,
  [SponsorshipMetadataFragment, SponsorLimitFragment],
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
