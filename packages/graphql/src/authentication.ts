import type { FragmentOf } from 'gql.tada';
import {
  AccountAvailableFragment,
  AccountFragment,
  PaginatedResultInfoFragment,
} from './fragments';
import { type RequestOf, graphql } from './graphql';

const AuthenticationChallengeFragment = graphql(
  `fragment AuthenticationChallenge on AuthenticationChallenge {
    __typename
    id
    text
  }`,
  [],
);
export type AuthenticationChallenge = FragmentOf<typeof AuthenticationChallengeFragment>;

export const ChallengeMutation = graphql(
  `mutation Challenge($request: ChallengeRequest!) {
    value: challenge(request: $request) {
      ...AuthenticationChallenge
    }
  }`,
  [AuthenticationChallengeFragment],
);

export type ChallengeRequest = RequestOf<typeof ChallengeMutation>;

const AuthenticationTokensFragment = graphql(
  `fragment AuthenticationTokens on AuthenticationTokens {
    __typename
    accessToken
    refreshToken
    idToken
  }`,
);
export type AuthenticationTokens = FragmentOf<typeof AuthenticationTokensFragment>;

const WrongSignerErrorFragment = graphql(
  `fragment WrongSignerError on WrongSignerError {
    __typename
    reason
  }`,
);
export type WrongSignerError = FragmentOf<typeof WrongSignerErrorFragment>;

const ExpiredChallengeErrorFragment = graphql(
  `fragment ExpiredChallengeError on ExpiredChallengeError {
    __typename
    reason
  }`,
);
export type ExpiredChallengeError = FragmentOf<typeof ExpiredChallengeErrorFragment>;

const ForbiddenErrorFragment = graphql(
  `fragment ForbiddenError on ForbiddenError {
    __typename
    reason
  }`,
);
export type ForbiddenError = FragmentOf<typeof ForbiddenErrorFragment>;

const AuthenticationResultFragment = graphql(
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
  [
    AuthenticationTokensFragment,
    WrongSignerErrorFragment,
    ExpiredChallengeErrorFragment,
    ForbiddenErrorFragment,
  ],
);
export type AuthenticationResult = FragmentOf<typeof AuthenticationResultFragment>;

export const AuthenticateMutation = graphql(
  `mutation Authenticate($request: SignedAuthChallenge!) {
    value: authenticate(request: $request) {
      ...AuthenticationResult
    }
  }`,
  [AuthenticationResultFragment],
);
export type SignedAuthChallenge = RequestOf<typeof AuthenticateMutation>;

/**
 * @internal
 */
export const UnverifiedCredentialsResult = graphql(
  `fragment UnverifiedCredentialsResult on UnverifiedCredentialsResult {
    ...on AuthenticationTokens {
      ...AuthenticationTokens
    }
    ...on ForbiddenError {
      ...ForbiddenError
    }
  }`,
  [AuthenticationTokensFragment, ForbiddenErrorFragment],
);
/**
 * @internal
 */
export type UnverifiedCredentialsResult = FragmentOf<typeof UnverifiedCredentialsResult>;

/**
 * @internal
 */
export const IssueUnverifiedCredentialsMutation = graphql(
  `mutation IssueUnverifiedCredentials($request: IssueUnverifiedCredentialsRequest!) {
    value: issueUnverifiedCredentials(request: $request) {
      ...UnverifiedCredentialsResult
    }
  }`,
  [UnverifiedCredentialsResult],
);
/**
 * @internal
 */
export type IssueUnverifiedCredentialsRequest = RequestOf<
  typeof IssueUnverifiedCredentialsMutation
>;

const AuthenticatedSessionFragment = graphql(
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
export type AuthenticatedSession = FragmentOf<typeof AuthenticatedSessionFragment>;

export const CurrentSessionQuery = graphql(
  `query CurrentSession {
    value: currentSession {
      ...AuthenticatedSession
    }
  }`,
  [AuthenticatedSessionFragment],
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
  [AuthenticatedSessionFragment, PaginatedResultInfoFragment],
);
export type AuthenticatedSessionsRequest = RequestOf<typeof AuthenticatedSessionsQuery>;

export const RevokeAuthenticationMutation = graphql(
  `mutation RevokeAuthentication($request: RevokeAuthenticationRequest!) {
    value: revokeAuthentication(request: $request)
  }`,
);
export type RevokeAuthenticationRequest = RequestOf<typeof RevokeAuthenticationMutation>;

const RefreshResultFragment = graphql(
  `fragment RefreshResult on RefreshResult {
    ...on AuthenticationTokens {
      ...AuthenticationTokens
    }
          
    ...on ForbiddenError {
      ...ForbiddenError
    }
  }`,
  [AuthenticationTokensFragment, ForbiddenErrorFragment],
);
export type RefreshResult = FragmentOf<typeof RefreshResultFragment>;

export const RefreshMutation = graphql(
  `mutation Refresh($request: RefreshRequest!) {
    value: refresh(request: $request) {
      ...RefreshResult
    }
  }`,
  [RefreshResultFragment],
);
export type RefreshRequest = RequestOf<typeof RefreshMutation>;

export const LegacyRolloverRefreshMutation = graphql(
  `mutation LegacyRolloverRefresh($request: RolloverRefreshRequest!) {
    value: legacyRolloverRefresh(request: $request) {
      ...RefreshResult
    }
  }`,
  [RefreshResultFragment],
);
export type RolloverRefreshRequest = RequestOf<typeof LegacyRolloverRefreshMutation>;

const SwitchAccountResultFragment = graphql(
  `fragment SwitchAccountResult on SwitchAccountResult {
    ...on AuthenticationTokens {
      ...AuthenticationTokens
    }
          
    ...on ForbiddenError {
      ...ForbiddenError
    }
  }`,
  [AuthenticationTokensFragment, ForbiddenErrorFragment],
);
export type SwitchAccountResult = FragmentOf<typeof SwitchAccountResultFragment>;

export const SwitchAccountMutation = graphql(
  `mutation SwitchAccount($request: SwitchAccountRequest!) {
    value: switchAccount(request: $request) {
      ...SwitchAccountResult
    }
  }`,
  [SwitchAccountResultFragment],
);
export type SwitchAccountRequest = RequestOf<typeof SwitchAccountMutation>;

const MeResultFragment = graphql(
  `fragment MeResult on MeResult {
    appLoggedIn
    isSignless
    isSponsored
    limit {
      allowance
      allowanceLeft
      allowanceUsed
      window
    }
    loggedInAs {
      ...AccountAvailable
    }
  }`,
  [AccountAvailableFragment],
);
export type MeResult = FragmentOf<typeof MeResultFragment>;

export const MeQuery = graphql(
  `query Me {
    value: me {
      ...MeResult
    }
  }`,
  [MeResultFragment],
);

export const LastLoggedInAccountQuery = graphql(
  `query LastLoggedInAccount($request: LastLoggedInAccountRequest!) {
    value: lastLoggedInAccount(request: $request) {
      ...Account
    }
  }`,
  [AccountFragment],
);
export type LastLoggedInAccountRequest = RequestOf<typeof LastLoggedInAccountQuery>;
