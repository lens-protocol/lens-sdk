import { FrameVerifySignatureResult } from '@lens-protocol/client';

import { getAuthenticatedClient } from '../shared/getAuthenticatedClient';
import { setupWallet } from '../shared/setupWallet';

async function main() {
  const wallet = setupWallet();
  const client = await getAuthenticatedClient(wallet);
  const profileId = await client.authentication.getProfileId();

  if (!profileId) {
    throw new Error('Profile not authenticated');
  }

  const identityTokenResult = await client.authentication.getIdentityToken();
  const identityToken = identityTokenResult.unwrap();

  // get signature
  const result = await client.frames.signFrameAction({
    actionResponse: '0x0000000000000000000000000000000000000000',
    buttonIndex: 2,
    inputText: 'Hello, World!',
    profileId: profileId,
    pubId: '0x01-0x01',
    specVersion: '1.0.0',
    state: '{"counter":1,"idempotency_key":"431b8b38-eb4d-455b"}',
    url: 'https://mylensframe.xyz',
  });

  if (result.isFailure()) {
    console.error(result.error); // CredentialsExpiredError or NotAuthenticatedError
    process.exit(1);
  }

  const data = result.value;

  // verify
  const verifyResult = await client.frames.verifyFrameSignature({
    identityToken,
    signature: data.signature,
    signedTypedData: data.signedTypedData,
  });

  console.log(`Is signature valid? `, verifyResult === FrameVerifySignatureResult.Verified);
}

main();
