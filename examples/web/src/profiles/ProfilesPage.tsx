import { LinkCard } from '../components/LinkCard';

const profileHooks = [
  {
    label: 'useProfile',
    description: `Fetch a single profile.`,
    path: '/profiles/useProfile',
  },
  {
    label: 'useLazyProfile',
    description: `Lazy fetch a single profile.`,
    path: '/profiles/useLazyProfile',
  },
  {
    label: 'useProfiles',
    description: `Fetch a list of profiles.`,
    path: '/profiles/useProfiles',
  },
  {
    label: 'useProfileFollowers',
    description: `Fetch a list of profile followers.`,
    path: '/profiles/useProfileFollowers',
  },
  {
    label: 'useProfileFollowing',
    description: `Fetch a list of profile following.`,
    path: '/profiles/useProfileFollowing',
  },
  {
    label: 'useMutualFollowers',
    description: `Fetch a list of mutual followers between profiles.`,
    path: '/profiles/useMutualFollowers',
  },
  {
    label: 'useRecommendedProfiles',
    description: `Fetch a list of recommended profiles.`,
    path: '/profiles/useRecommendedProfiles',
  },
  {
    label: 'useWhoActedOnPublication',
    description: `Fetch a list of profiles who acted on a publication.`,
    path: '/profiles/useWhoActedOnPublication',
  },
  {
    label: 'useProfileActionHistory',
    description: `Fetch profile action history.`,
    path: '/profiles/useProfileActionHistory',
  },
  {
    label: 'useProfileManagers',
    description: `Fetch a list of profile managers.`,
    path: '/profiles/useProfileManagers',
  },
  {
    label: 'useUpdateProfileManagers',
    description: `Update the Profile Manager configuration for the logged-in Profile.`,
    path: '/profiles/useUpdateProfileManagers',
  },
  {
    label: 'useSetProfileMetadata',
    description: `Set the metadata for the authenticated Profile.`,
    path: '/profiles/useSetProfileMetadata',
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
