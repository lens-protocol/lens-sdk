import { describe, it } from 'vitest';

import { assertOk, uri } from '@lens-protocol/types';
import { post } from '../actions/post';
import { handleOperationWith } from './signer';

import { Network, Wallet, getDefaultProvider } from '@lens-chain/sdk/ethers';
import { loginAsAccountOwner } from '../test-utils';

// biome-ignore lint/suspicious/noExplicitAny: needs a fix in @lens-chain/sdk
const wallet = new Wallet(import.meta.env.PRIVATE_KEY, getDefaultProvider(Network.Testnet) as any);

describe(`Given the '${handleOperationWith.name}' helper for ethers.js`, { timeout: 10000 }, () => {
  describe('When handling the result of a transaction mutation', () => {
    it('Then it should be possible to chain them with other helpers', async () => {
      const result = await loginAsAccountOwner().andThen((sessionClient) =>
        post(sessionClient, {
          contentUri: uri('https://devnet.irys.xyz/3n3Ujg3jPBHX58MPPqYXBSQtPhTgrcTk4RedJgV1Ejhb'),
        })
          .andThen(handleOperationWith(wallet))
          .andThen(sessionClient.waitForTransaction),
      );

      assertOk(result);
    });
  });
});
