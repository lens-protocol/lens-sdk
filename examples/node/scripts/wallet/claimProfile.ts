import { LensClient, development, isRelaySuccess } from '@lens-protocol/client';

import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const address = await wallet.getAddress();
  const client = new LensClient({
    environment: development,
  });

  // authenticate with wallet only
  const { id, text } = await client.authentication.generateChallenge({
    signedBy: address,
  });
  const signature = await wallet.signMessage(text);
  await client.authentication.authenticate({ id, signature });

  // check if can claim a profile
  const claimableProfilesResult = await client.wallet.claimableProfiles();
  const claimableProfilesValue = claimableProfilesResult.unwrap();

  if (!claimableProfilesValue.canMintProfileWithFreeTextHandle) {
    console.log(`Wallet ${address} cannot claim a profile.`);
    return;
  }

  // claim a profile
  const handle = Date.now().toString();
  const claimProfileResult = await client.wallet.claimProfile({
    freeTextHandle: handle,
  });
  const claimProfileValue = claimProfileResult.unwrap();

  if (!isRelaySuccess(claimProfileValue)) {
    console.log(`Something went wrong`, claimProfileValue);
    return;
  }

  console.log(
    `Transaction to claim a profile with handle "${handle}" was successfully broadcasted with txId`,
    claimProfileValue.txId,
  );

  console.log(`Waiting for the transaction to be indexed...`);
  await client.transaction.waitUntilComplete({ forTxId: claimProfileValue.txId });

  const allOwnedProfiles = await client.profile.fetchAll({
    where: {
      ownedBy: [address],
    },
  });

  console.log(
    `All owned profiles by wallet ${address}: `,
    allOwnedProfiles.items.map((i) => ({ id: i.id, handle: i.handle })),
  );
}

main();
