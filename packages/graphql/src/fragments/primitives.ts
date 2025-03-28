import type { FragmentOf } from 'gql.tada';
import { type FragmentDocumentFor, graphql } from '../graphql';
import { AnyKeyValueFragment } from './common';

export const AppMetadataFragment = graphql(
  `fragment AppMetadata on AppMetadata {
    __typename
    description
    developer
    logo
    name
    platforms
    privacyPolicy
    tagline
    termsOfService
    url
  }`,
);
export interface AppMetadata extends FragmentOf<typeof AppMetadataFragment> {}

export const AppFragment = graphql(
  `fragment App on App {
    __typename
    address
    createdAt
    defaultFeedAddress
    graphAddress
    namespaceAddress
    owner
    sponsorshipAddress
    treasuryAddress
    verificationEnabled
    hasAuthorizationEndpoint
    metadata {
      ...AppMetadata
    }
  }`,
  [AppMetadataFragment],
);
export interface App extends FragmentOf<typeof AppFragment> {}

export const FeedMetadataFragment = graphql(
  `fragment FeedMetadata on FeedMetadata {
    __typename
    description
    id
    name
  }`,
);
export interface FeedMetadata extends FragmentOf<typeof FeedMetadataFragment> {}

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
      executesOn
      config {
        ...AnyKeyValue
      }
    }`,
  [AnyKeyValueFragment],
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
    config {
      ...AnyKeyValue
    }
  }`,
  [AnyKeyValueFragment],
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

export type FeedOperationValidationOutcome =
  | FeedOperationValidationPassed
  | FeedOperationValidationUnknown
  | FeedOperationValidationFailed;

export const FeedOperationValidationOutcomeFragment: FragmentDocumentFor<
  FeedOperationValidationOutcome,
  'FeedOperationValidationOutcome'
> = graphql(
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

export const LoggedInFeedPostOperationsFragment = graphql(
  `fragment LoggedInFeedPostOperations on LoggedInFeedPostOperations {
    __typename
    id
    canPost {
      ...FeedOperationValidationOutcome
    }
  }`,
  [FeedOperationValidationOutcomeFragment],
);
export interface LoggedInFeedPostOperations
  extends FragmentOf<typeof LoggedInFeedPostOperationsFragment> {}

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
  [FeedMetadataFragment, LoggedInFeedPostOperationsFragment, FeedRulesFragment],
);
export interface Feed extends FragmentOf<typeof FeedFragment> {}

export const GraphMetadataFragment = graphql(
  `fragment GraphMetadata on GraphMetadata {
      __typename
      description
      id
      name
  }`,
);
export interface GraphMetadata extends FragmentOf<typeof GraphMetadataFragment> {}

export const GraphRuleFragment = graphql(
  `fragment GraphRule on GraphRule {
    __typename
    id
    type
    address
    executesOn
    config {
      ...AnyKeyValue
    }
  }`,
  [AnyKeyValueFragment],
);
export type GraphRule = FragmentOf<typeof GraphRuleFragment>;

export const GraphRulesFragment = graphql(
  `fragment GraphRules on GraphRules {
    __typename
    required {
      ...GraphRule
    }
    anyOf {
      ...GraphRule
    }
  }`,
  [GraphRuleFragment],
);
export type GraphRules = FragmentOf<typeof GraphRulesFragment>;

export const GraphFragment = graphql(
  `fragment Graph on Graph {
    __typename
    address
    createdAt
    owner
    metadata {
      ...GraphMetadata
    }
    rules {
      ...GraphRules
    }
  }`,
  [GraphMetadataFragment, GraphRulesFragment],
);
export interface Graph extends FragmentOf<typeof GraphFragment> {}

export const UsernameNamespaceMetadataFragment = graphql(
  `fragment UsernameNamespaceMetadata on UsernameNamespaceMetadata {
      __typename
      description
      id
  }`,
);
export type UsernameNamespaceMetadata = FragmentOf<typeof UsernameNamespaceMetadataFragment>;

export const NamespaceRuleFragment = graphql(
  `fragment NamespaceRule on NamespaceRule {
    __typename
    id
    type
    address
    executesOn
    config {
      ...AnyKeyValue
    }
  }`,
  [AnyKeyValueFragment],
);
export interface NamespaceRule extends FragmentOf<typeof NamespaceRuleFragment> {}

export const NamespaceRulesFragment = graphql(
  `fragment NamespaceRules on NamespaceRules {
    __typename
    required {
      ...NamespaceRule
    }
    anyOf {
      ...NamespaceRule
    }
  }`,
  [NamespaceRuleFragment],
);
export type NamespaceRules = FragmentOf<typeof NamespaceRulesFragment>;

export const NamespaceUnsatisfiedRuleFragment = graphql(
  `fragment NamespaceUnsatisfiedRule on NamespaceUnsatisfiedRule {
    __typename
    rule
    reason
    message
    config {
      ...AnyKeyValue
    }
  }`,
  [AnyKeyValueFragment],
);
export type NamespaceUnsatisfiedRule = FragmentOf<typeof NamespaceUnsatisfiedRuleFragment>;

