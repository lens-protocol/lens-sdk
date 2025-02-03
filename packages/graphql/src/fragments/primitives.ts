import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';
import { ExtraDataFragment } from './common';

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

export const FeedOperationValidationPassedFragment = graphql(
  `fragment FeedOperationValidationPassed on FeedOperationValidationPassed {
    __typename
  }`,
);
export type FeedOperationValidationPassed = FragmentOf<
  typeof FeedOperationValidationPassedFragment
>;

export const FeedRuleFragment = graphql(
  `fragment FeedRule on FeedRule {
      __typename
      id
      type
      address
      extraData {
        ...ExtraData
      }
    }`,
  [ExtraDataFragment],
);
export type FeedRule = FragmentOf<typeof FeedRuleFragment>;

export const FeedOperationValidationUnknownFragment = graphql(
  `fragment FeedOperationValidationUnknown on FeedOperationValidationUnknown {
    __typename
    extraChecksRequired {
      ...FeedRule
    }
  }`,
  [FeedRuleFragment],
);
export type FeedOperationValidationUnknown = FragmentOf<
  typeof FeedOperationValidationUnknownFragment
>;

export const FeedUnsatisfiedRuleFragment = graphql(
  `fragment FeedUnsatisfiedRule on FeedUnsatisfiedRule {
    __typename
    rule
    reason
    message
    extraData {
      ...ExtraData
    }
  }`,
  [ExtraDataFragment],
);
export type FeedUnsatisfiedRule = FragmentOf<typeof FeedUnsatisfiedRuleFragment>;

export const FeedUnsatisfiedRulesFragment = graphql(
  `fragment FeedUnsatisfiedRules on FeedUnsatisfiedRules {
    __typename
    required {
      ...FeedUnsatisfiedRule
    }
    anyOf {
      ...FeedUnsatisfiedRule
    }
  }`,
  [FeedUnsatisfiedRuleFragment],
);
export type FeedUnsatisfiedRules = FragmentOf<typeof FeedUnsatisfiedRulesFragment>;

export const FeedOperationValidationFailedFragment = graphql(
  `fragment FeedOperationValidationFailed on FeedOperationValidationFailed {
    __typename
    unsatisfiedRules {
      ...FeedUnsatisfiedRules
    }
    reason
  }`,
  [FeedUnsatisfiedRulesFragment],
);
export type FeedOperationValidationFailed = FragmentOf<
  typeof FeedOperationValidationFailedFragment
>;

//union FeedOperationValidationOutcome = FeedOperationValidationPassed | FeedOperationValidationUnknown | FeedOperationValidationFailed
export const FeedOperationValidationOutcomeFragment = graphql(
  `fragment FeedOperationValidationOutcome on FeedOperationValidationOutcome {
    __typename
    ... on FeedOperationValidationPassed {
      ...FeedOperationValidationPassed
    }
    ... on FeedOperationValidationUnknown {
      ...FeedOperationValidationUnknown
    }
    ... on FeedOperationValidationFailed {
      ...FeedOperationValidationFailed
    }
  }`,
  [
    FeedOperationValidationPassedFragment,
    FeedOperationValidationUnknownFragment,
    FeedOperationValidationFailedFragment,
  ],
);
export type FeedOperationValidationOutcome =
  | FeedOperationValidationPassed
  | FeedOperationValidationUnknown
  | FeedOperationValidationFailed;

export const LoggedInFeedPostOperationsFragment = graphql(
  `fragment LoggedInFeedPostOperations on LoggedInFeedPostOperations {
    __typename
    canPost {
      ...FeedOperationValidationOutcome
    }
  }`,
  [FeedOperationValidationOutcomeFragment],
);
export type LoggedInFeedPostOperations = FragmentOf<typeof LoggedInFeedPostOperationsFragment>;

export const FeedRulesFragment = graphql(
  `fragment FeedRules on FeedRules {
    __typename
    required {
      ...FeedRule
    }
    anyOf {
      ...FeedRule
    }
  }`,
  [FeedRuleFragment],
);
export type FeedRules = FragmentOf<typeof FeedRulesFragment>;

export const FeedFragment = graphql(
  `fragment Feed on Feed {
    __typename
    address
    createdAt
    metadata {
      ...FeedMetadata
    }
    owner
    operations {
      ...LoggedInFeedPostOperations
    }
    rules {
      ...FeedRules
    }
  }`,
  [FeedMetadataFragment, FeedRuleFragment],
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

// TODO: add GroupRulesConfig and GroupOperationsConfig
export const GroupFragment = graphql(
  `fragment Group on Group {
    __typename
    address
    timestamp
    metadata {
      ...GroupMetadata
    }
    owner
  }`,
  [GroupMetadataFragment],
);
export type Group = FragmentOf<typeof GroupFragment>;
