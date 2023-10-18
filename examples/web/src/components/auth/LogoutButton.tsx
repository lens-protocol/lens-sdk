import { useLogout } from '@lens-protocol/react-web';

export function LogoutButton() {
  const { execute: logout } = useLogout();
  return (
    <a href="javascript:false" onClick={() => logout()}>
      Log out
    </a>
  );
}
