import { useLogout } from "@lens-protocol/react-web";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "./Button";

export function LogoutButton() {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { execute } = useLogout();

  const logout = () => {
    void execute();
    disconnect();
  };

  if (!isConnected) {
    return null;
  }

  return <Button onClick={() => logout()}>Log out</Button>;
}
