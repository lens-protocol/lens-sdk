import { ProfileId } from '@lens-protocol/domain/entities';
import { success } from '@lens-protocol/shared-kernel';

import { Operation, useOperation } from '../helpers/operations';
import { useSwitchActiveProfileController } from './adapters/useSwitchActiveProfileController';

export type ActiveProfileSwitchOperation = Operation<void, never, [ProfileId]>;

/**
 * `useActiveProfileSwitch` is a hook that lets you switch the active profile
 *
 * **Pro-tip**: use this in combination with {@link useActiveProfile} and {@link useProfilesOwnedByMe}
 * to create a profile switcher interface.
 *
 * @category Profiles
 * @group Hooks
 *
 * @example Profile switcher interface
 * ```tsx
 * import { EthereumAddress, useActiveProfileSwitch, useActiveProfile, useProfilesOwnedByMe } from '@lens-protocol/react-web';
 *
 * function ProfileSwitcher({ address }: { address: EthereumAddress }) {
 *   const { data: activeProfile } = useActiveProfile();
 *   const { execute: switchActiveProfile } = useActiveProfileSwitch();
 *   const { data: profiles, error, loading } = useProfilesOwnedByMe({ address, limit: 50 });
 *
 *   if (loading) return <p>Loading...</p>;
 *
 *   if (error) return <p>Error: {error.message}</p>;
 *
 *   return (
 *     <div>
 *       <p>Active profile: {activeProfile?.handle}</p>
 *       <ul>
 *         {profiles.map((profile) => (
 *           <li key={profile.id}>
 *             <button
 *               onClick={() => {
 *                 switchActiveProfile(profile.id);
 *               }}
 *             >
 *               {profile.handle}
 *             </button>
 *           </li>
 *         ))}
 *       </ul>
 *     </div>
 *   );
 * }
 * ```
 */
export function useActiveProfileSwitch(): ActiveProfileSwitchOperation {
  const switchActiveProfile = useSwitchActiveProfileController();

  return useOperation(async (profileId: ProfileId) => {
    await switchActiveProfile({ profileId });
    return success();
  });
}
