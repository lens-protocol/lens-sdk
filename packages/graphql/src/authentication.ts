import { App } from './fragments/App';
import { graphql } from './graphql';

export const AuthenticationTokens = graphql(`
  fragment AuthenticationTokens on AuthenticationTokens {
    accessToken
    refreshToken
    identityToken
  }
`);

export const ChallengeMutation = graphql(
  `
  mutation Challenge($request: ChallengeRequest!) {
    challenge(request: $request) {
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

export const Authenticate = graphql(
  `
  mutation Authenticate($request: SignedAuthChallenge!) {
    result: authenticate(request: $request) {
      ...on AuthenticationTokens {
        ...AuthenticationTokens
      }
      
      ...on WrongSignerError {
        reason
      }
      
      ...on ExpiredChallengeError {
        reason
      }
      
      ...on ForbiddenError {
        reason
      }
    }
  }
  `,
  [AuthenticationTokens],
);
