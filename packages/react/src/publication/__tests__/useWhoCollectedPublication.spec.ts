import { PostFragment, WalletFragment } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockPostFragment,
  mockProfileFieldsFragment,
  mockWalletFragment,
  createWhoCollectedPublicationQueryMockedResponse,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { useWhoCollectedPublication } from '../useWhoCollectedPublication';

describe('Given the useWhoCollectedPublication hook', () => {
  const observer = mockProfileFieldsFragment();
  const mockPublication: PostFragment = mockPostFragment();
  const mockWallets: WalletFragment[] = [mockWalletFragment()];

  describe('when the query returns data successfully', () => {
    it('should return wallets who collected the publication', async () => {
      const { result } = renderHookWithMocks(
        () =>
          useWhoCollectedPublication({
            observerId: observer.id,
            publicationId: mockPublication.id,
          }),
        {
          mocks: {
            apolloClient: createMockApolloClientWithMultipleResponses([
              createWhoCollectedPublicationQueryMockedResponse({
                variables: {
                  publicationId: mockPublication.id,
                  observerId: observer.id,
                  limit: 10,
                },
                wallets: mockWallets,
              }),
            ]),
          },
        },
      );

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current.data).toEqual(mockWallets);
    });
  });
});
