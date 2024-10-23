import type { FragmentOf, ResultOf, VariablesOf } from 'gql.tada';
import { App } from './fragments/App';
import { graphql } from './graphql';

export const ChallengeMutation = graphql(
  `
  mutation Challenge($request: ChallengeRequest!) {
    value: challenge(request: $request) {
      __typename
      id
      text
      app {
        ...App
      }
    }
  }
  `,
  [App],
);

export type ChallengeVariables = VariablesOf<typeof ChallengeMutation>;

export type ChallengeResult = ResultOf<typeof ChallengeMutation>;

const AuthenticationTokens = graphql(`
  fragment AuthenticationTokens on AuthenticationTokens {
    accessToken
    refreshToken
    identityToken
  }
`);
export type AuthenticationTokens = FragmentOf<typeof AuthenticationTokens>;

export const AuthenticateMutation = graphql(
  `
  mutation Authenticate($request: SignedAuthChallenge!) {
    value: authenticate(request: $request) {
      ...on AuthenticationTokens {
        __typename
        ...AuthenticationTokens
      }
        
      ...on WrongSignerError {
        __typename
        reason
      }
          
      ...on ExpiredChallengeError {
        __typename
        reason
      }
            
      ...on ForbiddenError {
        __typename
        reason
      }
    }
  }
  `,
  [AuthenticationTokens],
);

export type AuthenticateVariables = VariablesOf<typeof AuthenticateMutation>;

export type AuthenticateResult = ResultOf<typeof AuthenticateMutation>;

const ActiveAuthentication = graphql(`
  fragment ActiveAuthentication on ActiveAuthentication {
    authenticationId
    app
    browser
    device
    os
    origin
    signer
    createdAt
    updatedAt
  }
`);

export type ActiveAuthentication = FragmentOf<typeof ActiveAuthentication>;

export const CurrentAuthenticationQuery = graphql(
  `
  query CurrentAuthentication {
    value: currentAuthentication {
      ...ActiveAuthentication
    }
  }
  `,
  [ActiveAuthentication],
);

export type CurrentAuthenticationResult = ResultOf<typeof CurrentAuthenticationQuery>;
