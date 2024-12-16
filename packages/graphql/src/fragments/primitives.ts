import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';

export const AppMetadataFragment = graphql(
  `fragment AppMetadata on AppMetadata {
      __typename
      description
      developer
      logo
      name
      platforms
      privacyPolicy
      termsOfService
      url
  }`,
);
export type AppMetadata = FragmentOf<typeof AppMetadataFragment>;

export const AppFragment = graphql(
  `fragment App on App {
    __typename
    address
    graphAddress
    sponsorshipAddress
    defaultFeedAddress
    namespaceAddress
    treasuryAddress
    createdAt
    metadata {
      ...AppMetadata
    }
  }`,
  [AppMetadataFragment],
);
export type App = FragmentOf<typeof AppFragment>;

export const FeedMetadataFragment = graphql(
  `fragment FeedMetadata on FeedMetadata {
      __typename
      description
      id
      name
      title
  }`,
);
export type FeedMetadata = FragmentOf<typeof FeedMetadataFragment>;

// TODO: Add operations and rules
export const FeedFragment = graphql(
  `fragment Feed on Feed {
    __typename
    address
    createdAt
    metadata {
      ...FeedMetadata
    }
    owner
  }`,
  [FeedMetadataFragment],
);
export type Feed = FragmentOf<typeof FeedFragment>;

export const GraphMetadataFragment = graphql(
  `fragment GraphMetadata on GraphMetadata {
      __typename
      description
      id
      name
      title
  }`,
);
export type GraphMetadata = FragmentOf<typeof GraphMetadataFragment>;

// TODO: Add rules
export const GraphFragment = graphql(
  `fragment Graph on Graph {
    __typename
    address
    createdAt
    metadata {
      ...GraphMetadata
    }
    owner
  }`,
  [GraphMetadataFragment],
);
export type Graph = FragmentOf<typeof GraphFragment>;

export const UsernameNamespaceMetadataFragment = graphql(
  `fragment UsernameNamespaceMetadata on UsernameNamespaceMetadata {
      __typename
      description
      id
  }`,
);
export type UsernameNamespaceMetadata = FragmentOf<typeof UsernameNamespaceMetadataFragment>;

// TODO: Add rules
export const UsernameNamespaceFragment = graphql(
  `fragment UsernameNamespace on UsernameNamespace {
    __typename
    address
    createdAt
    metadata {
      ...UsernameNamespaceMetadata
    }
    owner
  }`,
  [UsernameNamespaceMetadataFragment],
);
export type UsernameNamespace = FragmentOf<typeof UsernameNamespaceFragment>;

export const GroupMetadataFragment = graphql(
  `fragment GroupMetadata on GroupMetadata {
      __typename
      description
      id
      icon
      name
      coverPicture
  }`,
);
export type GroupMetadata = FragmentOf<typeof GroupMetadataFragment>;

// TODO: add GroupRulesConfig
export const GroupFragment = graphql(
  `fragment Group on Group {
    __typename
    address
    timestamp
    metadata {
      ...GroupMetadata
    }
    isMember
    owner
  }`,
  [GroupMetadataFragment],
);
export type Group = FragmentOf<typeof GroupFragment>;
