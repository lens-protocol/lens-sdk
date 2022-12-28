import { LinkCard } from '../components/LinkCard';

const revenueHooks = [
  {
    label: 'useCurrencies',
    description: `View all the ERC20 tokens supported by the Lens protocol.`,
    path: '/revenue/useCurrencies',
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
