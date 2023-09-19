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
  const lensClient = new LensClient({
    environment: development,
  });
  const address = await wallet.getAddress();
  const profileId = await getOwnedProfileId(lensClient, address);

  const { id, text } = await lensClient.authentication.generateChallenge({
    signedBy: address,
    for: profileId,
  });
  const signature = await wallet.signMessage(text);

  await lensClient.authentication.authenticate({ id, signature });

  return lensClient;
}

export async function getAuthenticatedClientFromViemWalletClient(walletClient: WalletClient) {
  const lensClient = new LensClient({
    environment: development,
  });
  const address = walletClient.account.address;
  const profileId = await getOwnedProfileId(lensClient, address);

  const { id, text } = await lensClient.authentication.generateChallenge({
    signedBy: address,
    for: profileId,
  });
  const signature = await walletClient.signMessage({ account: address, message: text });

  lensClient.authentication.authenticate({ id, signature });

  return lensClient;
}
