import { LinkCard } from '../components/LinkCard';

const profileHooks = [
  {
    label: 'useProfile',
    description: `Get a profile by the profile id or by its handle.`,
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
