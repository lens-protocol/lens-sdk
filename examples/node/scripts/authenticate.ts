import LensClient, { mumbai } from "@lens-protocol/client";
import { setupWallet } from "./shared/setupWallet";

async function main() {
  const lensClient = new LensClient({
    environment: mumbai,
  });

  const wallet = setupWallet();
  const address = await wallet.getAddress();

  const challenge = await lensClient.authentication.generateChallenge(address);
  const signature = await wallet.signMessage(challenge);

  await lensClient.authentication.authenticate(address, signature);

  console.log(`Is LensClient authenticated? :`, await lensClient.authentication.isAuthenticated());
}

main();
