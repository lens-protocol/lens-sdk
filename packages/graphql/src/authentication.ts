import type { FragmentOf, VariablesOf } from 'gql.tada';
import { App } from './fragments/App';
import { graphql } from './graphql';

const AuthenticationChallenge = graphql(
  `
  fragment AuthenticationChallenge on AuthenticationChallenge {
    __typename
    id
    text
    app {
      ...App
    }
  }
`,
  [App],
);
export type AuthenticationChallenge = FragmentOf<typeof AuthenticationChallenge>;

export const ChallengeMutation = graphql(
  `
  mutation Challenge($request: ChallengeRequest!) {
    value: challenge(request: $request) {
      ...AuthenticationChallenge
    }
  }
  `,
  [AuthenticationChallenge],
);

export type ChallengeVariables = VariablesOf<typeof ChallengeMutation>;

const AuthenticationTokens = graphql(`
  fragment AuthenticationTokens on AuthenticationTokens {
    __typename
    accessToken
    refreshToken
    identityToken
  }
`);
export type AuthenticationTokens = FragmentOf<typeof AuthenticationTokens>;

const AuthenticationResult = graphql(
  `
  fragment AuthenticationResult on AuthenticationResult {
    ...on AuthenticationTokens {
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
`,
  [AuthenticationTokens],
);

export type AuthenticationResult = FragmentOf<typeof AuthenticationResult>;

export const AuthenticateMutation = graphql(
  `
  mutation Authenticate($request: SignedAuthChallenge!) {
    value: authenticate(request: $request) {
      ...AuthenticationResult
    }
  }
  `,
  [AuthenticationResult],
);

export type AuthenticateVariables = VariablesOf<typeof AuthenticateMutation>;

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
