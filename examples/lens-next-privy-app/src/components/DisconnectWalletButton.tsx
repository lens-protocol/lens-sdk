import { usePrivy } from "@privy-io/react-auth";
import { ButtonAlt } from "./Button";

export function DisconnectWalletButton() {
  const { ready, logout, authenticated } = usePrivy();

  return ready ? (
    !authenticated ? null : (
      <ButtonAlt onClick={logout}>Disconnect Wallet</ButtonAlt>
    )
  ) : (
    <ButtonAlt disabled>Loading...</ButtonAlt>
  );
}
