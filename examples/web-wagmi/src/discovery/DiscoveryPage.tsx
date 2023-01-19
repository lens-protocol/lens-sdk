import { LinkCard } from '../components/LinkCard';

const discoveryHooks = [
  {
    label: 'useFeed',
    description: `View the feed for a profile.`,
    path: '/discovery/useFeed',
  },
  {
    label: 'useExploreProfiles',
    description: `Explore different profiles.`,
    path: '/discovery/useExploreProfiles',
  },
  {
    label: 'useExplorePublications',
    description: `Explore publications that match certain criteria.`,
    path: '/discovery/useExplorePublications',
  },
  {
    label: 'useSearchProfiles',
    description: `Fetch profiles that match a search query`,
    path: '/discovery/useSearchProfiles',
  },
  {
    label: 'useSearchPublications',
    description: `Fetch publications that match a search query`,
    path: '/discovery/useSearchPublications',
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
