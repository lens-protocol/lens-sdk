import { LensClient, development } from "@lens-protocol/client";
import { setupWallet } from "./shared/setupWallet";

async function main() {
  const lensClient = new LensClient({
    environment: development,
    storage: {
      getItem: async (key: string) => {
        const value = localStorage.getItem(key);
        return localStorage.getItem(key);
      },
      setItem: async (key: string, value: string) => {
        localStorage.setItem(key, value);
      },
      removeItem: async (key: string) => {
        localStorage.removeItem(key);
      },
    },
  });

  const wallet = setupWallet();
  const address = await wallet.getAddress();

  const challenge = await lensClient.authentication.generateChallenge(address);
  const signature = await wallet.signMessage(challenge);

  await lensClient.authentication.authenticate(address, signature);

  const accessTokenResult = await lensClient.authentication.getAccessToken();
  const accessToken = accessTokenResult.unwrap();

  console.log(`Is LensClient authenticated? `, await lensClient.authentication.isAuthenticated());
  console.log(`Access token: `, accessToken);
  console.log(`Is access token valid? `, await lensClient.authentication.verify(accessToken));
}

main();
