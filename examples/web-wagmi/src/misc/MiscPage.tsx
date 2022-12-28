import { LinkCard } from '../components/LinkCard';

const miscHooks = [
  {
    label: 'useCurrencies',
    description: `View all the ERC20 tokens supported by the Lens protocol.`,
    path: '/misc/useCurrencies',
  },
  {
    label: 'useNotifications',
    description: `View notifications for the active profile.`,
    path: '/misc/useNotifications',
  },
  {
    label: 'useUnreadNotificationCount',
    description: `View the total unread notification count for the active profile.`,
    path: '/misc/useUnreadNotificationCount',
  },
];

export function MiscPage() {
  return (
    <div>
      <h1>Misc</h1>

      {miscHooks.map((link) => (
        <LinkCard key={link.path} {...link} />
      ))}
    </div>
  );
}
