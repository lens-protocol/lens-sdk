import {
  isProfileOwnedByMe,
  ProfileOwnedByMeFragment,
  UnspecifiedError,
  useGetProfileQuery,
} from '@lens-protocol/api-bindings';
import { invariant } from '@lens-protocol/shared-kernel';

import { useConfigSourcesVariable, useLensApolloClient } from '../helpers/arguments';
import { ReadResult } from '../helpers/reads';
import { useActiveProfileIdentifier } from './useActiveProfileIdentifier';

export function useActiveProfile(): ReadResult<ProfileOwnedByMeFragment | null, UnspecifiedError> {
  const { data: identifier, loading: bootstrapping } = useActiveProfileIdentifier();

  const { data, error, loading } = useGetProfileQuery(
    useLensApolloClient({
      variables: useConfigSourcesVariable({
        request: {
          profileId: identifier?.id,
        },
      }),
      fetchPolicy: 'cache-first',
      skip: bootstrapping || identifier === null,
    }),
  );

  if (bootstrapping) {
    return {
      data: undefined,
      error: undefined,
      loading: true,
    };
  }

  if (identifier === null) {
    return {
      data: null,
      error: undefined,
      loading: false,
    };
  }

  if (loading || data === undefined) {
    return {
      data: undefined,
      error: undefined,
      loading: true,
    };
  }

  if (error) {
    return {
      data: undefined,
      error: new UnspecifiedError(error),
      loading: false,
    };
  }

  invariant(data.result, 'Profile not found.');
  invariant(isProfileOwnedByMe(data.result), 'Profile not owned by the active wallet.');

  return {
    data: data.result,
    error: undefined,
    loading: false,
  };
}
