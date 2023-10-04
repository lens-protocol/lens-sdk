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
