// eslint-disable-next-line no-restricted-imports
import { from, fromPromise, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { maybe } from '@apollo/client/utilities';
import { ILogger, never } from '@lens-protocol/shared-kernel';

import { SemVer } from '../SemVer';
import { IAccessTokenStorage } from './IAccessTokenStorage';

/**
 * An error code that's coming from `apollo-server-errors` `AuthenticationError`
 */
const AUTHENTICATION_ERROR_CODE = 'UNAUTHENTICATED';

export function createAuthLink(accessTokenStorage: IAccessTokenStorage) {
  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (
      graphQLErrors &&
      graphQLErrors.some((error) => error.extensions?.code === AUTHENTICATION_ERROR_CODE)
    ) {
      return fromPromise(accessTokenStorage.refreshToken()).flatMap(() => forward(operation));
    }
    return;
  });

  const authHeaderLink = setContext((_, prevContext) => {
    const token = accessTokenStorage.getAccessToken();

    if (token) {
      return {
        ...prevContext,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        headers: {
          authorization: `Bearer ${token}`,
          ...('headers' in prevContext && prevContext.headers),
        },
      };
    }

    return prevContext;
  });

  return from([errorLink, authHeaderLink]);
}

const backupFetch = maybe(() => fetch);

function wrapFetch(
  logger: ILogger,
  supportedVersion: SemVer,
  fetch: WindowOrWorkerGlobalScope['fetch'],
): WindowOrWorkerGlobalScope['fetch'] {
  return async (...args) => {
    const response = await fetch(...args);

    if (response.status === 200) {
      const apiVersion = response.headers.get('x-api-version');

      if (apiVersion) {
        if (apiVersion < supportedVersion) {
          logger.warn(
            `The Lens API ${apiVersion} is outside of the Lens SDK support range ^${supportedVersion}`,
          );
          return response;
        }

        const [apiMajor, apiMinor] = apiVersion.split('.');
        const [clientMajor, clientMinor] = supportedVersion.split('.');

        if (apiMajor && clientMajor && apiMajor > clientMajor) {
          logger.warn(
            `The Lens API ${apiVersion} is NOT supported by the Lens SDK support range ^${supportedVersion}. Update your Lens SDK client to the latest version.`,
          );
          return response;
        }

        if (apiMinor && clientMinor && apiMinor > clientMinor) {
          logger.info(
            `The Lens API ${apiVersion} is ahead of the Lens SDK support range ^${supportedVersion}. Check for a new version of the Lens SDK client, if available.`,
          );
          return response;
        }
      }
    }
    return response;
  };
}

export type LensLinkArgs = {
  fetch?: WindowOrWorkerGlobalScope['fetch'];
  logger: ILogger;
  supportedVersion: SemVer;
  uri: string;
};

export function createLensLink({
  fetch: preferredFetch,
  logger,
  supportedVersion,
  uri,
}: LensLinkArgs) {
  // see https://github.com/apollographql/apollo-client/blob/4bf773f64b78f15419f07676f434fa33e058404e/src/link/http/createHttpLink.ts#L160-L165
  const currentFetch = preferredFetch ?? maybe(() => fetch) ?? backupFetch ?? never();

  return new HttpLink({
    uri,
    fetch: wrapFetch(logger, supportedVersion, currentFetch),
  });
}

export type SnapshotLinkArgs = {
  uri: string;
};

export function createSnapshotLink({ uri }: SnapshotLinkArgs) {
  return new HttpLink({ uri });
}
