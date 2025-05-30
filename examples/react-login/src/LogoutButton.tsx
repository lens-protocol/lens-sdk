import { useLogout } from '@lens-protocol/react';
import { useDisconnect } from 'wagmi';

export function LogoutButton() {
  const { execute } = useLogout();
  const { disconnectAsync } = useDisconnect();

  const onClick = async () => {
    await execute();
    await disconnectAsync();
  };

  return (
    <button type='button' onClick={onClick}>
      Logout
    </button>
  );
}
