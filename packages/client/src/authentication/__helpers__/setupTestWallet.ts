import { invariant } from '@lens-protocol/shared-kernel';
import * as dotenv from 'dotenv';
import { Wallet } from 'ethers';

dotenv.config();

export function setupTestWallet() {
  invariant(process.env.CLIENT_TEST_WALLET_PRIVATE_KEY, 'Private key is not defined in .env file');

  return new Wallet(process.env.CLIENT_TEST_WALLET_PRIVATE_KEY);
}

export const testWalletProfileId = '0x0185';
