import { testnet } from '@lens-protocol/env';
import { afterAll, beforeAll, describe, it } from 'vitest';

import { assertOk, evmAddress, uri } from '@lens-protocol/types';
import { handleWith } from '.';
import { post } from '../actions/post';
import { PublicClient } from '../clients';

import { Network, Wallet, getDefaultProvider } from '@lens-network/sdk/ethers';
import { TestLock } from '../../testing-utils';

// biome-ignore lint/suspicious/noExplicitAny: needs a fix in @lens-network/sdk
const wallet = new Wallet(import.meta.env.PRIVATE_KEY, getDefaultProvider(Network.Testnet) as any);

const owner = evmAddress(wallet.address);
const app = evmAddress(import.meta.env.TEST_APP);
const account = evmAddress(import.meta.env.TEST_ACCOUNT);

const publicClient = PublicClient.create({
  environment: testnet,
  origin: 'http://example.com',
});

describe('Given an integration with ethers.js', () => {
  beforeAll(async () => {
    await TestLock.acquire('post');
  });

  afterAll(() => {
    TestLock.release('post');
  });

  describe('When handling transaction actions', () => {
    it.sequential('Then it should be possible to chain them with other helpers', async () => {
      const authenticated = await publicClient.login({
        accountOwner: { account, app, owner },
        signMessage: (message: string) => wallet.signMessage(message),
      });
      const sessionClient = authenticated._unsafeUnwrap();

      const result = await post(sessionClient, {
        contentUri: uri('https://devnet.irys.xyz/3n3Ujg3jPBHX58MPPqYXBSQtPhTgrcTk4RedJgV1Ejhb'),
      })
        .andThen(handleWith(wallet))
        .andThen(sessionClient.waitForTransaction);

      assertOk(result);
    });
  });
});
