import { LinkCard } from '../components/LinkCard';

const revenueHooks = [
  {
    label: 'usePublicationRevenue',
    description: `Fetch the revenue of a publication`,
    path: '/revenue/usePublicationRevenue',
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
