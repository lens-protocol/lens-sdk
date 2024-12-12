import type { FragmentOf } from 'gql.tada';
import { PaginatedResultInfo } from './fragments';
import { type RequestOf, graphql } from './graphql';

const AuthenticationChallenge = graphql(
  `fragment AuthenticationChallenge on AuthenticationChallenge {
    __typename
    id
    text
  }`,
  [],
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

export type ChallengeRequest = RequestOf<typeof ChallengeMutation>;

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
export type SignedAuthChallenge = RequestOf<typeof AuthenticateMutation>;

const AuthenticatedSession = graphql(
  `fragment AuthenticatedSession on AuthenticatedSession {
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
export type AuthenticatedSession = FragmentOf<typeof AuthenticatedSession>;

export const CurrentSessionQuery = graphql(
  `query CurrentSession {
    value: currentSession {
      ...AuthenticatedSession
    }
  }`,
  [AuthenticatedSession],
);

export const AuthenticatedSessionsQuery = graphql(
  `query AuthenticatedSessions($request: AuthenticatedSessionsRequest!) {
    value: authenticatedSessions(request: $request) {
      items {
        ...AuthenticatedSession
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }`,
  [AuthenticatedSession, PaginatedResultInfo],
);
export type AuthenticatedSessionsRequest = RequestOf<typeof AuthenticatedSessionsQuery>;

export const RevokeAuthenticationMutation = graphql(
  `mutation RevokeAuthentication($request: RevokeAuthenticationRequest!) {
    value: revokeAuthentication(request: $request)
  }`,
);
export type RevokeAuthenticationRequest = RequestOf<typeof RevokeAuthenticationMutation>;

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
export type RefreshRequest = RequestOf<typeof RefreshMutation>;

export const LegacyRolloverRefreshMutation = graphql(
  `mutation LegacyRolloverRefresh($request: RolloverRefreshRequest!) {
    value: legacyRolloverRefresh(request: $request) {
      ...RefreshResult
    }
  }`,
  [RefreshResult],
);
export type RolloverRefreshRequest = RequestOf<typeof LegacyRolloverRefreshMutation>;

const SwitchAccountResult = graphql(
  `fragment SwitchAccountResult on SwitchAccountResult {
    ...on AuthenticationTokens {
      ...AuthenticationTokens
    }
          
    ...on ForbiddenError {
      ...ForbiddenError
    }
  }`,
  [AuthenticationTokens, ForbiddenError],
);
export type SwitchAccountResult = FragmentOf<typeof SwitchAccountResult>;

export const SwitchAccountMutation = graphql(
  `mutation SwitchAccount($request: SwitchAccountRequest!) {
    value: switchAccount(request: $request) {
      ...SwitchAccountResult
    }
  }`,
  [SwitchAccountResult],
);
export type SwitchAccountRequest = RequestOf<typeof SwitchAccountMutation>;
