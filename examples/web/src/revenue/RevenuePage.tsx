import { LinkCard } from '../components/LinkCard';

const revenueHooks = [
  {
    label: 'useRevenueFromFollow',
    description: `Fetch a revenue of a profile from all follow actions.`,
    path: '/revenue/useRevenueFromFollow',
  },
  {
    label: 'useRevenueFromPublication',
    description: `Fetch a profile's revenue from a single publication.`,
    path: '/revenue/useRevenueFromPublication',
  },
  {
    label: 'useRevenueFromPublications',
    description: `Fetch a profile's revenue for all their publications.`,
    path: '/revenue/useRevenueFromPublications',
  },
];

export function RevenuePage() {
  return (
    <div>
      <h1>Revenue</h1>

      {revenueHooks.map((link) => (
        <LinkCard key={link.path} {...link} />
      ))}
    </div>
  );
}
