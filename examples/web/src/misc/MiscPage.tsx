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
    label: 'useLatestPaidActions',
    description: `List all the latest paid actions for the authenticated profile.`,
    path: '/misc/useLatestPaidActions',
  },
  {
    label: 'useClaimHandle',
    description: `Allows to claim an handle for a whitelisted address.`,
    path: '/misc/useClaimHandle',
  },
  {
    label: 'useInviteWallets & useInvitedProfiles',
    description: `Invite wallets to Lens and check the invite status.`,
    path: '/misc/useInviteWallets',
  },
  {
    label: 'useResolveAddress',
    description: `Resolves and EVM address from a Lens Handle.`,
    path: '/misc/useResolveAddress',
  },
  {
    label: 'useValidateHandle',
    description: `Validate the proposed handle before profile creation.`,
    path: '/misc/useValidateHandle',
  },
  {
    label: 'useSignFrameAction',
    description: `Sign a frame action and prepare it to be validated by frame server.`,
    path: '/misc/useSignFrameAction',
  },
  {
    label: 'LensClient interoperability',
    description: `Test ReactHooks SDK and Client SDK interoperability.`,
    path: '/misc/lensClientInteroperability',
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
