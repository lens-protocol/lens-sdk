import {
  ProfileGuardianResult,
  useProfileGuardian as useUnderlyingQuery,
} from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';

import { useLensApolloClient } from '../helpers/arguments';
import { ReadResult, useReadResult } from '../helpers/reads';

export type UseProfileGuardianArgs = {
  profileId: ProfileId;
};

export type { ProfileGuardianResult };

/**
 * `useProfileGuardian` is a hook that lets you read the Profile Guardian settings of a given Profile
 *
 * You MUST be authenticated via {@link useWalletLogin} to use this hook.
 *
 * @experimental This hook is experimental and may change in future releases
 *
 * @category Profiles
 * @group Hooks
 *
 * @param args - {@link UseProfileGuardianArgs}
 *
 * @example
 * ```tsx
 * import { ProfileId, useProfileGuardian } from '@lens-protocol/react-web';
 *
 * function ProfileGuardianSettings({ profileId }: { profileId: ProfileId }) {
 *   const { data, loading, error } = useProfileGuardian({ profileId });
 *
 *   if (loading) {
 *     return <p>Loading...</p>;
 *   }
 *
 *   if (error) {
 *     return <p>Error: {error.message}</p>;
 *   }
 *
 *   return (
 *     <>
 *       <p>
 *         Protected: <strong>{data.protected ? 'YES' : 'NO'}</strong>
 *       </p>
 *       <p>
 *         Cooldown Period ends on: <strong>{data.disablingProtectionTimestamp}</strong>
 *       </p>
 *     </>
 *   );
 * }
 * ```
 */
export function useProfileGuardian({
  profileId,
}: UseProfileGuardianArgs): ReadResult<ProfileGuardianResult> {
  return useReadResult(
    useUnderlyingQuery(
      useLensApolloClient({
        variables: {
          request: {
            profileId,
          },
        },
      }),
    ),
  );
}
