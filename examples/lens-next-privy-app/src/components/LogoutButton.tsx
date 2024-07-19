import { useLogout } from "@lens-protocol/react-web";
import { useAccount } from "wagmi";
import { Button } from "./Button";

export function LogoutButton() {
  const { isConnected } = useAccount();
  const { execute } = useLogout();

  const logout = async () => {
    void execute();
  };

  if (!isConnected) {
    return null;
  }

  return <Button onClick={() => logout()}>Log out</Button>;
}
