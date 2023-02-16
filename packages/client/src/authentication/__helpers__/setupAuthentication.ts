import { Wallet } from 'ethers';

import { mumbaiSandbox } from '../../consts/environments';
import { Authentication } from '../Authentication';
import { setupTestWallet } from './setupTestWallet';

const testConfig = {
  environment: mumbaiSandbox,
};

export function setupAuthentication() {
  let auth: Authentication;

  beforeAll(async () => {
    const wallet = setupTestWallet();
    auth = new Authentication(testConfig);
    const address = await wallet.getAddress();
    const challenge = await auth.generateChallenge(address);
    const signature = await wallet.signMessage(challenge);

    await auth.authenticate(address, signature);
  });

  return () => auth;
}

export function setupRandomAuthentication() {
  let authRandom: Authentication;

  beforeAll(async () => {
    const wallet = Wallet.createRandom();
    authRandom = new Authentication(testConfig);
    const address = await wallet.getAddress();
    const challenge = await authRandom.generateChallenge(address);
    const signature = await wallet.signMessage(challenge);

    await authRandom.authenticate(address, signature);
  });

  return () => authRandom;
}