export const NamespaceOperationValidationPassedFragment = graphql(
  `fragment NamespaceOperationValidationPassed on NamespaceOperationValidationPassed {
    __typename
  }`,
);
export type NamespaceOperationValidationPassed = FragmentOf<
  typeof NamespaceOperationValidationPassedFragment
>;

export const NamespaceOperationValidationUnknownFragment = graphql(
  `fragment NamespaceOperationValidationUnknown on NamespaceOperationValidationUnknown {
    __typename
    extraChecksRequired {
      ...NamespaceRule
    }
  }`,
  [NamespaceRuleFragment],
);
export type NamespaceOperationValidationUnknown = FragmentOf<
  typeof NamespaceOperationValidationUnknownFragment
>;

export const NamespaceUnsatisfiedRulesFragment = graphql(
  `fragment NamespaceUnsatisfiedRules on NamespaceUnsatisfiedRules {
    required {
      ...NamespaceUnsatisfiedRule
    }
    anyOf {
      ...NamespaceUnsatisfiedRule
    }
  }`,
  [NamespaceUnsatisfiedRuleFragment],
);
export type NamespaceUnsatisfiedRules = FragmentOf<typeof NamespaceUnsatisfiedRulesFragment>;

export const NamespaceOperationValidationFailedFragment = graphql(
  `fragment NamespaceOperationValidationFailed on NamespaceOperationValidationFailed {
    __typename
    unsatisfiedRules {
      ...NamespaceUnsatisfiedRules
    }
    reason
  }`,
  [NamespaceUnsatisfiedRulesFragment],
);
export type NamespaceOperationValidationFailed = FragmentOf<
  typeof NamespaceOperationValidationFailedFragment
>;

export type NamespaceOperationValidationOutcome =
  | NamespaceOperationValidationPassed
  | NamespaceOperationValidationUnknown
  | NamespaceOperationValidationFailed;

export const NamespaceOperationValidationOutcomeFragment: FragmentDocumentFor<
  NamespaceOperationValidationOutcome,
  'NamespaceOperationValidationOutcome'
> = graphql(
  `fragment NamespaceOperationValidationOutcome on NamespaceOperationValidationOutcome {
    __typename
    ... on NamespaceOperationValidationPassed {
      ...NamespaceOperationValidationPassed
    }
    ... on NamespaceOperationValidationUnknown {
      ...NamespaceOperationValidationUnknown
    }
    ... on NamespaceOperationValidationFailed {
      ...NamespaceOperationValidationFailed
    }
  }`,
  [
    NamespaceOperationValidationPassedFragment,
    NamespaceOperationValidationUnknownFragment,
    NamespaceOperationValidationFailedFragment,
  ],
);

export const LoggedInUsernameNamespaceOperationsFragment = graphql(
  `fragment LoggedInUsernameNamespaceOperations on LoggedInUsernameNamespaceOperations {
    __typename
    id
    canCreate {
      ...NamespaceOperationValidationOutcome
    }
  }`,
  [NamespaceOperationValidationOutcomeFragment],
);
export interface LoggedInUsernameNamespaceOperations
  extends FragmentOf<typeof LoggedInUsernameNamespaceOperationsFragment> {}

const UsernameNamespaceStatsFragment = graphql(
  `fragment UsernameNamespaceStats on UsernameNamespaceStats {
    __typename
    totalUsernames
  }`,
);
export type UsernameNamespaceStats = FragmentOf<typeof UsernameNamespaceStatsFragment>;

const UsernameNamespaceMetadataStandardFragment = graphql(
  `fragment UsernameNamespaceMetadataStandard on UsernameNamespaceMetadataStandard {
    __typename
    bannerImage
    collaborators
    description
    externalLink
    featuredImage
    image
    name
    schema
    symbol
  }`,
);
export interface UsernameNamespaceMetadataStandard
  extends FragmentOf<typeof UsernameNamespaceMetadataStandardFragment> {}

export const UsernameNamespaceFragment = graphql(
  `fragment UsernameNamespace on UsernameNamespace {
    __typename
    address
    namespace
    createdAt
    metadata {
      ...UsernameNamespaceMetadata
    }
    collectionMetadata {
      ...UsernameNamespaceMetadataStandard
    }
    owner
    rules {
      ...NamespaceRules
    }
    operations {
      ...LoggedInUsernameNamespaceOperations
    }
    stats {
      ...UsernameNamespaceStats
    }
  }`,
  [
    UsernameNamespaceMetadataFragment,
    UsernameNamespaceMetadataStandardFragment,
    NamespaceRulesFragment,
    LoggedInUsernameNamespaceOperationsFragment,
    UsernameNamespaceStatsFragment,
  ],
);
export interface UsernameNamespace extends FragmentOf<typeof UsernameNamespaceFragment> {}

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
export interface GroupMetadata extends FragmentOf<typeof GroupMetadataFragment> {}

