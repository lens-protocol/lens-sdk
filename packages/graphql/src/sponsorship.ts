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
