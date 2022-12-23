import { from, fromPromise } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import { IAccessTokenStorage } from './IAccessTokenStorage';

/**
 * An error code that's coming from `apollo-server-errors` `AuthenticationError`
 */
const AUTHENTICATION_ERROR_CODE = 'UNAUTHENTICATED';

export const createAuthLink = (accessTokenStorage: IAccessTokenStorage) => {
  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (
      graphQLErrors &&
      graphQLErrors.some((error) => error.extensions?.code === AUTHENTICATION_ERROR_CODE)
    ) {
      return fromPromise(accessTokenStorage.refreshToken()).flatMap(() => forward(operation));
    }
    return;
  });

  const authHeaderLink = setContext(() => {
    const token = accessTokenStorage.getAccessToken();

    if (token) {
      return {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
    }

    return;
  });

  return from([errorLink, authHeaderLink]);
};
