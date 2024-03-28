import { LensClient, development } from '@lens-protocol/client';

import { setupWallet } from '../shared/setupWallet';

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const wallet = setupWallet();
  const address = await wallet.getAddress();

  const { id, text } = await client.authentication.generateChallenge({
    signedBy: address,
  });
  const signature = await wallet.signMessage(text);

  await client.authentication.authenticate({ id, signature });

  const accessTokenResult = await client.authentication.getAccessToken();
  const accessToken = accessTokenResult.unwrap();

  const walletAddress = await client.authentication.getWalletAddress();

  console.log(`Is LensClient authenticated? `, await client.authentication.isAuthenticated());
  console.log(`Authenticated wallet: `, walletAddress);
  console.log(`Access token: `, accessToken);
  console.log(`Is access token valid? `, await client.authentication.verify({ accessToken }));
}

main();
