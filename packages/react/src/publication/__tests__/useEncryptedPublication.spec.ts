import {
  mockEncryptedFieldsOutputFragment,
  mockEncryptionParamsOutputFragment,
  mockEoaOwnershipAccessCondition,
  mockMetadataOutputFragment,
  mockPostFragment,
  mockProfileFragment,
} from '@lens-protocol/api-bindings/mocks';
import { webCryptoProvider } from '@lens-protocol/gated-content/web';
import { InMemoryStorageProvider } from '@lens-protocol/storage';
import { act, waitFor } from '@testing-library/react';
import { Wallet } from 'ethers';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { staging } from '../../environments';
import { useActiveWalletSigner } from '../../wallet';
import { useEncryptedPublication } from '../useEncryptedPublication';

jest.mock('../../wallet/useActiveWalletSigner');

describe(`Given the "${useEncryptedPublication.name}" hook`, () => {
  describe('when the provided publication is NOT gated', () => {
    const post = mockPostFragment({
      isGated: false,
    });

    beforeAll(() => {
      jest
        .mocked(useActiveWalletSigner)
        .mockReturnValue({ loading: false, data: Wallet.createRandom() });
    });

    it('should just return publication with no loading state', async () => {
      const { result } = renderHookWithMocks(() =>
        useEncryptedPublication({
          encryption: {
            authentication: {
              domain: 'localhost',
              uri: 'https://localhost/login',
            },
            provider: webCryptoProvider(),
          },
          publication: post,
        }),
      );

      expect(result.current.data).toEqual(post);
    });
  });

  describe('when the provided publication is gated', () => {
    // This test has a lot of hardcoded values. It's relatively safe
    // to assume that the underlying data is immutable, even though on Mumbai.
    const signer = new Wallet('0xcc268eda1086b6c71f811801bd4a3f96e3c95ddde2d44b4ebb0554e800d353d2'); // address: 0x6E7c8Ea196E54Ca38C9A074374D6e39a84727536
    const profile = mockProfileFragment({
      id: '0xa6',
    });

    const post = mockPostFragment({
      isGated: true,
      profile,
      metadata: mockMetadataOutputFragment({
        encryptionParams: mockEncryptionParamsOutputFragment({
          ownerId: profile.id,
          others: [
            mockEoaOwnershipAccessCondition({
              address: signer.address,
            }),
          ],
          encryptionKey:
            'e689da704a53fe9c56698e11be4a4f9f04a1bd36c5149f894df98fc2637df83b8bbdf495d8a47b882c17e900b688f110fc2762772e1437f165b6c416e990bde072842b46f4376e2dd3051c228870a877dd99800924a364be22320340441b6d8863ebab2892d4102a14c060b222c61c8b7f47c670232670505389fd4a983205c000000000000000207171294fc14c9e6996f89eaac7bf36d30a3abb415595fd9e4d329eee6490349a134b5291fe25f167f3cded81ae8231b4',
          encryptedFields: mockEncryptedFieldsOutputFragment({
            content:
              '_ef7pOheqo9WZyZglm5eaqPGrJmNr_eZmeoVIIQGZUXRRpoZ7gcL8PJQBTsOMweZFpIqdTFk9ug2X9Cyw07yQrZuQ4d-BmTJ3k19mPb-YSistE4GiRKC74mTyjas882KKc8Og9nML1WwlJdCesFfxOTeOucyWKspGozIkJoG99cMjD_keMLGN6NdAi9A6pj9_beRaN5GjL8AzU0_0VqBJjM_j7dn4OxRqfoAzt9d2LTX7t3UUAwuNG5W_oJNuc_44Z8ojU0DNzsiHzrLsV_yCOFJO9X_L3I-GDCDLmR-dzJGwwNbss0FjfQvuMc8RzOSkeoEc1mGRW4wz20pGFY8VNJoqA1a--ILF_kVUevSi4HPdoubuVPkPvBecWBKM0VWw42zp63qY5YgnjIROk7AQgGxDNaLtBeIFo92syiOEZ3FAyHpCCcrxQbJ89tdSS1mNKe2xf0E4JT5j4k48NSL2Neq-3XLiRGcbUAHYlOpflc=',
          }),
        }),
      }),
    });

    beforeAll(() => {
      jest.mocked(useActiveWalletSigner).mockReturnValue({ loading: false, data: signer });
    });

    // This test is disabled due to the fact the Lit SDK runs in a browser environment because of jsdom
    // we cannot switch jest environment to node because react testing library relies on a DOM to be present.
    // Ideally a future version od the Lit Protocol SDK will make a better distinction between the browser and node
    // and we could attempt to run this test so that Lit can take advantage of the node environment.
    xit('should allow to decrypt the metadata if the user matches the access condition criteria', async () => {
      const { result } = renderHookWithMocks(
        () =>
          useEncryptedPublication({
            encryption: {
              authentication: {
                domain: 'localhost',
                uri: 'https://localhost/login',
              },
              provider: webCryptoProvider(),
            },
            publication: post,
          }),
        {
          mocks: {
            environment: staging,
            storageProvider: new InMemoryStorageProvider(),
          },
        },
      );

      await act(async () => {
        result.current.decrypt();
      });

      await waitFor(() => expect(result.current.isPending).toBe(false), { timeout: 15_000 });

      expect(result.current.data.metadata.content).toEqual('[insert decrypted content here]');
    }, 15_000);
  });
});
