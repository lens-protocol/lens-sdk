import type {
  AuthenticatedUser,
  AuthenticationError,
  LoginParams,
  SessionClient,
  SigningError,
  SignMessage,
  UnexpectedError,
} from '@lens-protocol/client';
import type { ResultAsync } from '@lens-protocol/types';
import { useLensContext } from '../context';
import { type UseAsyncTask, useAsyncTask } from '../helpers';
import { usePublicClient } from './usePublicClient';

export type { LoginParams, SignMessage };

export type LoginError = AuthenticationError | SigningError | UnexpectedError;

/**
 * Logs in to Lens and returns the {@link SessionClient | `SessionClient`}.
 *
 * @experimental This is an experimental hook and may be subject to breaking changes.
 *
 * This is a low-level hook. Unless you specifically need to interact with
 * the `SessionClient` immediately after logging in, it is recommended to
 * use {@link useLogin | `useLogin`} instead.
 *
 * ```tsx
 * import { evmAddress, useLoginAction } from '@lens-protocol/react';
 *
 * import { signMessageWith } from '@lens-protocol/react/viem';
 * // OR
 * import { signMessageWith } from '@lens-protocol/react/ethers';
 *
 * const { execute } = useLoginAction();
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
 *   console.log(result.value); // SessionClient
 * }
 * ```
 */
export function useLoginAction(): UseAsyncTask<
  LoginParams,
  SessionClient,
  LoginError
> {
  const { afterLogin } = useLensContext();
  const publicClient = usePublicClient();

  return useAsyncTask(
    (params: LoginParams): ResultAsync<SessionClient, LoginError> =>
      publicClient.login(params).andTee(afterLogin),
  );
}

/**
 * Log in to Lens and returns the {@link AuthenticatedUser | `AuthenticatedUser`}.
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
export function useLogin(): UseAsyncTask<
  LoginParams,
  AuthenticatedUser,
  LoginError
> {
  const { execute } = useLoginAction();

  return useAsyncTask(
    (params: LoginParams): ResultAsync<AuthenticatedUser, LoginError> =>
      execute(params).andThen((sessionClient) =>
        sessionClient.getAuthenticatedUser(),
      ),
  );
}
