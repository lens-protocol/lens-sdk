import { LensClient, development } from '@lens-protocol/client';
import { Wallet } from 'ethers';
import { WalletClient } from 'viem';

export async function getOwnedProfileId(client: LensClient, address: string) {
  const ownedProfiles = await client.profile.fetchAll({ where: { ownedBy: [address] } });

  if (ownedProfiles.items.length === 0) {
    throw new Error(`You don't have any profiles, create one first`);
  }

  return ownedProfiles.items[0].id;
}

export async function getAuthenticatedClientFromEthersWallet(wallet: Wallet): Promise<LensClient> {
  const client = new LensClient({
    environment: development,
  });
  const address = await wallet.getAddress();
  const profileId = await getOwnedProfileId(client, address);

  const { id, text } = await client.authentication.generateChallenge({
    signedBy: address,
    for: profileId,
  });
  const signature = await wallet.signMessage(text);

  await client.authentication.authenticate({ id, signature });

  return client;
}

export async function getAuthenticatedClientFromViemWalletClient(walletClient: WalletClient) {
  const client = new LensClient({
    environment: development,
  });
  const address = walletClient.account.address;
  const profileId = await getOwnedProfileId(client, address);

  const { id, text } = await client.authentication.generateChallenge({
    signedBy: address,
    for: profileId,
  });
  const signature = await walletClient.signMessage({ account: address, message: text });

  await client.authentication.authenticate({ id, signature });

  return client;
}
