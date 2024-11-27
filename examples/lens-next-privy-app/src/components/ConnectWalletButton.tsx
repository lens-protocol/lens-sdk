import { Button } from "./Button";
import { usePrivy } from "@privy-io/react-auth";
import { truncateEthAddress } from "@/utils/truncateEthAddress";
import { useAccount } from "wagmi";

export function ConnectWalletButton() {
  const { ready, authenticated, login } = usePrivy();
  const { address } = useAccount();

  return !ready ? (
    <Button disabled>Loading...</Button>
  ) : (
    <Button onClick={login}>
      {authenticated ? truncateEthAddress(address) : "Connect Wallet"}
    </Button>
  );
}
