import {
  AnyPublication,
  UnspecifiedError,
  usePublication as usePublicationHook,
} from '@lens-protocol/api-bindings';
import { PublicationId } from '@lens-protocol/domain/entities';
import { XOR } from '@lens-protocol/shared-kernel';

import { NotFoundError } from '../NotFoundError';
import {
  useLensApolloClient,
  useMediaTransformFromConfig,
  useProfileStatsArgFromConfig,
} from '../helpers/arguments';
import { ReadResult, useReadResult } from '../helpers/reads';

export type UsePublicationByIdArgs = {
  publicationId: PublicationId;
};

export type UsePublicationByTxHashArgs = {
  txHash: string;
};

/**
 * {@link useProfile} hook arguments
 */
export type UsePublicationArgs = XOR<UsePublicationByIdArgs, UsePublicationByTxHashArgs>;

/**
 * @category Publications
 * @group Hooks
 */
export function usePublication({
  publicationId,
  txHash,
}: UsePublicationArgs): ReadResult<AnyPublication, NotFoundError | UnspecifiedError> {
  const { data, error, loading } = useReadResult(
    usePublicationHook(
      useLensApolloClient({
        variables: useMediaTransformFromConfig(
          useProfileStatsArgFromConfig({
            request: {
              forId: publicationId,
              forTxHash: txHash,
            },
          }),
        ),
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
      }),
    ),
  );

  if (loading) {
    return {
      data: undefined,
      error: undefined,
      loading: true,
    };
  }

  if (error) {
    return {
      data: undefined,
      error,
      loading: false,
    };
  }

  if (data === null) {
    return {
      data: undefined,
      error: new NotFoundError(`Publication with id or txHash: ${publicationId ?? txHash}`),
      loading: false,
    };
  }

  return {
    data,
    error: undefined,
    loading: false,
  };
}
