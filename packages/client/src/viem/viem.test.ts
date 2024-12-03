import { testnet } from '@lens-protocol/env';
import { describe, expect, it } from 'vitest';

import { chains } from '@lens-network/sdk/viem';
import { evmAddress, uri } from '@lens-protocol/types';
import { http, createWalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { handleWith } from '.';
import { post } from '../actions/post';
import { PublicClient } from '../clients';

const walletClient = createWalletClient({
  account: privateKeyToAccount(import.meta.env.PRIVATE_KEY),
  chain: chains.testnet,
  transport: http(),
});

const owner = evmAddress(walletClient.account.address);
const app = evmAddress(import.meta.env.TEST_APP);
const account = evmAddress(import.meta.env.TEST_ACCOUNT);

const publicClient = PublicClient.create({
  environment: testnet,
  origin: 'http://example.com',
});

describe('Given an integration with viem', () => {
  describe('When handling transaction actions', () => {
    it('Then it should be possible to chain them with other helpers', async () => {
      const authenticated = await publicClient.login({
        accountOwner: { account, app, owner },
        signMessage: (message: string) => walletClient.signMessage({ message }),
      });
      const sessionClient = authenticated._unsafeUnwrap();

      const result = await post(sessionClient, {
        contentUri: uri('https://devnet.irys.xyz/3n3Ujg3jPBHX58MPPqYXBSQtPhTgrcTk4RedJgV1Ejhb'),
      })
        .andThen(handleWith(walletClient))
        .andThen(sessionClient.waitForTransaction);

      expect(result.isOk(), result.isErr() ? result.error.message : undefined).toBe(true);
    });
  });
});
