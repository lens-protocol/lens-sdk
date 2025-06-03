import type {
  AuthenticatedUser,
  AuthenticationError,
  ImpersonationRequest,
  UnexpectedError,
} from '@lens-protocol/client';
import type { ResultAsync } from '@lens-protocol/types';

import { useLensContext } from '../context';
import { type UseAsyncTask, useAsyncTask } from '../helpers';
import { usePublicClient } from './usePublicClient';

export type ImpersonationError = AuthenticationError | UnexpectedError;

/**
 * @internal
 */
export function useImpersonation(): UseAsyncTask<
  ImpersonationRequest,
  AuthenticatedUser,
  ImpersonationError
> {
  const { afterLogin } = useLensContext();
  const publicClient = usePublicClient();

  return useAsyncTask(
    (params: ImpersonationRequest): ResultAsync<AuthenticatedUser, ImpersonationError> =>
      publicClient
        .impersonate(params)
        .andTee(afterLogin)
        .andThen((sessionClient) => sessionClient.getAuthenticatedUser()),
  );
}
