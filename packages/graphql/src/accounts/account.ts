import type { FragmentOf } from 'gql.tada';
import {
  AccountAvailableFragment,
  AccountBlockedFragment,
  AccountFragment,
  PaginatedResultInfoFragment,
  SelfFundedTransactionRequestFragment,
  SponsoredTransactionRequestFragment,
  TransactionWillFailFragment,
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

export const AccountsQuery = graphql(
  `query Accounts($request: AccountsRequest!) {
    value: accounts(request: $request) {
      __typename
      items{
        ...Account
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [AccountFragment, PaginatedResultInfoFragment],
);
export type AccountsRequest = RequestOf<typeof AccountsQuery>;

export const AccountsBulkQuery = graphql(
  `query AccountsBulk($request: AccountsBulkRequest!) {
    value: accountsBulk(request: $request) {
      ...Account
    }
  }`,
  [AccountFragment],
);
export type AccountsBulkRequest = RequestOf<typeof AccountsBulkQuery>;

const SetAccountMetadataResponseFragment = graphql(
  `fragment SetAccountMetadataResponse on SetAccountMetadataResponse {
    __typename
    hash
  }`,
);
export type SetAccountMetadataResponse = FragmentOf<typeof SetAccountMetadataResponseFragment>;

const SetAccountMetadataResultFragment = graphql(
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
    SetAccountMetadataResponseFragment,
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type SetAccountMetadataResult = FragmentOf<typeof SetAccountMetadataResultFragment>;

export const SetAccountMetadataMutation = graphql(
  `mutation SetAccountMetadata($request: SetAccountMetadataRequest!) {
    value: setAccountMetadata(request: $request) {
      ...SetAccountMetadataResult
    }
  }`,
  [SetAccountMetadataResultFragment],
);
export type SetAccountMetadataRequest = RequestOf<typeof SetAccountMetadataMutation>;

const CreateAccountResponseFragment = graphql(
  `fragment CreateAccountResponse on CreateAccountResponse {
    __typename
    hash
  }`,
);
export type CreateAccountResponse = FragmentOf<typeof CreateAccountResponseFragment>;

const InvalidUsernameFragment = graphql(
  `fragment InvalidUsername on InvalidUsername {
    __typename
    reason
  }`,
);
export type InvalidUsername = FragmentOf<typeof InvalidUsernameFragment>;

const CreateAccountWithUsernameResultFragment = graphql(
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

    ...on InvalidUsername {
      ...InvalidUsername
    }

    ...on TransactionWillFail {
      ...TransactionWillFail
    }
  }`,
  [
    CreateAccountResponseFragment,
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    InvalidUsernameFragment,
    TransactionWillFailFragment,
  ],
);
export type CreateAccountWithUsernameResult = FragmentOf<
  typeof CreateAccountWithUsernameResultFragment
>;

export const CreateAccountWithUsernameMutation = graphql(
  `mutation CreateAccountWithUsername($request: CreateAccountWithUsernameRequest!) {
    value: createAccountWithUsername(request: $request) {
      ...CreateAccountWithUsernameResult
    }
  }`,
  [CreateAccountWithUsernameResultFragment],
);

export type CreateAccountWithUsernameRequest = RequestOf<typeof CreateAccountWithUsernameMutation>;

const AccountFeedsStatsFragment = graphql(
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
export type AccountFeedsStats = FragmentOf<typeof AccountFeedsStatsFragment>;

const AccountGraphsFollowStatsFragment = graphql(
  `fragment AccountGraphsFollowStats on AccountGraphsFollowStats {
    __typename
    followers
    following
  }`,
);
export type AccountGraphsFollowStats = FragmentOf<typeof AccountGraphsFollowStatsFragment>;

const AccountStatsFragment = graphql(
  `fragment AccountStats on AccountStats {
    __typename
    feedStats {
      ...AccountFeedsStats
    }
    graphFollowStats {
      ...AccountGraphsFollowStats
    }
  }`,
  [AccountFeedsStatsFragment, AccountGraphsFollowStatsFragment],
);
export type AccountStats = FragmentOf<typeof AccountStatsFragment>;

export const AccountFeedsStatsQuery = graphql(
  `query AccountFeedsStats($request: AccountFeedsStatsRequest!) {
    value: accountFeedsStats(request: $request) {
      ...AccountFeedsStats
    }
  }`,
  [AccountFeedsStatsFragment],
);
export type AccountFeedsStatsRequest = RequestOf<typeof AccountFeedsStatsQuery>;

export const AccountStatsQuery = graphql(
  `query AccountStats($request: AccountStatsRequest!) {
    value: accountStats(request: $request) {
      ...AccountStats
    }
  }`,
  [AccountStatsFragment],
);
export type AccountStatsRequest = RequestOf<typeof AccountStatsQuery>;

export const AccountGraphsStatsQuery = graphql(
  `query AccountGraphsStats($request: AccountGraphsStatsRequest!) {
    value: accountGraphsStats(request: $request) {
      ...AccountGraphsFollowStats
    }
  }`,
  [AccountGraphsFollowStatsFragment],
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
  [AccountAvailableFragment, PaginatedResultInfoFragment],
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
  [AccountBlockedFragment, PaginatedResultInfoFragment],
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

const BlockErrorFragment = graphql(
  `fragment BlockError on BlockError {
    __typename
    error
  }`,
);
export type BlockError = FragmentOf<typeof BlockErrorFragment>;

const BlockResponseFragment = graphql(
  `fragment BlockResponse on BlockResponse {
    __typename
    hash
  }`,
);
export type BlockResponse = FragmentOf<typeof BlockResponseFragment>;

const BlockResultFragment = graphql(
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
  [
    BlockResponseFragment,
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    BlockErrorFragment,
  ],
);
export type BlockResult = FragmentOf<typeof BlockResultFragment>;

export const BlockMutation = graphql(
  `mutation Block($request: BlockRequest!) {
    value: block(request: $request){
      ...BlockResult
    }
  }`,
  [BlockResultFragment],
);
export type BlockRequest = RequestOf<typeof BlockMutation>;

const UnblockResponseFragment = graphql(
  `fragment UnblockResponse on UnblockResponse {
    __typename
    hash
  }`,
);
export type UnblockResponse = FragmentOf<typeof UnblockResponseFragment>;

const UnblockErrorFragment = graphql(
  `fragment UnblockError on UnblockError {
    __typename
    error
  }`,
);
export type UnblockError = FragmentOf<typeof UnblockErrorFragment>;

const UnblockResultFragment = graphql(
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
  [
    UnblockResponseFragment,
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    UnblockErrorFragment,
  ],
);
export type UnblockResult = FragmentOf<typeof UnblockResultFragment>;

export const UnblockMutation = graphql(
  `mutation Unblock($request: UnblockRequest!) {
    value: unblock(request: $request){
      ...UnblockResult
    }
  }`,
  [UnblockResultFragment],
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

const UpdateAccountFollowRulesResponseFragment = graphql(
  `fragment UpdateAccountFollowRulesResponse on UpdateAccountFollowRulesResponse {
    __typename
    hash
  }`,
);
export type UpdateAccountFollowRulesResponse = FragmentOf<
  typeof UpdateAccountFollowRulesResponseFragment
>;

const UpdateAccountFollowRulesResultFragment = graphql(
  `fragment UpdateAccountFollowRulesResult on UpdateAccountFollowRulesResult {
    ...on UpdateAccountFollowRulesResponse {
      ...UpdateAccountFollowRulesResponse
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
    UpdateAccountFollowRulesResponseFragment,
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type UpdateAccountFollowRulesResult = FragmentOf<
  typeof UpdateAccountFollowRulesResultFragment
>;

export const UpdateAccountFollowRulesMutation = graphql(
  `mutation UpdateAccountFollowRules($request: UpdateAccountFollowRulesRequest!) {
    value: updateAccountFollowRules(request: $request){
      ...UpdateAccountFollowRulesResult
    }
  }`,
  [UpdateAccountFollowRulesResultFragment],
);
export type UpdateAccountFollowRulesRequest = RequestOf<typeof UpdateAccountFollowRulesMutation>;
