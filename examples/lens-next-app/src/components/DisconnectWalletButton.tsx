import { useAccount, useDisconnect } from "wagmi";
import { ButtonAlt } from "./Button";

export function DisconnectWalletButton() {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    disconnect();
  };

  if (!isConnected) {
    return null;
  }

  return <ButtonAlt onClick={handleClick}>Disconnect</ButtonAlt>;
}
