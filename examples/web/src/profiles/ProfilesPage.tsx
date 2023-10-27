import { LinkCard } from '../components/LinkCard';

const profileHooks = [
  {
    label: 'useProfile',
    description: 'Fetch a single profile.',
    path: '/profiles/useProfile',
  },
  {
    label: 'useLazyProfile',
    description: 'Lazy fetch a single profile.',
    path: '/profiles/useLazyProfile',
  },
  {
    label: 'useProfiles',
    description: 'Fetch a list of profiles.',
    path: '/profiles/useProfiles',
  },
  {
    label: 'useProfileFollowers',
    description: 'Fetch a list of profile followers.',
    path: '/profiles/useProfileFollowers',
  },
  {
    label: 'useProfileFollowing',
    description: 'Fetch a list of profile following.',
    path: '/profiles/useProfileFollowing',
  },
  {
    label: 'useMutualFollowers',
    description: 'Fetch a list of mutual followers between profiles.',
    path: '/profiles/useMutualFollowers',
  },
  {
    label: 'useFollow & useUnfollow',
    description: 'Follow and unfollow a profile.',
    path: '/profiles/useFollow',
  },
  {
    label: 'useRecommendedProfiles',
    description: 'Fetch a list of recommended profiles.',
    path: '/profiles/useRecommendedProfiles',
  },
  {
    label: 'useWhoActedOnPublication',
    description: 'Fetch a list of profiles who acted on a publication.',
    path: '/profiles/useWhoActedOnPublication',
  },
  {
    label: 'useProfileActionHistory',
    description: 'Fetch profile action history.',
    path: '/profiles/useProfileActionHistory',
  },
  {
    label: 'useProfileManagers',
    description: 'Fetch a list of profile managers.',
    path: '/profiles/useProfileManagers',
  },
  {
    label: 'useUpdateProfileManagers',
    description: 'Update the Profile Manager configuration for the logged-in Profile.',
    path: '/profiles/useUpdateProfileManagers',
  },
  {
    label: 'useSetProfileMetadata',
    description: 'Set the metadata for the authenticated Profile.',
    path: '/profiles/useSetProfileMetadata',
  },
  {
    label: 'useUpdateFollowPolicy',
    description: 'Update the follow policy for the logged-in Profile.',
    path: '/profiles/useUpdateFollowPolicy',
  },
  {
    label: 'useUnblockProfiles',
    description: `Unblock profiles.`,
    path: '/profiles/useUnblockProfiles',
  },
  {
    label: 'useOwnedHandles',
    // label: 'useOwnedHandles & useLinkHandle & useUnlinkHandle',
    // description: `Link and unlink handle from a profile.`,
    description: `Fetch all handles owned by a wallet.`,
    path: '/profiles/useOwnedHandles',
  },
  {
    label: 'useBlockProfiles & useUnblockProfiles',
    description: 'Block profiles from the active profile.',
    path: '/profiles/useBlockProfiles',
  },
];

export function ProfilesPage() {
  return (
    <div>
      <h1>Profiles</h1>

      {profileHooks.map((link) => (
        <LinkCard key={link.path} {...link} />
      ))}
    </div>
  );
}
