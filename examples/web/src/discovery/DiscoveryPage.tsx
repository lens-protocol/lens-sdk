import { LinkCard } from '../components/LinkCard';

const discoveryHooks = [
  {
    label: 'useFeed',
    description: `Fetch the feed of a profile matching given filters.`,
    path: '/discovery/useFeed',
  },
  {
    label: 'useFeedHighlights',
    description: `Fetch the highlights of a feed for a profile matching given filters.`,
    path: '/discovery/useFeedHighlights',
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
  {
    label: 'useExploreProfiles',
    description: 'Explore profiles using filters.',
    path: '/discovery/useExploreProfiles',
  },
  {
    label: 'useExplorePublications',
    description: 'Explore publications using filters.',
    path: '/discovery/useExplorePublications',
  },
  {
    label: 'useRecommendedProfiles & useDismissRecommendedProfiles',
    description: 'Fetch a list of recommended profiles. Dismiss a recommendation.',
    path: '/discovery/useRecommendedProfiles',
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
