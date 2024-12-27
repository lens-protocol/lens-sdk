import { beforeAll, describe, expect, it } from 'vitest';

import { type Account, assertTypename } from '@lens-protocol/graphql';
import * as metadata from '@lens-protocol/metadata';
import { assertOk, never, uri } from '@lens-protocol/types';
import { loginAsOnboardingUser, signerWallet, storageClient } from '../../testing-utils';
import type { SessionClient } from '../clients';
import { handleWith } from '../viem';
import {
  createAccountWithUsername,
  enableSignless,
  fetchAccount,
  setAccountMetadata,
} from './account';
import { fetchMeDetails } from './authentication';

const walletClient = signerWallet();
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
        .andThen(handleWith(walletClient))
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
        .andThen(handleWith(walletClient))
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

    it('Then it should be possible to perform social operations in a signless fashion (e.g., updating Account metadata)', async () => {
      const updated = metadata.account({
        name: 'Bruce Wayne',
      });
      const resource = await storageClient.uploadAsJson(updated);

      const result = await setAccountMetadata(sessionClient, {
        metadataUri: resource.uri,
      });

      assertOk(result);

      assertTypename(result.value, 'SetAccountMetadataResponse');
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
