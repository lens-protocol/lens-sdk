// @ts-nocheck
import * as Types from '../../../graphql/types.generated';

import { AppFragment, PaginatedResultInfoFragment } from '../../../graphql/fragments.generated';
import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql';
import gql from 'graphql-tag';
import {
  AppFragmentDoc,
  PaginatedResultInfoFragmentDoc,
} from '../../../graphql/fragments.generated';
export type MomokaVerificationStatusSuccessFragment = { verified: boolean };

export type MomokaVerificationStatusFailureFragment = { status: Types.MomokaValidatorError };

export type MomokaPostTransactionFragment = {
  transactionId: string;
  submitter: string;
  createdAt: string;
  app: AppFragment | null;
  publication: { id: string };
  verificationStatus:
    | MomokaVerificationStatusFailureFragment
    | MomokaVerificationStatusSuccessFragment;
};

export type MomokaCommentTransactionFragment = {
  transactionId: string;
  submitter: string;
  createdAt: string;
  app: AppFragment | null;
  verificationStatus:
    | MomokaVerificationStatusFailureFragment
    | MomokaVerificationStatusSuccessFragment;
  publication: { id: string };
  commentOn: { id: string } | { id: string } | { id: string };
};

export type MomokaMirrorTransactionFragment = {
  transactionId: string;
  submitter: string;
  createdAt: string;
  app: AppFragment | null;
  verificationStatus:
    | MomokaVerificationStatusFailureFragment
    | MomokaVerificationStatusSuccessFragment;
  publication: { id: string };
  mirrorOn: { id: string } | { id: string } | { id: string };
};

export type MomokaQuoteTransactionFragment = {
  transactionId: string;
  submitter: string;
  createdAt: string;
  app: AppFragment | null;
  verificationStatus:
    | MomokaVerificationStatusFailureFragment
    | MomokaVerificationStatusSuccessFragment;
  publication: { id: string };
  quoteOn: { id: string } | { id: string } | { id: string };
};

export type MomokaSubmitterResultFragment = {
  address: string;
  name: string;
  totalTransactions: number;
};

export type MomokaSubmittersQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MomokaSubmittersQuery = {
  result: { items: Array<MomokaSubmitterResultFragment>; pageInfo: PaginatedResultInfoFragment };
};

export type MomokaSummaryQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MomokaSummaryQuery = { result: { totalTransactions: number } };

export type MomokaTransactionQueryVariables = Types.Exact<{
  request: Types.MomokaTransactionRequest;
}>;

export type MomokaTransactionQuery = {
  result:
    | MomokaCommentTransactionFragment
    | MomokaMirrorTransactionFragment
    | MomokaPostTransactionFragment
    | MomokaQuoteTransactionFragment
    | null;
};

export type MomokaTransactionsQueryVariables = Types.Exact<{
  request: Types.MomokaTransactionsRequest;
}>;

export type MomokaTransactionsQuery = {
  result: {
    items: Array<
      | MomokaCommentTransactionFragment
      | MomokaMirrorTransactionFragment
      | MomokaPostTransactionFragment
      | MomokaQuoteTransactionFragment
    >;
    pageInfo: PaginatedResultInfoFragment;
  };
};

