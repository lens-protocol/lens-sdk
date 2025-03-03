import { beforeAll, describe, it } from 'vitest';

import * as storage from '@lens-chain/storage-client';
import type { Account } from '@lens-protocol/graphql';
import * as metadata from '@lens-protocol/metadata';
import { assertOk, never, uri } from '@lens-protocol/types';

import { createAccountWithUsername, fetchAccount, setAccountMetadata } from './actions/account';
import type { SessionClient } from './clients';
import { chain, loginAsOnboardingUser, wallet } from './test-utils';
import { handleOperationWith } from './viem';

describe('Given an instance of the StorageClient bound to staging', { timeout: 10000 }, () => {
  const storageClient = storage.StorageClient.create(storage.staging);
  let newAccount: Account;
  let sessionClient: SessionClient;

  beforeAll(async () => {
    const initialMetadata = metadata.account({
      name: 'John Doe',
    });
    const result = await loginAsOnboardingUser().andThen((sessionClient) =>
      createAccountWithUsername(sessionClient, {
        username: { localName: `testname${Date.now()}` },
        metadataUri: uri(`data:application/json,${JSON.stringify(initialMetadata)}`), // empty at first
      })
        .andThen(handleOperationWith(wallet))
        .andThen(sessionClient.waitForTransaction)
        .andThen((txHash) => fetchAccount(sessionClient, { txHash }))
        .andThen((account) => {
          newAccount = account ?? never('Account not found');
          return sessionClient.switchAccount({
            account: newAccount.address,
          });
        }),
    );

    assertOk(result);

    sessionClient = result.value;
  });

  describe('When I upload a file from one region', () => {
    it('Then it should be accessible from the Lens API in another region', async () => {
      const updated = metadata.account({
        name: 'Bruce Wayne',
      });
      const resource = await storageClient.uploadAsJson(updated, {
        acl: storage.immutable(chain.id),
      });
      const result = await setAccountMetadata(sessionClient, {
        metadataUri: resource.uri,
      });

      assertOk(result);
    });
  });
});
