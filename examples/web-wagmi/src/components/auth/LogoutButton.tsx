import { useWalletLogout } from '@lens-protocol/react-web';
import { useDisconnect } from 'wagmi';

export function LogoutButton() {
  const { execute: logout, isPending: isLogoutPending } = useWalletLogout();

  const { disconnectAsync } = useDisconnect();

  const onLogoutClick = async () => {
    await logout();
    await disconnectAsync();
  };

  return (
    <button onClick={onLogoutClick} disabled={isLogoutPending}>
      <strong>Log out</strong>
    </button>
  );
}
