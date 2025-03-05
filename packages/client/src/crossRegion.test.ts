import { beforeEach, describe, expect, it } from 'vitest';

import * as storage from '@lens-chain/storage-client';
import type { Account } from '@lens-protocol/graphql';
import * as metadata from '@lens-protocol/metadata';
import { assertErr, assertOk, never } from '@lens-protocol/types';

import { createAccountWithUsername, fetchAccount, setAccountMetadata } from './actions/account';
import type { SessionClient } from './clients';
import { CHAIN, TEST_ACCOUNT, loginAsOnboardingUser, wallet } from './test-utils';
import { handleOperationWith } from './viem';

const storageClient = storage.StorageClient.create(storage.staging);
const acl = storage.lensAccountOnly(TEST_ACCOUNT, 37111);

describe('Given an instance of the StorageClient (bound to staging)', { timeout: 10000 }, () => {
  let initialFileResponse: storage.FileUploadResponse;
  let newAccount: Account;
  let sessionClient: SessionClient;

  const updates = metadata.account({
    name: 'Bruce Wayne',
  });

  beforeEach(async () => {
    const initialMetadata = metadata.account({
      name: 'John Doe',
    });
    initialFileResponse = await storageClient.uploadAsJson(initialMetadata, { acl });
    await initialFileResponse.waitForPropagation();
    const result = await loginAsOnboardingUser().andThen((sessionClient) =>
      createAccountWithUsername(sessionClient, {
        username: { localName: `testname${Date.now()}` },
        metadataUri: initialFileResponse.gatewayUrl,
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
  }, 20000);

  describe('When I upload a file from one region', () => {
    it('Then it should be accessible from the Lens API in another region', async () => {
      const response = await storageClient.uploadAsJson(updates, {
        acl: storage.immutable(CHAIN.id),
      });
      const result = await setAccountMetadata(sessionClient, {
        metadataUri: response.gatewayUrl,
      })
        .andThen(handleOperationWith(wallet))
        .andThen(sessionClient.waitForTransaction)
        .andThen((_) => fetchAccount(sessionClient, { address: newAccount.address }));

      assertOk(result);

      expect(result.value).toMatchObject({
        metadata: {
          name: updates.lens.name,
        },
      });
    });
  });

  describe('When I edit a file from one region', () => {
    it(
      'Then it should be accessible from the Lens API in another region',
      { timeout: 30000 },
      async () => {
        const response = await storageClient.updateJson(initialFileResponse.uri, updates, wallet, {
          acl,
        });
        await response.waitForPropagation();

        const result = await setAccountMetadata(sessionClient, {
          metadataUri: response.gatewayUrl,
        })
          .andThen(handleOperationWith(wallet))
          .andThen(sessionClient.waitForTransaction)
          .andThen((_) => fetchAccount(sessionClient, { address: newAccount.address }));

        assertOk(result);
        expect(result.value).toMatchObject({
          metadata: {
            name: updates.lens.name,
          },
        });
      },
    );
  });

  describe('When I delete a file from one region', () => {
    it(
      'Then it should no longer be accessible from the Lens API in another region',
      { timeout: 20000 },
      async () => {
        const response = await storageClient.delete(initialFileResponse.uri, wallet);
        expect(response).toHaveProperty('success', true);

        const result = await setAccountMetadata(sessionClient, {
          metadataUri: initialFileResponse.uri,
        })
          .andThen(handleOperationWith(wallet))
          .andThen(sessionClient.waitForTransaction);

        assertErr(result);
      },
    );
  });
});
