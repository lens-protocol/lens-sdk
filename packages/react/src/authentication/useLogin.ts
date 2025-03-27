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
import { usePublicClient } from './usePublicClient';

export type { LoginParams, SignMessage };

export type LoginError = AuthenticationError | SigningError | UnexpectedError;

type LoginResult = ResultAsync<AuthenticatedUser, LoginError>;

/**
 * Log in to Lens.
 *
 * ```tsx
 * import { evmAddress, useLogin } from '@lens-protocol/react';
 *
 * import { signMessageWith } from '@lens-protocol/react/viem';
 * // OR
 * import { signMessageWith } from '@lens-protocol/react/ethers';
 *
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
 * if (result.isOk()) {
 *   console.log(result.value); // AuthenticatedUser
 * }
 * ```
 */
export function useLogin(): UseAsyncTask<LoginParams, AuthenticatedUser, LoginError> {
  const { afterLogin } = useLensContext();
  const publicClient = usePublicClient();

  return useAsyncTask(
    (params: LoginParams): LoginResult =>
      publicClient
        .login(params)
        .andTee(afterLogin)
        .andThen((sessionClient) => sessionClient.getAuthenticatedUser()),
  );
}
