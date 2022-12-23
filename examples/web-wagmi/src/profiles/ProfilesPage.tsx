import { LinkCard } from '../components/LinkCard';

const profileHooks = [
  {
    label: 'useExploreProfiles',
    description: `Explore different profiles.`,
    path: '/profiles/useExploreProfiles',
  },
  {
    label: 'useProfile',
    description: `Explore different profiles.`,
    path: '/profiles/useProfile',
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
