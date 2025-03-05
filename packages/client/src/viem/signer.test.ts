import { describe, expect, it } from 'vitest';

import { chains } from '@lens-chain/sdk/viem';
import { uri } from '@lens-protocol/types';
import { http, createWalletClient } from 'viem';
import { handleOperationWith } from '.';
import { post } from '../actions/post';
import { loginAsAccountOwner, signer } from '../test-utils';

const walletClient = createWalletClient({
  account: signer,
  chain: chains.testnet,
  transport: http(),
});

describe(`Given the '${handleOperationWith.name}' helper for viem`, { timeout: 10000 }, () => {
  describe('When handling the result of a transaction action', () => {
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
