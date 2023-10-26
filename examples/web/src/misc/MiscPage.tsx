import { LinkCard } from '../components/LinkCard';

const hooks = [
  {
    label: 'useNotifications',
    description: `Fetch notifications for the active profile.`,
    path: '/misc/useNotifications',
  },
  {
    label: 'useCurrencies',
    description: `Fetch ERC20 tokens that are enabled on the Lens protocol.`,
    path: '/misc/useCurrencies',
  },
  {
    label: 'useApproveModule',
    description: `Pre-approves an ERC20 spend on a given collect/follow module.`,
    path: '/misc/useApproveModule',
  },
  {
    label: 'useClaimHandle',
    description: `Allows to claim an handle for a whitelisted address.`,
    path: '/misc/useClaimHandle',
  },
];

export function MiscPage() {
  return (
    <div>
      <h1>Misc</h1>

      {hooks.map((link) => (
        <LinkCard key={link.path} {...link} />
      ))}
    </div>
  );
}
