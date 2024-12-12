import type { FragmentOf } from 'gql.tada';
import {
  AccountAvailable,
  AccountBlocked,
  AccountFragment,
  PaginatedResultInfo,
  SelfFundedTransactionRequest,
  SponsoredTransactionRequest,
  TransactionWillFail,
} from '../fragments';
import { type RequestOf, graphql } from '../graphql';

export const AccountQuery = graphql(
  `query Account($request: AccountRequest!) {
    value: account(request: $request) {
      ...Account
    }
  }`,
  [AccountFragment],
);

export type AccountRequest = RequestOf<typeof AccountQuery>;

export const SearchAccountsQuery = graphql(
  `query SearchAccounts($request: AccountSearchRequest!) {
    value: searchAccounts(request: $request) {
      __typename
      items {
        ...Account
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [AccountFragment, PaginatedResultInfo],
);

export type SearchAccountsRequest = RequestOf<typeof SearchAccountsQuery>;

const SetAccountMetadataResponse = graphql(
  `fragment SetAccountMetadataResponse on SetAccountMetadataResponse {
    __typename
    hash
  }`,
);
export type SetAccountMetadataResponse = FragmentOf<typeof SetAccountMetadataResponse>;

const SetAccountMetadataResult = graphql(
  `fragment SetAccountMetadataResult on SetAccountMetadataResult {
    ...on SetAccountMetadataResponse {
      ...SetAccountMetadataResponse
    }

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
    SetAccountMetadataResponse,
    SponsoredTransactionRequest,
    SelfFundedTransactionRequest,
    TransactionWillFail,
  ],
);
export type SetAccountMetadataResult = FragmentOf<typeof SetAccountMetadataResult>;

export const SetAccountMetadataMutation = graphql(
  `mutation SetAccountMetadata($request: SetAccountMetadataRequest!) {
    value: setAccountMetadata(request: $request) {
      ...SetAccountMetadataResult
    }
  }`,
  [SetAccountMetadataResult],
);
export type SetAccountMetadataRequest = RequestOf<typeof SetAccountMetadataMutation>;

const CreateAccountResponse = graphql(
  `fragment CreateAccountResponse on CreateAccountResponse {
    __typename
    hash
  }`,
);
export type CreateAccountResponse = FragmentOf<typeof CreateAccountResponse>;

