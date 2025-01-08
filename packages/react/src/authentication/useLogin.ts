import type {
  AuthenticatedUser,
  AuthenticationError,
  LoginParams,
  SignMessage,
  SigningError,
  UnexpectedError,
} from '@lens-protocol/client';
import type { ResultAsync } from '@lens-protocol/types';

import { useLensContext } from '../context';
import { type UseAsyncTask, useAsyncTask } from '../helpers';

export type { LoginParams, SignMessage };

export type LoginError = AuthenticationError | SigningError | UnexpectedError;

type LoginResult = ResultAsync<AuthenticatedUser, LoginError>;

/**
 * Log in to Lens.
 *
 * ```tsx
 * const { execute } = useLogin();
 *
 * const result = await execute({
 *   accountOwner: {
 *     account: evmAddress('0xB8d87f414EDc074A1808497BA2Fefc0fb37164C3'),
 *     app: evmAddress('0xe5439696f4057aF073c0FB2dc6e5e755392922e1'),
 *     owner: evmAddress(wallet.address),
 *   },
 *   signMessage: signMessageWith(wallet),
 * });
 *
 * // …
 *
 * if (result.isOk()) {
 *   console.log(result.value); // Account
 * }
 * ```
 */
export function useLogin(): UseAsyncTask<LoginParams, AuthenticatedUser, LoginError> {
  const { client } = useLensContext();

  return useAsyncTask(
    (params: LoginParams): LoginResult =>
      client.login(params).andThen((sessionClient) => sessionClient.getAuthenticatedUser()),
  );
}
