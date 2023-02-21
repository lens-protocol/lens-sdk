import { PostFragment, WalletFragment } from '@lens-protocol/api-bindings';
import {
  createMockApolloClientWithMultipleResponses,
  mockPostFragment,
  mockProfileFragment,
  mockWalletFragment,
  createWhoCollectedPublicationQueryMockedResponse,
  mockSources,
} from '@lens-protocol/api-bindings/mocks';
import { waitFor } from '@testing-library/react';

import { renderHookWithMocks } from '../../__helpers__/testing-library';
import { useWhoCollectedPublication } from '../useWhoCollectedPublication';

const sources = mockSources();

describe('Given the useWhoCollectedPublication hook', () => {
  const observer = mockProfileFragment();
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
            sources,
            apolloClient: createMockApolloClientWithMultipleResponses([
              createWhoCollectedPublicationQueryMockedResponse({
                variables: {
                  publicationId: mockPublication.id,
                  observerId: observer.id,
                  limit: 10,
                  sources,
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
