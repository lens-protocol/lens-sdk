import type { FragmentOf } from 'gql.tada';
import {
  AccountFragment,
  AppFragment,
  GroupFragment,
  PaginatedResultInfoFragment,
  SelfFundedTransactionRequest,
  SponsoredTransactionRequest,
  TransactionWillFail,
} from './fragments';
import { type RequestOf, graphql } from './graphql';

export const AppQuery = graphql(
  `query App($request: AppRequest!) {
    value: app(request: $request) {
      ...App
    }
  }`,
  [AppFragment],
);
export type AppRequest = RequestOf<typeof AppQuery>;

export const AppsQuery = graphql(
  `query Apps($request: AppsRequest!) {
    value: apps(request: $request) {
      __typename
      items {
        ...App
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [AppFragment, PaginatedResultInfoFragment],
);
export type AppsRequest = RequestOf<typeof AppsQuery>;

export const AppGroupsQuery = graphql(
  `query AppGroups($request: AppGroupsRequest!) {
    value: appGroups(request: $request) {
      __typename
      items {
        ...Group
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [GroupFragment, PaginatedResultInfoFragment],
);
export type AppGroupsRequest = RequestOf<typeof AppGroupsQuery>;

export const AppSignerFragment = graphql(
  `fragment AppSigner on AppSigner {
    __typename
    signer
    timestamp
  }`,
);
export type AppSigner = FragmentOf<typeof AppSignerFragment>;

export const AppSignersQuery = graphql(
  `query AppSigners($request: AppSignersRequest!) {
    value: appSigners(request: $request) {
      __typename
      items {
        ...AppSigner
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [AppSignerFragment, PaginatedResultInfoFragment],
);
export type AppSignersRequest = RequestOf<typeof AppSignersQuery>;

export const AppFeedFragment = graphql(
  `fragment AppFeed on AppFeed {
    __typename
    feed
    timestamp
  }`,
);
export type AppFeed = FragmentOf<typeof AppFeedFragment>;

export const AppFeedsQuery = graphql(
  `query AppFeeds($request: AppFeedsRequest!) {
    value: appFeeds(request: $request) {
      __typename
      items {
        ...AppFeed
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [AppFeedFragment, PaginatedResultInfoFragment],
);
export type AppFeedsRequest = RequestOf<typeof AppFeedsQuery>;

export const AppUserFragment = graphql(
  `fragment AppUser on AppUser {
    __typename
    account {
      ...Account
    }
    lastActiveOn
    firstLoginOn
  }`,
  [AccountFragment],
);
export type AppUser = FragmentOf<typeof AppUserFragment>;

export const AppUsersQuery = graphql(
  `query AppUsers($request: AppUsersRequest!) {
    value: appUsers(request: $request) {
      __typename
      items {
        ...AppUser
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [AppUserFragment, PaginatedResultInfoFragment],
);
export type AppUsersRequest = RequestOf<typeof AppUsersQuery>;

export const AppServerApiKeyQuery = graphql(
  `query AppServerApiKey($request: AppServerApiKeyRequest!) {
    value: appServerApiKey(request: $request)
  }`,
  [AppFragment],
);
export type AppServerApiKeyRequest = RequestOf<typeof AppServerApiKeyQuery>;

const CreateAppResponse = graphql(
  `fragment CreateAppResponse on CreateAppResponse {
    __typename
    hash
  }`,
);
export type CreateAppResponse = FragmentOf<typeof CreateAppResponse>;

const CreateAppResult = graphql(
  `fragment CreateAppResult on CreateAppResult {
    ...on CreateAppResponse {
      ...CreateAppResponse
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [CreateAppResponse, SelfFundedTransactionRequest, TransactionWillFail],
);
export type CreateAppResult = FragmentOf<typeof CreateAppResult>;

export const CreateAppMutation = graphql(
  `mutation CreateApp($request: CreateAppRequest!) {
    value: createApp(request: $request) {
      ...CreateAppResult
    }
  }`,
  [CreateAppResult],
);
export type CreateAppRequest = RequestOf<typeof CreateAppMutation>;

const AddAppFeedsResult = graphql(
  `fragment AddAppFeedsResult on AddAppFeedsResult {
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [SponsoredTransactionRequest, SelfFundedTransactionRequest, TransactionWillFail],
);
export type AddAppFeedsResult = FragmentOf<typeof AddAppFeedsResult>;

export const AddAppFeedsMutation = graphql(
  `mutation AddAppFeeds($request: AddAppFeedsRequest!) {
    value: addAppFeeds(request: $request) {
      ...AddAppFeedsResult
    }
  }`,
  [AddAppFeedsResult],
);
export type AddAppFeedsRequest = RequestOf<typeof AddAppFeedsMutation>;

const AddAppGroupsResult = graphql(
  `fragment AddAppGroupsResult on AddAppGroupsResult {
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [SponsoredTransactionRequest, SelfFundedTransactionRequest, TransactionWillFail],
);
export type AddAppGroupsResult = FragmentOf<typeof AddAppGroupsResult>;

export const AddAppGroupsMutation = graphql(
  `mutation AddAppGroups($request: AddAppGroupsRequest!) {
    value: addAppGroups(request: $request) {
      ...AddAppGroupsResult
    }
  }`,
  [AddAppGroupsResult],
);
export type AddAppGroupsRequest = RequestOf<typeof AddAppGroupsMutation>;

const AddAppSignersResult = graphql(
  `fragment AddAppSignersResult on AddAppSignersResult {
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [SponsoredTransactionRequest, SelfFundedTransactionRequest, TransactionWillFail],
);
export type AddAppSignersResult = FragmentOf<typeof AddAppSignersResult>;

export const AddAppSignersMutation = graphql(
  `mutation AddAppSigners($request: AddAppSignersRequest!) {
    value: addAppSigners(request: $request) {
      ...AddAppSignersResult
    }
  }`,
  [AddAppSignersResult],
);
export type AddAppSignersRequest = RequestOf<typeof AddAppSignersMutation>;

const RemoveAppFeedsResult = graphql(
  `fragment RemoveAppFeedsResult on RemoveAppFeedsResult {
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [SponsoredTransactionRequest, SelfFundedTransactionRequest, TransactionWillFail],
);
export type RemoveAppFeedsResult = FragmentOf<typeof RemoveAppFeedsResult>;

export const RemoveAppFeedsMutation = graphql(
  `mutation RemoveAppFeeds($request: RemoveAppFeedsRequest!) {
    value: removeAppFeeds(request: $request) {
      ...RemoveAppFeedsResult
    }
  }`,
  [RemoveAppFeedsResult],
);
export type RemoveAppFeedsRequest = RequestOf<typeof RemoveAppFeedsMutation>;

const RemoveAppGroupsResult = graphql(
  `fragment RemoveAppGroupsResult on RemoveAppGroupsResult {
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [SponsoredTransactionRequest, SelfFundedTransactionRequest, TransactionWillFail],
);
export type RemoveAppGroupsResult = FragmentOf<typeof RemoveAppGroupsResult>;

export const RemoveAppGroupsMutation = graphql(
  `mutation RemoveAppGroups($request: RemoveAppGroupsRequest!) {
    value: removeAppGroups(request: $request) {
      ...RemoveAppGroupsResult
    }
  }`,
  [RemoveAppGroupsResult],
);
export type RemoveAppGroupsRequest = RequestOf<typeof RemoveAppGroupsMutation>;

const RemoveAppSignersResult = graphql(
  `fragment RemoveAppSignersResult on RemoveAppSignersResult {
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [SponsoredTransactionRequest, SelfFundedTransactionRequest, TransactionWillFail],
);
export type RemoveAppSignersResult = FragmentOf<typeof RemoveAppSignersResult>;

export const RemoveAppSignersMutation = graphql(
  `mutation RemoveAppSigners($request: RemoveAppSignersRequest!) {
    value: removeAppSigners(request: $request) {
      ...RemoveAppSignersResult
    }
  }`,
  [RemoveAppSignersResult],
);
export type RemoveAppSignersRequest = RequestOf<typeof RemoveAppSignersMutation>;

const SetAppGraphResult = graphql(
  `fragment SetAppGraphResult on SetAppGraphResult {
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [SponsoredTransactionRequest, SelfFundedTransactionRequest, TransactionWillFail],
);
export type SetAppGraphResult = FragmentOf<typeof SetAppGraphResult>;

export const SetAppGraphMutation = graphql(
  `mutation SetAppGraph($request: SetAppGraphRequest!) {
    value: setAppGraph(request: $request) {
      ...SetAppGraphResult
    }
  }`,
  [SetAppGraphResult],
);
export type SetAppGraphRequest = RequestOf<typeof SetAppGraphMutation>;

const SetDefaultAppFeedResult = graphql(
  `fragment SetDefaultAppFeedResult on SetDefaultAppFeedResult {
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [SponsoredTransactionRequest, SelfFundedTransactionRequest, TransactionWillFail],
);
export type SetDefaultAppFeedResult = FragmentOf<typeof SetDefaultAppFeedResult>;

export const SetDefaultAppFeedMutation = graphql(
  `mutation SetDefaultAppFeed($request: SetDefaultAppFeedRequest!) {
    value: setDefaultAppFeed(request: $request) {
      ...SetDefaultAppFeedResult
    }
  }`,
  [SetDefaultAppFeedResult],
);
export type SetDefaultAppFeedRequest = RequestOf<typeof SetDefaultAppFeedMutation>;

const SetAppMetadataResult = graphql(
  `fragment SetAppMetadataResult on SetAppMetadataResult {
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [SponsoredTransactionRequest, SelfFundedTransactionRequest, TransactionWillFail],
);
export type SetAppMetadataResult = FragmentOf<typeof SetAppMetadataResult>;

export const SetAppMetadataMutation = graphql(
  `mutation SetAppMetadata($request: SetAppMetadataRequest!) {
    value: setAppMetadata(request: $request) {
      ...SetAppMetadataResult
    }
  }`,
  [SetAppMetadataResult],
);
export type SetAppMetadataRequest = RequestOf<typeof SetAppMetadataMutation>;

const SetAppVerificationResult = graphql(
  `fragment SetAppVerificationResult on SetAppVerificationResult {
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [SponsoredTransactionRequest, SelfFundedTransactionRequest, TransactionWillFail],
);
export type SetAppVerificationResult = FragmentOf<typeof SetAppVerificationResult>;

export const SetAppVerificationMutation = graphql(
  `mutation SetAppVerification($request: SetAppVerificationRequest!) {
    value: setAppVerification(request: $request) {
      ...SetAppVerificationResult
    }
  }`,
  [SetAppVerificationResult],
);
export type SetAppVerificationRequest = RequestOf<typeof SetAppVerificationMutation>;

const SetAppSponsorshipResult = graphql(
  `fragment SetAppSponsorshipResult on SetAppSponsorshipResult {
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [SponsoredTransactionRequest, SelfFundedTransactionRequest, TransactionWillFail],
);
export type SetAppSponsorshipResult = FragmentOf<typeof SetAppSponsorshipResult>;

export const SetAppSponsorshipMutation = graphql(
  `mutation SetAppSponsorship($request: SetAppSponsorshipRequest!) {
    value: setAppSponsorship(request: $request) {
      ...SetAppSponsorshipResult
    }
  }`,
  [SetAppSponsorshipResult],
);
export type SetAppSponsorshipRequest = RequestOf<typeof SetAppSponsorshipMutation>;

const SetAppTreasuryResult = graphql(
  `fragment SetAppTreasuryResult on SetAppTreasuryResult {
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [SponsoredTransactionRequest, SelfFundedTransactionRequest, TransactionWillFail],
);
export type SetAppTreasuryResult = FragmentOf<typeof SetAppTreasuryResult>;

export const SetAppTreasuryMutation = graphql(
  `mutation SetAppTreasury($request: SetAppTreasuryRequest!) {
    value: setAppTreasury(request: $request) {
      ...SetAppTreasuryResult
    }
  }`,
  [SetAppTreasuryResult],
);
export type SetAppTreasuryRequest = RequestOf<typeof SetAppTreasuryMutation>;

const SetAppUsernameNamespaceResult = graphql(
  `fragment SetAppUsernameNamespaceResult on SetAppUsernameNamespaceResult {
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [SponsoredTransactionRequest, SelfFundedTransactionRequest, TransactionWillFail],
);
export type SetAppUsernameNamespaceResult = FragmentOf<typeof SetAppUsernameNamespaceResult>;

export const SetAppUsernameNamespaceMutation = graphql(
  `mutation SetAppUsernameNamespace($request: SetAppUsernameNamespaceRequest!) {
    value: setAppUsernameNamespace(request: $request) {
      ...SetAppUsernameNamespaceResult
    }
  }`,
  [SetAppUsernameNamespaceResult],
);
export type SetAppUsernameNamespaceRequest = RequestOf<typeof SetAppUsernameNamespaceMutation>;
