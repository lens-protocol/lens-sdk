import type { FragmentOf, VariablesOf } from 'gql.tada';
import { App, PaginatedResultInfo } from './fragments';
import { graphql } from './graphql';

const AuthenticationChallenge = graphql(
  `fragment AuthenticationChallenge on AuthenticationChallenge {
    __typename
    id
    text
    app {
      ...App
    }
  }`,
  [App],
);
export type AuthenticationChallenge = FragmentOf<typeof AuthenticationChallenge>;

export const ChallengeMutation = graphql(
  `mutation Challenge($request: ChallengeRequest!) {
    value: challenge(request: $request) {
      ...AuthenticationChallenge
    }
  }`,
  [AuthenticationChallenge],
);

export type ChallengeVariables = VariablesOf<typeof ChallengeMutation>;

const AuthenticationTokens = graphql(
  `fragment AuthenticationTokens on AuthenticationTokens {
    __typename
    accessToken
    refreshToken
    idToken
  }`,
);
export type AuthenticationTokens = FragmentOf<typeof AuthenticationTokens>;

const WrongSignerError = graphql(
  `fragment WrongSignerError on WrongSignerError {
    __typename
    reason
  }`,
);
export type WrongSignerError = FragmentOf<typeof WrongSignerError>;

const ExpiredChallengeError = graphql(
  `fragment ExpiredChallengeError on ExpiredChallengeError {
    __typename
    reason
  }`,
);
export type ExpiredChallengeError = FragmentOf<typeof ExpiredChallengeError>;

const ForbiddenError = graphql(
  `fragment ForbiddenError on ForbiddenError {
    __typename
    reason
  }`,
);
export type ForbiddenError = FragmentOf<typeof ForbiddenError>;

const AuthenticationResult = graphql(
  `fragment AuthenticationResult on AuthenticationResult {
    ...on AuthenticationTokens {
      ...AuthenticationTokens
    }
      
    ...on WrongSignerError {
      ...WrongSignerError
    }
        
    ...on ExpiredChallengeError {
      ...ExpiredChallengeError
    }
          
    ...on ForbiddenError {
      ...ForbiddenError
    }
  }`,
  [AuthenticationTokens, WrongSignerError, ExpiredChallengeError, ForbiddenError],
);

export type AuthenticationResult = FragmentOf<typeof AuthenticationResult>;

export const AuthenticateMutation = graphql(
  `mutation Authenticate($request: SignedAuthChallenge!) {
    value: authenticate(request: $request) {
      ...AuthenticationResult
    }
  }`,
  [AuthenticationResult],
);

export type AuthenticateVariables = VariablesOf<typeof AuthenticateMutation>;

const ActiveAuthentication = graphql(
  `fragment ActiveAuthentication on ActiveAuthentication {
    authenticationId
    app
    browser
    device
    os
    origin
    signer
    createdAt
    updatedAt
  }`,
);

export type ActiveAuthenticationResult = FragmentOf<typeof ActiveAuthentication>;

export const CurrentAuthenticationQuery = graphql(
  `query CurrentAuthentication {
    value: currentAuthentication {
      ...ActiveAuthentication
    }
  }`,
  [ActiveAuthentication],
);

export const AccountAuthenticationsQuery = graphql(
  `query AccountAuthentications($request: AccountAuthenticationsRequest!) {
    value: accountAuthentications(request: $request) {
      items {
        ...ActiveAuthentication
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [ActiveAuthentication, PaginatedResultInfo],
);

export type AuthenticatedSessionsVariables = VariablesOf<typeof AccountAuthenticationsQuery>;

export const RevokeAuthenticationMutation = graphql(
  `mutation RevokeAuthentication($request: RevokeAuthenticationRequest!) {
    value: revokeAuthentication(request: $request)
  }`,
);

export type RevokeAuthenticationVariables = VariablesOf<typeof RevokeAuthenticationMutation>;

export const RefreshResult = graphql(
  `fragment RefreshResult on RefreshResult {
    ...on AuthenticationTokens {
      ...AuthenticationTokens
    }
          
    ...on ForbiddenError {
      ...ForbiddenError
    }
  }`,
  [AuthenticationTokens, ForbiddenError],
);

export type RefreshResult = FragmentOf<typeof RefreshResult>;

export const RefreshMutation = graphql(
  `mutation Refresh($request: RefreshRequest!) {
    value: refresh(request: $request) {
      ...RefreshResult
    }
  }`,
  [RefreshResult],
);

export type RefreshVariables = VariablesOf<typeof RefreshMutation>;

export const RolloverRefreshMutation = graphql(
  `mutation RolloverRefresh($request: RolloverRefreshRequest!) {
    value: rolloverRefresh(request: $request) {
      ...RefreshResult
    }
  }`,
  [RefreshResult],
);

export type RolloverRefreshVariables = VariablesOf<typeof RolloverRefreshMutation>;
