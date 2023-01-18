import { LinkCard } from '../components/LinkCard';

const revenueHooks = [
  {
    label: 'usePublicationRevenue',
    description: `Fetch the revenue of a publication`,
    path: '/revenue/usePublicationRevenue',
  },
  {
    label: 'useProfileFollowRevenue',
    description: `Fetch the revenue of a profile made through it's following`,
    path: '/revenue/useProfileFollowRevenue',
  },
  {
    label: 'useProfilePublicationRevenue',
    description: `Fetch the publications of a profile that have revenue.`,
    path: '/revenue/useProfilePublicationRevenue',
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
