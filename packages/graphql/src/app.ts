import type { FragmentOf } from 'gql.tada';
import {
  AccountFragment,
  AppFragment,
  GroupFragment,
  PaginatedResultInfoFragment,
  SelfFundedTransactionRequestFragment,
  SponsoredTransactionRequestFragment,
  TransactionWillFailFragment,
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

const CreateAppResponseFragment = graphql(
  `fragment CreateAppResponse on CreateAppResponse {
    __typename
    hash
  }`,
);
export type CreateAppResponse = FragmentOf<typeof CreateAppResponseFragment>;

const CreateAppResultFragment = graphql(
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
  [CreateAppResponseFragment, SelfFundedTransactionRequestFragment, TransactionWillFailFragment],
);
export type CreateAppResult = FragmentOf<typeof CreateAppResultFragment>;

export const CreateAppMutation = graphql(
  `mutation CreateApp($request: CreateAppRequest!) {
    value: createApp(request: $request) {
      ...CreateAppResult
    }
  }`,
  [CreateAppResultFragment],
);
export type CreateAppRequest = RequestOf<typeof CreateAppMutation>;

const AddAppFeedsResultFragment = graphql(
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
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type AddAppFeedsResult = FragmentOf<typeof AddAppFeedsResultFragment>;

export const AddAppFeedsMutation = graphql(
  `mutation AddAppFeeds($request: AddAppFeedsRequest!) {
    value: addAppFeeds(request: $request) {
      ...AddAppFeedsResult
    }
  }`,
  [AddAppFeedsResultFragment],
);
export type AddAppFeedsRequest = RequestOf<typeof AddAppFeedsMutation>;

const AddAppGroupsResultFragment = graphql(
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
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type AddAppGroupsResult = FragmentOf<typeof AddAppGroupsResultFragment>;

export const AddAppGroupsMutation = graphql(
  `mutation AddAppGroups($request: AddAppGroupsRequest!) {
    value: addAppGroups(request: $request) {
      ...AddAppGroupsResult
    }
  }`,
  [AddAppGroupsResultFragment],
);
export type AddAppGroupsRequest = RequestOf<typeof AddAppGroupsMutation>;

const AddAppSignersResultFragment = graphql(
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
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type AddAppSignersResult = FragmentOf<typeof AddAppSignersResultFragment>;

export const AddAppSignersMutation = graphql(
  `mutation AddAppSigners($request: AddAppSignersRequest!) {
    value: addAppSigners(request: $request) {
      ...AddAppSignersResult
    }
  }`,
  [AddAppSignersResultFragment],
);
export type AddAppSignersRequest = RequestOf<typeof AddAppSignersMutation>;

const RemoveAppFeedsResultFragment = graphql(
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
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type RemoveAppFeedsResult = FragmentOf<typeof RemoveAppFeedsResultFragment>;

export const RemoveAppFeedsMutation = graphql(
  `mutation RemoveAppFeeds($request: RemoveAppFeedsRequest!) {
    value: removeAppFeeds(request: $request) {
      ...RemoveAppFeedsResult
    }
  }`,
  [RemoveAppFeedsResultFragment],
);
export type RemoveAppFeedsRequest = RequestOf<typeof RemoveAppFeedsMutation>;

const RemoveAppGroupsResultFragment = graphql(
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
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type RemoveAppGroupsResult = FragmentOf<typeof RemoveAppGroupsResultFragment>;

export const RemoveAppGroupsMutation = graphql(
  `mutation RemoveAppGroups($request: RemoveAppGroupsRequest!) {
    value: removeAppGroups(request: $request) {
      ...RemoveAppGroupsResult
    }
  }`,
  [RemoveAppGroupsResultFragment],
);
export type RemoveAppGroupsRequest = RequestOf<typeof RemoveAppGroupsMutation>;

const RemoveAppSignersResultFragment = graphql(
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
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type RemoveAppSignersResult = FragmentOf<typeof RemoveAppSignersResultFragment>;

export const RemoveAppSignersMutation = graphql(
  `mutation RemoveAppSigners($request: RemoveAppSignersRequest!) {
    value: removeAppSigners(request: $request) {
      ...RemoveAppSignersResult
    }
  }`,
  [RemoveAppSignersResultFragment],
);
export type RemoveAppSignersRequest = RequestOf<typeof RemoveAppSignersMutation>;

const SetAppGraphResultFragment = graphql(
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
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type SetAppGraphResult = FragmentOf<typeof SetAppGraphResultFragment>;

export const SetAppGraphMutation = graphql(
  `mutation SetAppGraph($request: SetAppGraphRequest!) {
    value: setAppGraph(request: $request) {
      ...SetAppGraphResult
    }
  }`,
  [SetAppGraphResultFragment],
);
export type SetAppGraphRequest = RequestOf<typeof SetAppGraphMutation>;

const SetDefaultAppFeedResultFragment = graphql(
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
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type SetDefaultAppFeedResult = FragmentOf<typeof SetDefaultAppFeedResultFragment>;

export const SetDefaultAppFeedMutation = graphql(
  `mutation SetDefaultAppFeed($request: SetDefaultAppFeedRequest!) {
    value: setDefaultAppFeed(request: $request) {
      ...SetDefaultAppFeedResult
    }
  }`,
  [SetDefaultAppFeedResultFragment],
);
export type SetDefaultAppFeedRequest = RequestOf<typeof SetDefaultAppFeedMutation>;

const SetAppMetadataResultFragment = graphql(
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
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type SetAppMetadataResult = FragmentOf<typeof SetAppMetadataResultFragment>;

export const SetAppMetadataMutation = graphql(
  `mutation SetAppMetadata($request: SetAppMetadataRequest!) {
    value: setAppMetadata(request: $request) {
      ...SetAppMetadataResult
    }
  }`,
  [SetAppMetadataResultFragment],
);
export type SetAppMetadataRequest = RequestOf<typeof SetAppMetadataMutation>;

const SetAppVerificationResultFragment = graphql(
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
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type SetAppVerificationResult = FragmentOf<typeof SetAppVerificationResultFragment>;

export const SetAppVerificationMutation = graphql(
  `mutation SetAppVerification($request: SetAppVerificationRequest!) {
    value: setAppVerification(request: $request) {
      ...SetAppVerificationResult
    }
  }`,
  [SetAppVerificationResultFragment],
);
export type SetAppVerificationRequest = RequestOf<typeof SetAppVerificationMutation>;

const SetAppSponsorshipResultFragment = graphql(
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
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type SetAppSponsorshipResult = FragmentOf<typeof SetAppSponsorshipResultFragment>;

export const SetAppSponsorshipMutation = graphql(
  `mutation SetAppSponsorship($request: SetAppSponsorshipRequest!) {
    value: setAppSponsorship(request: $request) {
      ...SetAppSponsorshipResult
    }
  }`,
  [SetAppSponsorshipResultFragment],
);
export type SetAppSponsorshipRequest = RequestOf<typeof SetAppSponsorshipMutation>;

const SetAppTreasuryResultFragment = graphql(
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
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type SetAppTreasuryResult = FragmentOf<typeof SetAppTreasuryResultFragment>;

export const SetAppTreasuryMutation = graphql(
  `mutation SetAppTreasury($request: SetAppTreasuryRequest!) {
    value: setAppTreasury(request: $request) {
      ...SetAppTreasuryResult
    }
  }`,
  [SetAppTreasuryResultFragment],
);
export type SetAppTreasuryRequest = RequestOf<typeof SetAppTreasuryMutation>;

const SetAppUsernameNamespaceResultFragment = graphql(
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
  [
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type SetAppUsernameNamespaceResult = FragmentOf<
  typeof SetAppUsernameNamespaceResultFragment
>;

export const SetAppUsernameNamespaceMutation = graphql(
  `mutation SetAppUsernameNamespace($request: SetAppUsernameNamespaceRequest!) {
    value: setAppUsernameNamespace(request: $request) {
      ...SetAppUsernameNamespaceResult
    }
  }`,
  [SetAppUsernameNamespaceResultFragment],
);
export type SetAppUsernameNamespaceRequest = RequestOf<typeof SetAppUsernameNamespaceMutation>;

export const AddAppAuthorizationEndpointMutation = graphql(
  `mutation AddAppAuthorizationEndpoint($request: AddAppAuthorizationEndpointRequest!) {
    value: addAppAuthorizationEndpoint(request: $request)
  }`,
);
export type AddAppAuthorizationEndpointRequest = RequestOf<
  typeof AddAppAuthorizationEndpointMutation
>;

export const RemoveAppAuthorizationEndpointMutation = graphql(
  `mutation RemoveAppAuthorizationEndpoint($request: RemoveAppAuthorizationEndpointRequest!) {
    value: removeAppAuthorizationEndpoint(request: $request)
  }`,
);
export type RemoveAppAuthorizationEndpointRequest = RequestOf<
  typeof RemoveAppAuthorizationEndpointMutation
>;

export const GenerateNewAppServerApiKeyMutation = graphql(
  `mutation GenerateNewAppServerApiKey($request: GenerateNewAppServerApiKeyRequest!) {
    value: generateNewAppServerApiKey(request: $request)
  }`,
);
export type GenerateNewAppServerApiKeyRequest = RequestOf<
  typeof GenerateNewAppServerApiKeyMutation
>;

export const AppServerApiKeyQuery = graphql(
  `query AppServerApiKey($request: AppServerApiKeyRequest!) {
    value: appServerApiKey(request: $request)
  }`,
);
export type AppServerApiKeyRequest = RequestOf<typeof AppServerApiKeyQuery>;
