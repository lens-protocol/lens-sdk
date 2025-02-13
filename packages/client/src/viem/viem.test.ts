import { describe, expect, it } from 'vitest';

import { chains } from '@lens-network/sdk/viem';
import { uri } from '@lens-protocol/types';
import { http, createWalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { handleOperationWith } from '.';
import { post } from '../actions/post';
import { loginAsAccountOwner } from '../test-utils';

const walletClient = createWalletClient({
  account: privateKeyToAccount(import.meta.env.PRIVATE_KEY),
  chain: chains.testnet,
  transport: http(),
});

describe.skip('Given an integration with viem', { timeout: 10000 }, () => {
  describe('When handling transaction actions', () => {
    it('Then it should be possible to chain them with other helpers', async () => {
      const result = await loginAsAccountOwner().andThen((sessionClient) =>
        post(sessionClient, {
          contentUri: uri('https://devnet.irys.xyz/3n3Ujg3jPBHX58MPPqYXBSQtPhTgrcTk4RedJgV1Ejhb'),
        })
          .andThen(handleOperationWith(walletClient))
          .andThen(sessionClient.waitForTransaction),
      );

      expect(result.isOk(), result.isErr() ? result.error.message : undefined).toBe(true);
    });
  });
});
