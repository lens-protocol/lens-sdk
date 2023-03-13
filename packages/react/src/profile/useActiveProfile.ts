import {
  isProfileOwnedByMe,
  ProfileOwnedByMeFragment,
  UnspecifiedError,
  useGetProfileQuery,
} from '@lens-protocol/api-bindings';
import { invariant } from '@lens-protocol/shared-kernel';

import { ReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';
import { useActiveProfileIdentifier } from './useActiveProfileIdentifier';

export function useActiveProfile(): ReadResult<ProfileOwnedByMeFragment | null, UnspecifiedError> {
  const { data: identifier, loading: bootstrapping } = useActiveProfileIdentifier();
  const { apolloClient, sources } = useSharedDependencies();

  const { data, error, loading } = useGetProfileQuery({
    variables: {
      request: {
        profileId: identifier?.id,
      },
      sources,
    },
    fetchPolicy: 'cache-first',
    skip: bootstrapping || identifier === null,
    client: apolloClient,
  });

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
