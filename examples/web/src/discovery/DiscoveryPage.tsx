import { LinkCard } from '../components/LinkCard';

const discoveryHooks = [
  {
    label: 'useFeed',
    description: `Fetch the feed of a profile matching given filters.`,
    path: '/discovery/useFeed',
  },
  {
    label: 'useSearchPublications',
    description: 'Search for publications using filters.',
    path: '/discovery/useSearchPublications',
  },
  {
    label: 'useSearchProfiles',
    description: 'Search for profiles using filters.',
    path: '/discovery/useSearchProfiles',
  },
];

export function DiscoveryPage() {
  return (
    <div>
      <h1>Discovery</h1>

      {discoveryHooks.map((link) => (
        <LinkCard key={link.path} {...link} />
      ))}
    </div>
  );
}
