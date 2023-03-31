import { LensClient, development } from "@lens-protocol/client";
import { Wallet } from "ethers";

export async function getAuthenticatedClient(wallet: Wallet): Promise<LensClient> {
  const lensClient = new LensClient({
    environment: development,
  });

  const address = await wallet.getAddress();

  const challenge = await lensClient.authentication.generateChallenge(address);
  const signature = await wallet.signMessage(challenge);

  await lensClient.authentication.authenticate(address, signature);

  return lensClient;
}
