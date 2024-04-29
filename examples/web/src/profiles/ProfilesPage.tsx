import { LinkCard } from '../components/LinkCard';

const profileHooks = [
  {
    label: 'useCreateProfile',
    description: 'Create a new Profile.',
    path: '/profiles/useCreateProfile',
  },
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
    label: 'useLazyProfiles',
    description: 'Lazy fetch a list of profiles.',
    path: '/profiles/useLazyProfiles',
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
    description: 'Update the profile manager configuration.',
    path: '/profiles/useUpdateProfileManagers',
  },
  {
    label: 'useSetProfileMetadata',
    description: 'Set the metadata for the authenticated Profile.',
    path: '/profiles/useSetProfileMetadata',
  },
  {
    label: 'useUpdateFollowPolicy',
    description: 'Update the follow policy.',
    path: '/profiles/useUpdateFollowPolicy',
  },
  {
    label: 'useBlockProfiles & useUnblockProfiles',
    description: 'Block and unblock profiles.',
    path: '/profiles/useBlockProfiles',
  },
  {
    label: 'useBlockedProfiles',
    description: 'Fetch profiles that have been blocked.',
    path: '/profiles/useBlockedProfiles',
  },
  {
    label: 'useReportProfile',
    description: 'Report a profile.',
    path: '/profiles/useReportProfile',
  },
  {
    label: 'useRecommendProfileToggle',
    description: 'Recommend a profile.',
    path: '/profiles/useRecommendProfileToggle',
  },
  {
    label: 'useProfileInterests',
    description: 'Add and remove profile interests.',
    path: '/profiles/useProfileInterests',
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
