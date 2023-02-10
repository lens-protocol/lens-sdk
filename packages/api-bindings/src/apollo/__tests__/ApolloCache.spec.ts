import { ApolloCache, makeVar, ReactiveVar } from '@apollo/client';
import {
  mockUnconstrainedFollowRequest,
  mockUnfollowRequest,
  mockWalletData,
} from '@lens-protocol/domain/mocks';
import { WalletData } from '@lens-protocol/domain/use-cases/wallets';
import { never } from '@lens-protocol/shared-kernel';

import { ProfileFragment, ProfileFragmentDoc } from '../../graphql';
import {
  mockAttributeFragment,
  mockPendingTransactionState,
  mockProfileFragment,
} from '../../mocks';
import { createApolloCache } from '../createApolloCache';
import { recentTransactionsVar } from '../transactions';

function setupApolloCache({
  activeWalletVar = makeVar<WalletData | null>(null),
}: { activeWalletVar?: ReactiveVar<WalletData | null> } = {}) {
  const cache = createApolloCache({ activeWalletVar });

  return {
    writeProfileFragment(profile: ProfileFragment) {
      cache.writeFragment({
        data: profile,
        fragment: ProfileFragmentDoc,
        fragmentName: 'Profile',
      });
    },

    readProfileFragment(profile: ProfileFragment) {
      return (
        cache.readFragment<ProfileFragment>({
          fragment: ProfileFragmentDoc,
          fragmentName: 'Profile',
          id: cache.identify(profile),
        }) ?? never()
      );
    },
  };
}

describe(`Given an instance of the ${ApolloCache.name}`, () => {
  describe('and a ProfileFragment', () => {
    describe('when retrieving its attributes', () => {
      const date = new Date();
      const profile = mockProfileFragment({
        __attributes: [
          mockAttributeFragment({
            key: 'validDate',
            value: date.toISOString(),
          }),
          mockAttributeFragment({
            key: 'invalidDate',
            value: 'invalid',
          }),
          mockAttributeFragment({
            key: 'validNumber',
            value: '42',
          }),
          mockAttributeFragment({
            key: 'invalidNumber',
            value: '',
          }),
          mockAttributeFragment({
            key: 'string',
            value: 'NY',
          }),
          mockAttributeFragment({
            key: 'validBoolean',
            value: 'true',
          }),
          mockAttributeFragment({
            key: 'invalidBoolean',
            value: '1',
          }),
        ],
      });
      const { writeProfileFragment, readProfileFragment } = setupApolloCache();

      writeProfileFragment(profile);

      const read = readProfileFragment(profile);

      it('should allow to access date attributes as Date instances', () => {
        expect(read.attributes.validDate?.toDate()).toEqual(date);
      });

      it('should allow to access date attributes as string', () => {
        expect(read.attributes.validDate?.toString()).toEqual(date.toISOString());
      });

      it('should return null if attempting to access date attributes as Number', () => {
        expect(read.attributes.validDate?.toNumber()).toEqual(null);
      });

      it('should return null if parsing a date attribute fails', () => {
        expect(read.attributes.invalidDate?.toDate()).toBe(null);
      });

      it('should allow to access number attributes as Number', () => {
        expect(read.attributes.validNumber?.toNumber()).toEqual(42);
      });

      it('should allow to access number attributes as String', () => {
        expect(read.attributes.validNumber?.toString()).toEqual('42');
      });

      it('should return null if parsing a number attribute fails', () => {
        expect(read.attributes.invalidNumber?.toNumber()).toBe(null);
      });

      it('should allow to access boolean attributes as Boolean', () => {
        expect(read.attributes.validBoolean?.toBoolean()).toBe(true);
      });

      it('should return null if parsing a boolean attribute fails', () => {
        expect(read.attributes.invalidBoolean?.toBoolean()).toBe(null);
      });

      it('should allow to access string attributes as String', () => {
        expect(read.attributes.string?.toString()).toEqual('NY');
      });
    });

    describe(`when checking the 'isFollowedByMe field`, () => {
      const wallet = mockWalletData();
      const activeWalletVar = makeVar<WalletData | null>(wallet);
      const { writeProfileFragment, readProfileFragment } = setupApolloCache({ activeWalletVar });

      it('should return its existing value', () => {
        const profile = mockProfileFragment({
          isFollowedByMe: false,
        });
        writeProfileFragment(profile);

        const { isFollowedByMe } = readProfileFragment(profile);

        expect(isFollowedByMe).toEqual(profile.isFollowedByMe);
      });

      it('should return true if there is a pending follow transaction for the given profile', () => {
        const profile = mockProfileFragment({
          isFollowedByMe: false,
        });
        writeProfileFragment(profile);

        recentTransactionsVar([
          mockPendingTransactionState({
            request: mockUnconstrainedFollowRequest({
              profileId: profile.id,
              followerAddress: wallet.address,
            }),
          }),
        ]);
        const { isFollowedByMe } = readProfileFragment(profile);

        expect(isFollowedByMe).toBe(true);
      });

      it('should return false if there is a pending unfollow transaction for the given profile', () => {
        const profile = mockProfileFragment({
          isFollowedByMe: true,
        });
        writeProfileFragment(profile);

        recentTransactionsVar([
          mockPendingTransactionState({
            request: mockUnfollowRequest({
              profileId: profile.id,
            }),
          }),
        ]);
        const { isFollowedByMe } = readProfileFragment(profile);

        expect(isFollowedByMe).toBe(false);
      });

      it('should return true if there is a pending follow transaction more recent than the pending unfollow transaction for the same profile', () => {
        const profile = mockProfileFragment({
          isFollowedByMe: false,
        });
        writeProfileFragment(profile);
        recentTransactionsVar([
          mockPendingTransactionState({
            request: mockUnconstrainedFollowRequest({
              profileId: profile.id,
              followerAddress: wallet.address,
            }),
          }),
          mockPendingTransactionState({
            request: mockUnfollowRequest({
              profileId: profile.id,
            }),
          }),
        ]);

        const { isFollowedByMe } = readProfileFragment(profile);

        expect(isFollowedByMe).toBe(false);
      });
    });
  });
});
