import { immutable } from '@lens-chain/storage-client';
import { type Account, assertTypename } from '@lens-protocol/graphql';
import * as metadata from '@lens-protocol/metadata';
import { assertOk, never, uri } from '@lens-protocol/types';
import { beforeAll, describe, expect, it } from 'vitest';
import type { SessionClient } from '../clients';
import {
  CHAIN,
  loginAsOnboardingUser,
  storageClient,
  wallet,
} from '../test-utils';
import { handleOperationWith } from '../viem';
import {
  createAccountWithUsername,
  fetchAccount,
  setAccountMetadata,
} from './account';
import { fetchMeDetails } from './authentication';

describe(
  `Given the '${createAccountWithUsername.name}' action`,
  { timeout: 10000 },
  () => {
    let newAccount: Account;
    let sessionClient: SessionClient;

    beforeAll(async () => {
      const initialMetadata = metadata.account({
        name: 'John Doe',
      });
      const result = await loginAsOnboardingUser().andThen((sessionClient) =>
        createAccountWithUsername(sessionClient, {
          username: { localName: `testname${Date.now()}` },
          metadataUri: uri(
            `data:application/json,${JSON.stringify(initialMetadata)}`,
          ), // empty at first
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

    describe('When creating a new Account', () => {
      it('Then it should have Signless enabled by default', async () => {
        const result = await fetchMeDetails(sessionClient);

        assertOk(result);
        expect(result.value).toMatchObject({
          isSignless: true,
        });
      });

      it('Then it should be able to perform social operations in a signless fashion (e.g., updating Account metadata)', async () => {
        const updated = metadata.account({
          name: 'Bruce Wayne',
        });
        const resource = await storageClient.uploadAsJson(updated, {
          acl: immutable(CHAIN.id),
        });
        const result = await setAccountMetadata(sessionClient, {
          metadataUri: resource.uri,
        });

        assertOk(result);
        assertTypename(result.value, 'SetAccountMetadataResponse');
        await sessionClient.waitForTransaction(result.value.hash);

        const account = await fetchAccount(sessionClient, {
          address: newAccount.address,
        }).unwrapOr(null);

        expect(account).toMatchObject({
          metadata: {
            name: 'Bruce Wayne',
          },
        });
      });
    });
  },
);
