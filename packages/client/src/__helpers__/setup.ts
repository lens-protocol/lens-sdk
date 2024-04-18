import { Wallet } from '@ethersproject/wallet';
import { invariant, never, UnknownObject } from '@lens-protocol/shared-kernel';

import { LensClient } from '../LensClient';
import { ProfileFragment } from '../graphql';
import { isRelaySuccess } from '../submodules';
import { BundlrUploader } from './BundlrUploader';

export async function createOrGetProfile(signer: Wallet, client: LensClient, handle: string) {
  const fullHandle = `lens/${handle}`;
  const profile = await client.profile.fetch({ forHandle: fullHandle });

  if (profile) {
    return profile;
  }

  const profileCreateResult = await client.wallet.createProfileWithHandle({
    handle,
    to: signer.address,
  });

  if (isRelaySuccess(profileCreateResult)) {
    await client.transaction.waitUntilComplete({ forTxId: profileCreateResult.txId });
  }

  const result = await client.profile.fetch({ forHandle: fullHandle });

  return result ?? never('Profile not found');
}

export async function authenticate(signer: Wallet, client: LensClient, profile?: ProfileFragment) {
  const { id, text } = await client.authentication.generateChallenge({
    signedBy: signer.address,
    for: profile?.id,
  });

  const signature = await signer.signMessage(text);

  await client.authentication.authenticate({ id, signature });
}

export async function enableLensProfileManager(
  signer: Wallet,
  client: LensClient,
  profile: ProfileFragment,
) {
  if (!profile.signless) {
    invariant(
      profile.id === (await client.authentication.getProfileId()),
      `Cannot setup Lens Profile Manager for ${profile.id}. It's not the authenticated profile.`,
    );

    const result = await client.profile.createChangeProfileManagersTypedData({
      approveSignless: true,
    });

    const data = result.unwrap();

    if ('id' in data) {
      const signedTypedData = await signer._signTypedData(
        data.typedData.domain,
        data.typedData.types,
        data.typedData.value,
      );

      const broadcastResult = await client.transaction.broadcastOnchain({
        id: data.id,
        signature: signedTypedData,
      });

      const broadcastResultValue = broadcastResult.unwrap();

      invariant(isRelaySuccess(broadcastResultValue), 'Broadcast failed');

      await client.transaction.waitUntilComplete({ forTxId: broadcastResultValue.txId });
    }
  }
}

export async function postOnchainViaLensManager(
  signer: Wallet,
  client: LensClient,
  metadata: UnknownObject,
) {
  const contentURI = await new BundlrUploader(signer).upload(metadata);
  const result = await client.publication.postOnchain({
    contentURI,
    openActionModules: [
      {
        collectOpenAction: {
          simpleCollectOpenAction: {
            collectLimit: '1',
            followerOnly: false,
          },
        },
      },
    ],
  });

  const value = result.unwrap();
  invariant(isRelaySuccess(value), 'Broadcast failed');
  await client.transaction.waitUntilComplete({ forTxId: value.txId });

  const publication = await client.publication.fetch({ forTxHash: value.txHash });

  invariant(
    publication && publication.__typename === 'Post',
    `Publication for tx hash ${String(value.txHash)} NOT found. This is likely an API issue.`,
  );

  return publication;
}
