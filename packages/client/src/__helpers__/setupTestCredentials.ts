import { Authentication, Credentials } from '../authentication';
import { mumbaiSandbox } from '../consts/environments';
import { setupTestWallet } from './setupTestWallet';

const testConfig = {
  environment: mumbaiSandbox,
};

let credentials: Credentials;

export async function setupTestCredentials() {
  if (credentials) {
    return credentials;
  }

  const wallet = setupTestWallet();
  const auth = new Authentication(testConfig);
  const address = await wallet.getAddress();
  const challenge = await auth.challenge(address);
  const signature = await wallet.signMessage(challenge);

  credentials = await auth.authenticate(address, signature);

  return credentials;
}
