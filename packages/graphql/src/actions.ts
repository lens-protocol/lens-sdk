import type { FragmentOf } from 'gql.tada';
import {
  SelfFundedTransactionRequestFragment,
  SponsoredTransactionRequestFragment,
  TransactionWillFailFragment,
} from './fragments';
import { type RequestOf, graphql } from './graphql';
import { InsufficientFundsFragment } from './funds';

export const ConfigurePostActionResponseFragment = graphql(
  `fragment ConfigurePostActionResponse on ConfigurePostActionResponse {
    __typename
    hash
  }`,
);

export type ConfigurePostActionResponse = FragmentOf<typeof ConfigurePostActionResponseFragment>;

export const ConfigurePostActionResultFragment = graphql(
  `fragment ConfigurePostActionResult on ConfigurePostActionResult {
    ...on ConfigurePostActionResponse {
      ...ConfigurePostActionResponse
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
    ConfigurePostActionResponseFragment,
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type ConfigurePostActionResult = FragmentOf<typeof ConfigurePostActionResultFragment>;

export const ConfigurePostActionMutation = graphql(
  `mutation ConfigurePostAction($request: ConfigurePostActionRequest!) {
    value: configurePostAction(request: $request) {
      ...ConfigurePostActionResult
    }
  }`,
  [ConfigurePostActionResultFragment],
);
export type ConfigurePostActionRequest = RequestOf<typeof ConfigurePostActionMutation>;

export const DisablePostActionResponseFragment = graphql(
  `fragment DisablePostActionResponse on DisablePostActionResponse {
    __typename
    hash
  }`,
);

export type DisablePostActionResponse = FragmentOf<typeof DisablePostActionResponseFragment>;

export const DisablePostActionResultFragment = graphql(
  `fragment DisablePostActionResult on DisablePostActionResult {
    ...on DisablePostActionResponse {
      ...DisablePostActionResponse
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
    DisablePostActionResponseFragment,
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type DisablePostActionResult = FragmentOf<typeof DisablePostActionResultFragment>;

export const DisablePostActionMutation = graphql(
  `mutation DisablePostAction($request: DisablePostActionRequest!) {
    value: disablePostAction(request: $request) {
      ...DisablePostActionResult
    }
  }`,
  [DisablePostActionResultFragment],
);
export type DisablePostActionRequest = RequestOf<typeof DisablePostActionMutation>;

export const EnablePostActionResponseFragment = graphql(
  `fragment EnablePostActionResponse on EnablePostActionResponse {
    __typename
    hash
  }`,
);

export type EnablePostActionResponse = FragmentOf<typeof EnablePostActionResponseFragment>;

export const EnablePostActionResultFragment = graphql(
  `fragment EnablePostActionResult on EnablePostActionResult {
    ...on EnablePostActionResponse {
      ...EnablePostActionResponse
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
    EnablePostActionResponseFragment,
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type EnablePostActionResult = FragmentOf<typeof EnablePostActionResultFragment>;

export const EnablePostActionMutation = graphql(
  `mutation EnablePostAction($request: EnablePostActionRequest!) {
    value: enablePostAction(request: $request) {
      ...EnablePostActionResult
    }
  }`,
  [EnablePostActionResultFragment],
);
export type EnablePostActionRequest = RequestOf<typeof EnablePostActionMutation>;

export const ExecutePostActionResponseFragment = graphql(
  `fragment ExecutePostActionResponse on ExecutePostActionResponse {
    __typename
    hash
  }`,
);

export type ExecutePostActionResponse = FragmentOf<typeof ExecutePostActionResponseFragment>;

export const ExecutePostActionResultFragment = graphql(
  `fragment ExecutePostActionResult on ExecutePostActionResult {
    ...on ExecutePostActionResponse {
      ...ExecutePostActionResponse
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
    ...on InsufficientFunds {
      ...InsufficientFunds
    }
  }`,
  [
    ExecutePostActionResponseFragment,
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
    InsufficientFundsFragment,
  ],
);
export type ExecutePostActionResult = FragmentOf<typeof ExecutePostActionResultFragment>;

export const ExecutePostActionMutation = graphql(
  `mutation ExecutePostAction($request: ExecutePostActionRequest!) {
    value: executePostAction(request: $request) {
      ...ExecutePostActionResult
    }
  }`,
  [ExecutePostActionResultFragment],
);
export type ExecutePostActionRequest = RequestOf<typeof ExecutePostActionMutation>;

export const ConfigureAccountActionResponseFragment = graphql(
  `fragment ConfigureAccountActionResponse on ConfigureAccountActionResponse {
    __typename
    hash
  }`,
);

export type ConfigureAccountActionResponse = FragmentOf<
  typeof ConfigureAccountActionResponseFragment
>;

export const ConfigureAccountActionResultFragment = graphql(
  `fragment ConfigureAccountActionResult on ConfigureAccountActionResult {
    ...on ConfigureAccountActionResponse {
      ...ConfigureAccountActionResponse
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
    ConfigureAccountActionResponseFragment,
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type ConfigureAccountActionResult = FragmentOf<typeof ConfigureAccountActionResultFragment>;

export const ConfigureAccountActionMutation = graphql(
  `mutation ConfigureAccountAction($request: ConfigureAccountActionRequest!) {
    value: configureAccountAction(request: $request) {
      ...ConfigureAccountActionResult
    }
  }`,
  [ConfigureAccountActionResultFragment],
);
export type ConfigureAccountActionRequest = RequestOf<typeof ConfigureAccountActionMutation>;

export const DisableAccountActionResponseFragment = graphql(
  `fragment DisableAccountActionResponse on DisableAccountActionResponse {
    __typename
    hash
  }`,
);

export type DisableAccountActionResponse = FragmentOf<typeof DisableAccountActionResponseFragment>;

export const DisableAccountActionResultFragment = graphql(
  `fragment DisableAccountActionResult on DisableAccountActionResult {
    ...on DisableAccountActionResponse {
      ...DisableAccountActionResponse
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
    DisableAccountActionResponseFragment,
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type DisableAccountActionResult = FragmentOf<typeof DisableAccountActionResultFragment>;

export const DisableAccountActionMutation = graphql(
  `mutation DisableAccountAction($request: DisableAccountActionRequest!) {
    value: disableAccountAction(request: $request) {
      ...DisableAccountActionResult
    }
  }`,
  [DisableAccountActionResultFragment],
);
export type DisableAccountActionRequest = RequestOf<typeof DisableAccountActionMutation>;

export const EnableAccountActionResponseFragment = graphql(
  `fragment EnableAccountActionResponse on EnableAccountActionResponse {
    __typename
    hash
  }`,
);

export type EnableAccountActionResponse = FragmentOf<typeof EnableAccountActionResponseFragment>;

export const EnableAccountActionResultFragment = graphql(
  `fragment EnableAccountActionResult on EnableAccountActionResult {
    ...on EnableAccountActionResponse {
      ...EnableAccountActionResponse
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
    EnableAccountActionResponseFragment,
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
  ],
);
export type EnableAccountActionResult = FragmentOf<typeof EnableAccountActionResultFragment>;

export const EnableAccountActionMutation = graphql(
  `mutation EnableAccountAction($request: EnableAccountActionRequest!) {
    value: enableAccountAction(request: $request) {
      ...EnableAccountActionResult
    }
  }`,
  [EnableAccountActionResultFragment],
);
export type EnableAccountActionRequest = RequestOf<typeof EnableAccountActionMutation>;

export const ExecuteAccountActionResponseFragment = graphql(
  `fragment ExecuteAccountActionResponse on ExecuteAccountActionResponse {
    __typename
    hash
  }`,
);

export type ExecuteAccountActionResponse = FragmentOf<typeof ExecuteAccountActionResponseFragment>;

export const ExecuteAccountActionResultFragment = graphql(
  `fragment ExecuteAccountActionResult on ExecuteAccountActionResult {
    ...on ExecuteAccountActionResponse {
      ...ExecuteAccountActionResponse
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
    ...on InsufficientFunds {
      ...InsufficientFunds
    }
  }`,
  [
    ExecuteAccountActionResponseFragment,
    SponsoredTransactionRequestFragment,
    SelfFundedTransactionRequestFragment,
    TransactionWillFailFragment,
    InsufficientFundsFragment,
  ],
);
export type ExecuteAccountActionResult = FragmentOf<typeof ExecuteAccountActionResultFragment>;

export const ExecuteAccountActionMutation = graphql(
  `mutation ExecuteAccountAction($request: ExecuteAccountActionRequest!) {
    value: executeAccountAction(request: $request) {
      ...ExecuteAccountActionResult
    }
  }`,
  [ExecuteAccountActionResultFragment],
);
export type ExecuteAccountActionRequest = RequestOf<typeof ExecuteAccountActionMutation>;
