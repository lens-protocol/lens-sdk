import type {
  AuthenticatedUser,
  AuthenticationError,
  LoginParams,
  SignMessage,
  UnauthenticatedError,
  UnexpectedError,
} from '@lens-protocol/client';
import type { SwitchAccountRequest } from '@lens-protocol/graphql';
import { type ResultAsync, invariant } from '@lens-protocol/types';

import { useLensContext } from '../context';
import { type UseAsyncTask, useAsyncTask } from '../helpers';
import { useSessionClient } from './useSessionClient';

export type { LoginParams, SignMessage };

export type SwitchAccountError = AuthenticationError | UnauthenticatedError | UnexpectedError;

/**
 * Switch to a different account.
 *
 * ```tsx
 * import { evmAddress, useSwitchAccount } from '@lens-protocol/react';
 *
 * const { execute } = useSwitchAccount();
 *
 * const result = await execute({
 *   account: evmAddress('0xB8d87f414EDc074A1808497BA2Fefc0fb37164C3'),
 * });
 *
 * if (result.isOk()) {
 *   console.log(result.value); // AuthenticatedUser
 * }
 * ```
 */
export function useSwitchAccount(): UseAsyncTask<
  SwitchAccountRequest,
  AuthenticatedUser,
  SwitchAccountError
> {
  const { afterLogin } = useLensContext();
  const { data: sessionClient } = useSessionClient();

  return useAsyncTask(
    (request: SwitchAccountRequest): ResultAsync<AuthenticatedUser, SwitchAccountError> => {
      invariant(
        sessionClient,
        'It appears that you are not logged in. Please log in before attempting to switch account.',
      );

      return sessionClient
        .switchAccount(request)
        .andTee(afterLogin)
        .andThen((sessionClient) => sessionClient.getAuthenticatedUser());
    },
  );
}