const CreateAccountWithUsernameResult = graphql(
  `fragment CreateAccountWithUsernameResult on CreateAccountWithUsernameResult {
    ...on CreateAccountResponse {
      ...CreateAccountResponse
    }

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
    CreateAccountResponse,
    SponsoredTransactionRequest,
    SelfFundedTransactionRequest,
    TransactionWillFail,
  ],
);
export type CreateAccountWithUsernameResult = FragmentOf<typeof CreateAccountWithUsernameResult>;

export const CreateAccountWithUsernameMutation = graphql(
  `mutation CreateAccountWithUsername($request: CreateAccountWithUsernameRequest!) {
    value: createAccountWithUsername(request: $request) {
      ...CreateAccountWithUsernameResult
    }
  }`,
  [CreateAccountWithUsernameResult],
);

export type CreateAccountWithUsernameRequest = RequestOf<typeof CreateAccountWithUsernameMutation>;

const AccountFeedsStats = graphql(
  `fragment AccountFeedsStats on AccountFeedsStats {
    __typename
    posts
    comments
    reposts
    quotes
    reacted
    reactions
    collects
  }`,
);
export type AccountFeedsStats = FragmentOf<typeof AccountFeedsStats>;

const AccountGraphsFollowStats = graphql(
  `fragment AccountGraphsFollowStats on AccountGraphsFollowStats {
    __typename
    followers
    following
  }`,
);
export type AccountGraphsFollowStats = FragmentOf<typeof AccountGraphsFollowStats>;

const AccountStats = graphql(
  `fragment AccountStats on AccountStats {
    __typename
    feedStats {
      ...AccountFeedsStats
    }
    graphFollowStats {
      ...AccountGraphsFollowStats
    }
  }`,
  [AccountFeedsStats, AccountGraphsFollowStats],
);
export type AccountStats = FragmentOf<typeof AccountStats>;

export const AccountFeedsStatsQuery = graphql(
  `query AccountFeedsStats($request: AccountFeedsStatsRequest!) {
    value: accountFeedsStats(request: $request) {
      ...AccountFeedsStats
    }
  }`,
  [AccountFeedsStats],
);

export type AccountFeedsStatsRequest = RequestOf<typeof AccountFeedsStatsQuery>;

export const AccountStatsQuery = graphql(
  `query AccountStats($request: AccountStatsRequest!) {
    value: accountStats(request: $request) {
      ...AccountStats
    }
  }`,
  [AccountStats],
);

export type AccountStatsRequest = RequestOf<typeof AccountStatsQuery>;

export const AccountGraphsStatsQuery = graphql(
  `query AccountGraphsStats($request: AccountGraphsStatsRequest!) {
    value: accountGraphsStats(request: $request) {
      ...AccountGraphsFollowStats
    }
  }`,
  [AccountGraphsFollowStats],
);

export type AccountGraphsStatsRequest = RequestOf<typeof AccountGraphsStatsQuery>;

export const AccountsAvailableQuery = graphql(
  `query AccountsAvailable($request: AccountsAvailableRequest!) {
    value: accountsAvailable(request: $request) {
      items{
        ...AccountAvailable
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [AccountAvailable, PaginatedResultInfo],
);

export type AccountsAvailableRequest = RequestOf<typeof AccountsAvailableQuery>;

export const AccountsBlockedQuery = graphql(
  `query AccountsBlocked($request: AccountsBlockedRequest!) {
    value: accountsBlocked(request: $request) {
      items{
        ...AccountBlocked
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [AccountBlocked, PaginatedResultInfo],
);

export type AccountsBlockedRequest = RequestOf<typeof AccountsBlockedQuery>;

export const MuteAccountMutation = graphql(
  `mutation Mute($request: MuteRequest!) {
    value: mute(request: $request)
  }`,
);
export type MuteRequest = RequestOf<typeof MuteAccountMutation>;

export const UnmuteAccountMutation = graphql(
  `mutation Unmute($request: MuteRequest!) {
    value: unmute(request: $request)
  }`,
);
export type UnmuteRequest = RequestOf<typeof UnmuteAccountMutation>;

export const ReportAccountMutation = graphql(
  `mutation ReportAccount($request: ReportAccountRequest!) {
    value: reportAccount(request: $request)
  }`,
);
export type ReportAccountRequest = RequestOf<typeof ReportAccountMutation>;

const BlockError = graphql(
  `fragment BlockError on BlockError {
    __typename
    error
  }`,
);
export type BlockError = FragmentOf<typeof BlockError>;

const BlockResponse = graphql(
  `fragment BlockResponse on BlockResponse {
    __typename
    hash
  }`,
);
export type BlockResponse = FragmentOf<typeof BlockResponse>;

const BlockResult = graphql(
  `fragment BlockResult on BlockResult {
    ...on BlockResponse {
      ...BlockResponse
    }

    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }

    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }

    ...on BlockError {
      ...BlockError
    }
  }`,
  [BlockResponse, SponsoredTransactionRequest, SelfFundedTransactionRequest, BlockError],
);
export type BlockResult = FragmentOf<typeof BlockResult>;

export const BlockMutation = graphql(
  `mutation Block($request: BlockRequest!) {
    value: block(request: $request){
      ...BlockResult
    }
  }`,
  [BlockResult],
);
export type BlockRequest = RequestOf<typeof BlockMutation>;

const UnblockResponse = graphql(
  `fragment UnblockResponse on UnblockResponse {
    __typename
    hash
  }`,
);
export type UnblockResponse = FragmentOf<typeof UnblockResponse>;

const UnblockError = graphql(
  `fragment UnblockError on UnblockError {
    __typename
    error
  }`,
);
export type UnblockError = FragmentOf<typeof UnblockError>;

const UnblockResult = graphql(
  `fragment UnblockResult on UnblockResult {
    ...on UnblockResponse {
      ...UnblockResponse
    }
    ...on SponsoredTransactionRequest {
      ...SponsoredTransactionRequest
    }
    ...on SelfFundedTransactionRequest {
      ...SelfFundedTransactionRequest
    }
    ...on UnblockError {
      ...UnblockError
    }
  }`,
  [UnblockResponse, SponsoredTransactionRequest, SelfFundedTransactionRequest, UnblockError],
);
export type UnblockResult = FragmentOf<typeof UnblockResult>;

export const UnblockMutation = graphql(
  `mutation Unblock($request: UnblockRequest!) {
    value: unblock(request: $request){
      ...UnblockResult
    }
  }`,
  [UnblockResult],
);
export type UnblockRequest = RequestOf<typeof UnblockMutation>;

export const RecommendAccountMutation = graphql(
  `mutation RecommendAccount($request: RecommendAccount!) {
    value: recommendAccount(request: $request)
  }`,
);
export type RecommendAccountRequest = RequestOf<typeof RecommendAccountMutation>;

export const UndoRecommendAccountMutation = graphql(
  `mutation UndoRecommendedAccount($request: UndoRecommendedAccount!) {
    value: undoRecommendedAccount(request: $request)
  }`,
);
export type UndoRecommendAccountRequest = RequestOf<typeof UndoRecommendAccountMutation>;
