import { ProfileOwnedByMe, SessionType, UnspecifiedError } from '@lens-protocol/api-bindings';

import { ReadResult } from '../helpers/reads';
import { useCurrentSession } from '../lifecycle/useCurrentSession';

/**
 * `useActiveProfile` is a hook that lets you retrieve the active profile
 *
 * **Pro-tip**: Use the profile instance returned by this hook to perform actions
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
  const { data: session, error, loading: bootstrapping } = useCurrentSession();

  if (bootstrapping) {
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

  if (session.type !== SessionType.WithProfile) {
    return {
      data: null,
      error: undefined,
      loading: false,
    };
  }

  return {
    data: session.profile,
    error: undefined,
    loading: false,
  };
}
