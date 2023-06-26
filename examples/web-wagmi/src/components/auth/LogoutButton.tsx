import { useWalletLogout } from '@lens-protocol/react-web';
import { useClient } from '@xmtp/react-sdk';
import { useDisconnect } from 'wagmi';

export function LogoutButton() {
  const { execute: logout, isPending: isLogoutPending } = useWalletLogout();
  const { disconnect: disconnectXmtp } = useClient();

  const { disconnectAsync } = useDisconnect();

  const onLogoutClick = async () => {
    disconnectXmtp();
    await logout();
    await disconnectAsync();
  };

  return (
    <button onClick={onLogoutClick} disabled={isLogoutPending}>
      <strong>Log out</strong>
    </button>
  );
}
