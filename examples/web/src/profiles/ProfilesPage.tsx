import { LinkCard } from '../components/LinkCard';

const profileHooks = [
  {
    label: 'useProfile',
    description: `Fetch a single profile.`,
    path: '/profiles/useProfile',
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
