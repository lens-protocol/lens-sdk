import { LinkCard } from '../components/LinkCard';

const discoveryHooks = [
  {
    label: 'useFeed',
    description: `View the feed for a profile.`,
    path: '/discovery/useFeed',
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
