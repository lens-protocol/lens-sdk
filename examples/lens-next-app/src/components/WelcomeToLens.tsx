import { SessionType, useSession as useLensSession } from "@lens-protocol/react-web";
import { useAccount as useWagmiAccount } from "wagmi";

import { ConnectWalletButton } from "./ConnectWalletButton";
import { LoginForm } from "./LoginForm";
import { LogoutButton } from "./LogoutButton";
import { truncateEthAddress } from "@/utils/truncateEthAddress";
import { DisconnectWalletButton } from "./DisconnectWalletButton";

export function WelcomeToLens() {
  const { isConnected, address } = useWagmiAccount();
  const { data: session } = useLensSession();

  // step 1. connect wallet
  if (!isConnected) {
    return (
      <>
        <p className="mb-4 text-gray-500">Connect your wallet to get started.</p>
        <ConnectWalletButton />
      </>
    );
  }

  // step 2. connect Lens Profile
  if (!session?.authenticated && address) {
    return (
      <>
        <p className="mb-4 text-gray-500">Connected wallet: {truncateEthAddress(address)}</p>
        <LoginForm owner={address} />

        <div className="mt-2">
          <DisconnectWalletButton />
        </div>
      </>
    );
  }

  // step 3. show Profile details
  if (session && session.type === SessionType.WithProfile) {
    return (
      <>
        <p className="mb-4 text-gray-500">
          You are logged in as{" "}
          <span className="text-gray-800 font-semibold">
            {session.profile.handle?.fullHandle ?? session.profile.id}
          </span>
          .
        </p>
        <LogoutButton />
      </>
    );
  }

  // you can handle other session types here
  return null;
}
