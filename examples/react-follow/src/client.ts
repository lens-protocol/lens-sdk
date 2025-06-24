import { fetchAccountsAvailable } from '@lens-protocol/client/actions';
import {
  assertOk,
  invariant,
  PublicClient,
  testnet,
} from '@lens-protocol/react';
import { signMessageWith } from '@lens-protocol/react/viem';

import { walletClient } from './wallet';

export const client = PublicClient.create({
  environment: testnet,
  storage: window.localStorage,
});

const result = await client.resumeSession().orElse(() =>
  fetchAccountsAvailable(client, {
    managedBy: walletClient.account.address,
  }).andThen(({ items }) => {
    invariant(items.length > 0, 'No available accounts found');

    const loginAs =
      items[0].__typename === 'AccountOwned'
        ? {
            accountOwner: {
              owner: walletClient.account.address,
              account: items[0].account.address,
            },
          }
        : {
            accountManager: {
              manager: walletClient.account.address,
              account: items[0].account.address,
            },
          };

    return client.login({
      ...loginAs,
      signMessage: signMessageWith(walletClient),
    });
  }),
);

assertOk(result);
