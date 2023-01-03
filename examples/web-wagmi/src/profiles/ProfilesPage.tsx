import { LinkCard } from '../components/LinkCard';

const profileHooks = [
  {
    label: 'useExploreProfiles',
    description: `Explore different profiles.`,
    path: '/profiles/useExploreProfiles',
  },
  {
    label: 'useProfile (by handle)',
    description: `Fetch a profile by the profile handle.`,
    path: '/profiles/useProfile-handle',
  },
  {
    label: 'useProfile (by id)',
    description: `Fetch a profile by the profile id.`,
    path: '/profiles/useProfile-id',
  },
  {
    label: 'useProfilesToFollow',
    description: `Get a list of recommended profiles.`,
    path: '/profiles/useProfilesToFollow',
  },
  {
    label: 'useMutualFollowers',
    description: `Get a list of mutual followers between accounts.`,
    path: '/profiles/useMutualFollowers',
  },
  {
    label: 'useFollow',
    description: `Follow a profile.`,
    path: '/profiles/useFollow',
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
