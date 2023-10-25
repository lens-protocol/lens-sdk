import { useLogout } from '@lens-protocol/react-web';

export function LogoutButton() {
  const { execute } = useLogout();

  const logout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    void execute();
  };

  return (
    <a href="#" onClick={logout}>
      Log out
    </a>
  );
}