export const GroupRuleFragment = graphql(
  `fragment GroupRule on GroupRule {
    __typename
    id
    type
    address
    executesOn
    config {
      ...AnyKeyValue
    }
  }`,
  [AnyKeyValueFragment],
);
export type GroupRule = FragmentOf<typeof GroupRuleFragment>;

export const GroupRulesFragment = graphql(
  `fragment GroupRules on GroupRules {
    __typename
    required {
      ...GroupRule
    }
    anyOf {
      ...GroupRule
    }
  }`,
  [GroupRuleFragment],
);
export type GroupRules = FragmentOf<typeof GroupRulesFragment>;

export const GroupOperationValidationPassedFragment = graphql(
  `fragment GroupOperationValidationPassed on GroupOperationValidationPassed {
    __typename
  }`,
);
export type GroupOperationValidationPassed = FragmentOf<
  typeof GroupOperationValidationPassedFragment
>;

export const GroupOperationValidationUnknownFragment = graphql(
  `fragment GroupOperationValidationUnknown on GroupOperationValidationUnknown {
    __typename
    extraChecksRequired {
      ...GroupRule
    }
  }`,
  [GroupRuleFragment],
);
export type GroupOperationValidationUnknown = FragmentOf<
  typeof GroupOperationValidationUnknownFragment
>;

export const GroupUnsatisfiedRuleFragment = graphql(
  `fragment GroupUnsatisfiedRule on GroupUnsatisfiedRule {
    __typename
    rule
    reason
    message
    config {
      ...AnyKeyValue
    }
  }`,
  [AnyKeyValueFragment],
);
export type GroupUnsatisfiedRule = FragmentOf<typeof GroupUnsatisfiedRuleFragment>;

export const GroupUnsatisfiedRulesFragment = graphql(
  `fragment GroupUnsatisfiedRules on GroupUnsatisfiedRules {
    __typename
    required {
      ...GroupUnsatisfiedRule
    }
    anyOf {
      ...GroupUnsatisfiedRule
    }
  }`,
  [GroupUnsatisfiedRuleFragment],
);
export type GroupUnsatisfiedRules = FragmentOf<typeof GroupUnsatisfiedRulesFragment>;

export const GroupOperationValidationFailedFragment = graphql(
  `fragment GroupOperationValidationFailed on GroupOperationValidationFailed {
    __typename
    unsatisfiedRules {
      ...GroupUnsatisfiedRules
    }
    reason
  }`,
  [GroupUnsatisfiedRulesFragment],
);
export type GroupOperationValidationFailed = FragmentOf<
  typeof GroupOperationValidationFailedFragment
>;

export type GroupOperationValidationOutcome =
  | GroupOperationValidationPassed
  | GroupOperationValidationUnknown
  | GroupOperationValidationFailed;

export const GroupOperationValidationOutcomeFragment: FragmentDocumentFor<
  GroupOperationValidationOutcome,
  'GroupOperationValidationOutcome'
> = graphql(
  `fragment GroupOperationValidationOutcome on GroupOperationValidationOutcome {
    __typename
    ... on GroupOperationValidationPassed {
      ...GroupOperationValidationPassed
    }
    ... on GroupOperationValidationUnknown {
      ...GroupOperationValidationUnknown
    }
    ... on GroupOperationValidationFailed {
      ...GroupOperationValidationFailed
    }
  }`,
  [
    GroupOperationValidationPassedFragment,
    GroupOperationValidationUnknownFragment,
    GroupOperationValidationFailedFragment,
  ],
);

export const LoggedInGroupOperationsFragment = graphql(
  `fragment LoggedInGroupOperations on LoggedInGroupOperations {
    __typename
    id
    canJoin {
      ...GroupOperationValidationOutcome
    }
    canLeave {
      ...GroupOperationValidationOutcome
    }
    canAddMember {
      ...GroupOperationValidationOutcome
    }
    canRemoveMember {
      ...GroupOperationValidationOutcome
    }
    isMember
    isBanned
  }`,
  [GroupOperationValidationOutcomeFragment],
);
export interface LoggedInGroupOperations
  extends FragmentOf<typeof LoggedInGroupOperationsFragment> {}

export const GroupFragment = graphql(
  `fragment Group on Group {
    __typename
    address
    feed {
      ...Feed
    }
    timestamp
    owner
    banningEnabled
    membershipApprovalEnabled
    metadata {
      ...GroupMetadata
    }
    rules {
      ...GroupRules
    }
    operations {
      ...LoggedInGroupOperations
    }
  }`,
  [FeedFragment, GroupMetadataFragment, GroupRulesFragment, LoggedInGroupOperationsFragment],
);
export interface Group extends FragmentOf<typeof GroupFragment> {}
