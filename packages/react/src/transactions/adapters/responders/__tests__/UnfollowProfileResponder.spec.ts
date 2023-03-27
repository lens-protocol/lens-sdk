import { InMemoryCache } from '@apollo/client';
import { FragmentProfile } from '@lens-protocol/api-bindings';
import { mockProfileFragment, mockProfileStatsFragment } from '@lens-protocol/api-bindings/mocks';
import {
  mockBroadcastedTransactionData,
  mockUnfollowRequest,
  mockWalletData,
} from '@lens-protocol/domain/mocks';
import { UnfollowRequest } from '@lens-protocol/domain/use-cases/profile';
import { BroadcastedTransactionData } from '@lens-protocol/domain/use-cases/transactions';
import { WalletData } from '@lens-protocol/domain/use-cases/wallets';

import { UnfollowProfileResponder } from '../UnfollowProfileResponder';

function setupTestScenario({
  transactionData,
}: {
  transactionData: BroadcastedTransactionData<UnfollowRequest>;
  walletData: WalletData;
}) {
  const apolloCache = new InMemoryCache({
    addTypename: true,
  });

  const existingProfile = mockProfileFragment({
    id: transactionData.request.profileId,
    stats: mockProfileStatsFragment({
      totalFollowers: 1,
    }),
  });

  apolloCache.writeFragment({
    id: apolloCache.identify({
      __typename: 'Profile',
      id: existingProfile.id,
    }),
    fragment: FragmentProfile,
    fragmentName: 'Profile',
    data: existingProfile,
  });

  const responder = new UnfollowProfileResponder(apolloCache);

  return {
    existingProfile,

    responder,

    get profileCache() {
      return apolloCache.readFragment({
        id: apolloCache.identify({
          __typename: 'Profile',
          id: transactionData.request.profileId,
        }),
        fragment: FragmentProfile,
        fragmentName: 'Profile',
      });
    },
  };
}

describe(`Given the ${UnfollowProfileResponder.name}`, () => {
  describe(`when "${UnfollowProfileResponder.prototype.commit.name}" method is invoked`, () => {
    it(`should update apollo cache with new unfollow information`, async () => {
      const walletData = mockWalletData();
      const request = mockUnfollowRequest();
      const transactionData = mockBroadcastedTransactionData({ request });
      const scenario = setupTestScenario({ transactionData, walletData });

      await scenario.responder.commit(transactionData);

      expect(scenario.profileCache).toEqual(
        expect.objectContaining({
          id: scenario.existingProfile.id,
          stats: {
            ...scenario.existingProfile.stats,
            totalFollowers: scenario.existingProfile.stats.totalFollowers - 1,
          },
        }),
      );
    });
  });
});
