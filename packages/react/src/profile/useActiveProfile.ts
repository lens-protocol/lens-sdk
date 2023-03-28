import {
  isProfileOwnedByMe,
  ProfileOwnedByMe,
  UnspecifiedError,
  useGetProfile,
} from '@lens-protocol/api-bindings';
import { invariant } from '@lens-protocol/shared-kernel';

import { useSourcesFromConfig, useLensApolloClient } from '../helpers/arguments';
import { ReadResult } from '../helpers/reads';
import { useActiveProfileIdentifier } from './useActiveProfileIdentifier';

/**
 * `useActiveProfile` is a hook that lets you retrieve the active profile
 *
 * **Pro-tip**: use the profile instance returned by this hook to perform actions
 * that require a ProfileOwnedByMe instances (e.g. {@link useCollect}, {@link useFollow}).
 *
 * @category Profiles
 * @group Hooks
 *
 * @example
 * ```tsx
 * import { useActiveProfile } from '@lens-protocol/react-web';
 *
 * function ActiveProfile() {
 *   const { data, error, loading } = useActiveProfile();
 *
 *   if (loading) return <p>Loading...</p>;
 *
 *   if (error) return <p>Error: {error.message}</p>;
 *
 *   if (data === null) return <p>No active profile</p>;
 *
 *   return (
 *     <div>
 *       <p>Active profile: {data.handle}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useActiveProfile(): ReadResult<ProfileOwnedByMe | null, UnspecifiedError> {
  const { data: identifier, loading: bootstrapping } = useActiveProfileIdentifier();

  const { data, error, loading } = useGetProfile(
    useLensApolloClient({
      variables: useSourcesFromConfig({
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
