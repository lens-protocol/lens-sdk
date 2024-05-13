// eslint-disable-next-line no-restricted-imports
import { HttpLink } from '@apollo/client';
import { maybe } from '@apollo/client/utilities';
import { ILogger, never } from '@lens-protocol/shared-kernel';

import { SemVer } from '../../SemVer';

const backupFetch = maybe(() => fetch);

type Fetch = typeof fetch;

function wrapFetch(logger: ILogger, supportedVersion: SemVer, fetch: Fetch): Fetch {
  return async (...args) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
  fetch?: Fetch;
  logger: ILogger;
  origin?: string;
  supportedVersion: SemVer;
  uri: string;
};

export function createLensLink({
  fetch: preferredFetch,
  logger,
  origin,
  supportedVersion,
  uri,
}: LensLinkArgs) {
  // see https://github.com/apollographql/apollo-client/blob/4bf773f64b78f15419f07676f434fa33e058404e/src/link/http/createHttpLink.ts#L160-L165
  const currentFetch = preferredFetch ?? maybe(() => fetch) ?? backupFetch ?? never();

  return new HttpLink({
    uri,
    fetch: wrapFetch(logger, supportedVersion, currentFetch),
    headers: {
      ...(origin && { origin: origin }),
    },
  });
}
