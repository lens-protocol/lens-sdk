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

  const result = await client.frames.signFrameAction({
    transactionId: '0x0000000000000000000000000000000000000000',
    buttonIndex: 2,
    inputText: 'Hello, World!',
    account: profileId,
    post: '0x01-0x01',
    specVersion: '1.1.0',
    state: '{"counter":1,"idempotency_key":"431b8b38-eb4d-455b"}',
    url: 'https://mylensframe.xyz',
    app: '0x0000000000000000000000000000000000000000',
    deadline: new Date(Date.now() + 30 * 60 * 1000).getTime()
  });

  if (result.isFailure()) {
    console.error(result.error); // CredentialsExpiredError or NotAuthenticatedError
    process.exit(1);
  }

  const data = result.value;
  const verifyResult = await client.frames.verifyFrameSignature({
    identityToken,
    signature: data.signature,
    signedTypedData: data.signedTypedData,
  });
  console.log('Is signature valid? ', verifyResult === FrameVerifySignatureResult.Verified);
}

main();
