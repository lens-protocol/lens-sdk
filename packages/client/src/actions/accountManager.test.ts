import { beforeAll, describe, expect, it } from 'vitest';

import { type Account, assertTypename } from '@lens-protocol/graphql';
import * as metadata from '@lens-protocol/metadata';
import { assertOk, never, uri } from '@lens-protocol/types';
import type { SessionClient } from '../clients';
import { loginAsOnboardingUser, storageClient, wallet } from '../test-utils';
import { handleOperationWith } from '../viem';
import {
  createAccountWithUsername,
  enableSignless,
  fetchAccount,
  setAccountMetadata,
} from './account';
import { fetchMeDetails } from './authentication';

describe('Given a new Lens Account', () => {
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

  describe(`When invoking the '${enableSignless.name}' action`, () => {
    beforeAll(async () => {
      const result = await enableSignless(sessionClient)
        .andThen(handleOperationWith(wallet))
        .andThen(sessionClient.waitForTransaction);
      assertOk(result);
    });
    it(`Then it should be reflected in the '${fetchMeDetails.name}' action result`, async () => {
      const result = await fetchMeDetails(sessionClient);

      assertOk(result);
      expect(result.value).toMatchObject({
        isSignless: true,
      });
    });

    it.skip('Then it should be possible to perform social operations in a signless fashion (e.g., updating Account metadata)', async () => {
      const updated = metadata.account({
        name: 'Bruce Wayne',
      });
      const resource = await storageClient.uploadAsJson(updated);

      const result = await setAccountMetadata(sessionClient, {
        metadataUri: resource.uri,
      });

      assertOk(result);
      assertTypename(result.value, 'SetAccountMetadataResponse');
      console.log(result.value.hash);
      await sessionClient.waitForTransaction(result.value.hash);

      const account = await fetchAccount(sessionClient, { address: newAccount.address }).unwrapOr(
        null,
      );

      expect(account).toMatchObject({
        metadata: {
          name: 'Bruce Wayne',
        },
      });
    });
  });
});
