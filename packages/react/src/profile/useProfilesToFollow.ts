import { useProfilesToFollow as useUnderlyingQuery } from '@lens-protocol/api-bindings';

import {
  useActiveProfileAsDefaultObserver,
  useLensApolloClient,
  useMediaTransformFromConfig,
  useSourcesFromConfig,
  WithObserverIdOverride,
} from '../helpers/arguments';
import { useReadResult } from '../helpers/reads';

export type UseProfilesToFollowArgs = WithObserverIdOverride;

/**
 * `useProfilesToFollow` is an hook that returns a short-list of profiles that you may want to follow.
 *
 * In case the user is logged-in, the list is personalized for them using ML algorithms.
 *
 * @category Profiles
 * @group Hooks
 * @param args - {@link UseProfilesToFollowArgs}
 *
 * @example
 *
 * ```tsx
 * import { useProfilesToFollow } from '@lens-protocol/react-web';
 *
 * function ProfilesToFollow() {
 *   const { data, error, loading } = useProfilesToFollow();
 *
 *   if (loading) return <p>Loading...</p>;
 *
 *   if (error) return <p>Error: {error.message}</p>;
 *
 *   return (
 *     <ul>
 *       {data.map((profile) => (
 *         <li key={profile.id}>{profile.handle}</li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 */
export function useProfilesToFollow({ observerId }: UseProfilesToFollowArgs = {}) {
  return useReadResult(
    useUnderlyingQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useMediaTransformFromConfig(
            useSourcesFromConfig({
              observerId,
            }),
          ),
        }),
      ),
    ),
  );
}
