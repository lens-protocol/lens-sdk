import { LensClient, development, isRelaySuccess } from '@lens-protocol/client';

import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function getNewAccessToken() {
  const wallet = setupWallet();
  const temp = await getAuthenticatedClient(wallet);
  const result = await temp.authentication.getAccessToken();
  if (result.isFailure()) {
    throw result.error;
  }
  return result.value;
}

async function main() {
  const client = new LensClient({
    environment: development,
  });

  const overwriteAccessToken = await getNewAccessToken();

  console.log(`The client is authenticated: `, await client.authentication.isAuthenticated());
  console.log(`The request will be overwritten with accessToken: `, overwriteAccessToken);

  const contentURI = 'https://arweave.net/Ff8hn9iT0RXG3S_l0_AbYRb1OzY-4WS9QDRsEHBQpgw';

  const result = await client.publication.postOnchain(
    {
      contentURI,
    },
    {
      accessToken: overwriteAccessToken,
    },
  );

  const resultValue = result.unwrap();

  if (!isRelaySuccess(resultValue)) {
    console.log(`Something went wrong`, resultValue);
    return;
  }

  console.log(`Transaction was successfully broadcasted with txId`, resultValue.txId);
}

main();
