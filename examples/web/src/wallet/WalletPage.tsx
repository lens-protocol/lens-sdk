import { LinkCard } from '../components/LinkCard';

const hooks = [
  {
    label: 'useProfilesManaged',
    description: 'Fetch a list of profiles managed by a wallet',
    path: '/wallet/useProfilesManaged',
  },
  {
    label: 'useOwnedHandles & useLinkHandle & useUnlinkHandle',
    description: `Link and unlink handle from a profile.`,
    path: '/wallet/useOwnedHandles',
  },
  {
    label: 'useLastLoggedInProfile',
    description: 'Fetch the last logged in profile for a wallet address.',
    path: '/wallet/useLastLoggedInProfile',
  },
  {
    label: 'useRateLimits',
    description: 'Fetch sponsored transaction limits.',
    path: '/wallet/useRateLimits',
  },
];

export function WalletPage() {
  return (
    <div>
      <h1>Wallet</h1>

      {hooks.map((link) => (
        <LinkCard key={link.path} {...link} />
      ))}
    </div>
  );
}