export const MomokaVerificationStatusSuccessFragmentDoc = gql`
  fragment MomokaVerificationStatusSuccess on MomokaVerificationStatusSuccess {
    verified
  }
`;
export const MomokaVerificationStatusFailureFragmentDoc = gql`
  fragment MomokaVerificationStatusFailure on MomokaVerificationStatusFailure {
    status
  }
`;
export const MomokaPostTransactionFragmentDoc = gql`
  fragment MomokaPostTransaction on MomokaPostTransaction {
    transactionId
    submitter
    createdAt
    app {
      ...App
    }
    publication {
      id
    }
    verificationStatus {
      ... on MomokaVerificationStatusSuccess {
        ...MomokaVerificationStatusSuccess
      }
      ... on MomokaVerificationStatusFailure {
        ...MomokaVerificationStatusFailure
      }
    }
  }
  ${AppFragmentDoc}
  ${MomokaVerificationStatusSuccessFragmentDoc}
  ${MomokaVerificationStatusFailureFragmentDoc}
`;
export const MomokaCommentTransactionFragmentDoc = gql`
  fragment MomokaCommentTransaction on MomokaCommentTransaction {
    transactionId
    submitter
    createdAt
    app {
      ...App
    }
    verificationStatus {
      ... on MomokaVerificationStatusSuccess {
        ...MomokaVerificationStatusSuccess
      }
      ... on MomokaVerificationStatusFailure {
        ...MomokaVerificationStatusFailure
      }
    }
    publication {
      id
    }
    commentOn {
      ... on Post {
        id
      }
      ... on Comment {
        id
      }
      ... on Quote {
        id
      }
    }
  }
  ${AppFragmentDoc}
  ${MomokaVerificationStatusSuccessFragmentDoc}
  ${MomokaVerificationStatusFailureFragmentDoc}
`;
export const MomokaMirrorTransactionFragmentDoc = gql`
  fragment MomokaMirrorTransaction on MomokaMirrorTransaction {
    transactionId
    submitter
    createdAt
    app {
      ...App
    }
    verificationStatus {
      ... on MomokaVerificationStatusSuccess {
        ...MomokaVerificationStatusSuccess
      }
      ... on MomokaVerificationStatusFailure {
        ...MomokaVerificationStatusFailure
      }
    }
    publication {
      id
    }
    mirrorOn {
      ... on Post {
        id
      }
      ... on Comment {
        id
      }
      ... on Quote {
        id
      }
    }
  }
  ${AppFragmentDoc}
  ${MomokaVerificationStatusSuccessFragmentDoc}
  ${MomokaVerificationStatusFailureFragmentDoc}
`;
export const MomokaQuoteTransactionFragmentDoc = gql`
  fragment MomokaQuoteTransaction on MomokaQuoteTransaction {
    transactionId
    submitter
    createdAt
    app {
      ...App
    }
    verificationStatus {
      ... on MomokaVerificationStatusSuccess {
        ...MomokaVerificationStatusSuccess
      }
      ... on MomokaVerificationStatusFailure {
        ...MomokaVerificationStatusFailure
      }
    }
    publication {
      id
    }
    quoteOn {
      ... on Post {
        id
      }
      ... on Comment {
        id
      }
      ... on Quote {
        id
      }
    }
  }
  ${AppFragmentDoc}
  ${MomokaVerificationStatusSuccessFragmentDoc}
  ${MomokaVerificationStatusFailureFragmentDoc}
`;
export const MomokaSubmitterResultFragmentDoc = gql`
  fragment MomokaSubmitterResult on MomokaSubmitterResult {
    address
    name
    totalTransactions
  }
`;
export const MomokaSubmittersDocument = gql`
  query MomokaSubmitters {
    result: momokaSubmitters {
      items {
        ...MomokaSubmitterResult
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${MomokaSubmitterResultFragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
`;
export const MomokaSummaryDocument = gql`
  query MomokaSummary {
    result: momokaSummary {
      totalTransactions
    }
  }
`;
export const MomokaTransactionDocument = gql`
  query MomokaTransaction($request: MomokaTransactionRequest!) {
    result: momokaTransaction(request: $request) {
      ... on MomokaPostTransaction {
        ...MomokaPostTransaction
      }
      ... on MomokaCommentTransaction {
        ...MomokaCommentTransaction
      }
      ... on MomokaMirrorTransaction {
        ...MomokaMirrorTransaction
      }
      ... on MomokaQuoteTransaction {
        ...MomokaQuoteTransaction
      }
    }
  }
  ${MomokaPostTransactionFragmentDoc}
  ${MomokaCommentTransactionFragmentDoc}
  ${MomokaMirrorTransactionFragmentDoc}
  ${MomokaQuoteTransactionFragmentDoc}
`;
export const MomokaTransactionsDocument = gql`
  query momokaTransactions($request: MomokaTransactionsRequest!) {
    result: momokaTransactions(request: $request) {
      items {
        ... on MomokaPostTransaction {
          ...MomokaPostTransaction
        }
        ... on MomokaCommentTransaction {
          ...MomokaCommentTransaction
        }
        ... on MomokaMirrorTransaction {
          ...MomokaMirrorTransaction
        }
        ... on MomokaQuoteTransaction {
          ...MomokaQuoteTransaction
        }
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${MomokaPostTransactionFragmentDoc}
  ${MomokaCommentTransactionFragmentDoc}
  ${MomokaMirrorTransactionFragmentDoc}
  ${MomokaQuoteTransactionFragmentDoc}
  ${PaginatedResultInfoFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const MomokaSubmittersDocumentString = print(MomokaSubmittersDocument);
const MomokaSummaryDocumentString = print(MomokaSummaryDocument);
const MomokaTransactionDocumentString = print(MomokaTransactionDocument);
const MomokaTransactionsDocumentString = print(MomokaTransactionsDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    MomokaSubmitters(
      variables?: MomokaSubmittersQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: MomokaSubmittersQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<MomokaSubmittersQuery>(MomokaSubmittersDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'MomokaSubmitters',
        'query',
      );
    },
    MomokaSummary(
      variables?: MomokaSummaryQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: MomokaSummaryQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<MomokaSummaryQuery>(MomokaSummaryDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'MomokaSummary',
        'query',
      );
    },
    MomokaTransaction(
      variables: MomokaTransactionQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: MomokaTransactionQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<MomokaTransactionQuery>(MomokaTransactionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'MomokaTransaction',
        'query',
      );
    },
    momokaTransactions(
      variables: MomokaTransactionsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: MomokaTransactionsQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<MomokaTransactionsQuery>(MomokaTransactionsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'momokaTransactions',
        'query',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
