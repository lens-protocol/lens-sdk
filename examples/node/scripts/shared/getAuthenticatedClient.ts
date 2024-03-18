import { LensClient, development } from '@lens-protocol/client';
import { Wallet } from 'ethers';

import { getFirstManagedProfileId } from './getFirstManagedProfileId';

/**
 * Initialize a LensClient with the provided wallet and first available profileId or provided profileId
 *
 * @param wallet - Wallet instance to authenticate with
 * @param profileId - Optional Profile ID to authenticate with
 * @returns Authenticated instance of LensClient
 */
export async function getAuthenticatedClient(
  wallet: Wallet,
  profileId?: string,
): Promise<LensClient> {
  const client = new LensClient({
    environment: development,
  });
  const address = await wallet.getAddress();
  const requestProfileId = profileId ?? (await getFirstManagedProfileId(client, address));

  const { id, text } = await client.authentication.generateChallenge({
    signedBy: address,
    for: requestProfileId,
  });
  const signature = await wallet.signMessage(text);

  await client.authentication.authenticate({ id, signature });

  return client;
}
