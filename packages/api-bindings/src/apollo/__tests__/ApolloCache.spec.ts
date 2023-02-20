import { ApolloCache, DocumentNode, makeVar } from '@apollo/client';
import {
  mockUnconstrainedFollowRequest,
  mockUnfollowRequest,
  mockWalletData,
} from '@lens-protocol/domain/mocks';
import { WalletData } from '@lens-protocol/domain/use-cases/wallets';
import { never } from '@lens-protocol/shared-kernel';

import {
  CommentFragmentDoc,
  ContentPublicationFragment,
  PostFragmentDoc,
  ProfileFragment,
  ProfileFragmentDoc,
} from '../../graphql';
import { ConditionType } from '../../graphql/DecryptionCriteria';
import {
  mockAttributeFragment,
  mockEncryptionParamsFragment,
  mockMetadataFragment,
  mockNftOwnershipCriterion,
  mockPendingTransactionState,
  mockPostFragment,
  mockProfileFragment,
} from '../../mocks';
import { createApolloCache } from '../createApolloCache';
import { recentTransactionsVar } from '../transactions';

const typeToFragmentMap: Record<ContentPublicationFragment['__typename'], DocumentNode> = {
  Post: PostFragmentDoc,
  Comment: CommentFragmentDoc,
};

function setupApolloCache({ wallet = null }: { wallet?: WalletData | null } = {}) {
  const activeWalletVar = makeVar<WalletData | null>(wallet);
  const cache = createApolloCache({ activeWalletVar });

  return {
    writePublication(publication: ContentPublicationFragment) {
      cache.writeFragment({
        id: cache.identify(publication),
        fragment: typeToFragmentMap[publication.__typename],
        fragmentName: publication.__typename,
        data: publication,
      });
    },

    readPublication(publication: ContentPublicationFragment) {
      return (
        cache.readFragment<ContentPublicationFragment>({
          id: cache.identify(publication),
          fragment: typeToFragmentMap[publication.__typename],
          fragmentName: publication.__typename,
        }) ?? never()
      );
    },

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
  describe.only.each([
    {
      typename: 'Post',
      mockPublicationFragment: mockPostFragment,
    },
  ])(
    'when reading "decryptionCriteria" for not token-gated $typename',
    ({ mockPublicationFragment }) => {
      const publication = mockPublicationFragment({
        isGated: false,
      });

      it('should return "null"', () => {
        const { writePublication, readPublication } = setupApolloCache();
        writePublication(publication);

        const read = readPublication(publication);

        expect(read.decryptionCriteria).toBe(null);
      });
    },
  );

  describe.only.each([
    {
      typename: 'Post',
      mockPublicationFragment: mockPostFragment,
    },
  ])(
    'when reading "decryptionCriteria" for a token-gated $typename',
    ({ mockPublicationFragment }) => {
      const author = mockProfileFragment();

      describe('with NFT Ownership access condition', () => {
        const criterion = mockNftOwnershipCriterion();
        const metadata = mockMetadataFragment({
          __encryptionParams: mockEncryptionParamsFragment({
            ownerId: author.id,
            others: [criterion],
          }),
        });
        const publication = mockPublicationFragment({
          isGated: true,
          metadata,
          profile: author,
        });

        it('should return the expected "DecryptionCriteria"', () => {
          const { writePublication, readPublication } = setupApolloCache();
          writePublication(publication);

          const read = readPublication(publication);

          expect(read.decryptionCriteria).toEqual({
            type: ConditionType.NFT_OWNERSHIP,
            contractAddress: criterion.nft?.contractAddress ?? never(),
            chainID: criterion.nft?.chainID ?? never(),
            contractType: criterion.nft?.contractType ?? never(),
            tokenIds: criterion.nft?.tokenIds ?? never(),
          });
        });
      });
    },
  );

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

    describe('and there is an active wallet', () => {
      const wallet = mockWalletData();
      const { writeProfileFragment, readProfileFragment } = setupApolloCache({ wallet });

      describe('when the profile is followed by the one specified as the "observerId"', () => {
        const profile = mockProfileFragment({
          __isFollowedByMe: true,
        });

        beforeEach(() => {
          writeProfileFragment(profile);
        });

        it(`should have the expected "followStatus"
            - isFollowedByMe=true
            - canFollow=false
            - canUnfollow=true`, () => {
          const { followStatus } = readProfileFragment(profile);

          expect(followStatus).toMatchObject({
            isFollowedByMe: true,
            canFollow: false,
            canUnfollow: true,
          });
        });

        describe('but there is a pending unfollow transaction for the given profile', () => {
          it(`should have the expected "followStatus"
              - isFollowedByMe=false
              - canFollow=false
              - canUnfollow=false`, () => {
            recentTransactionsVar([
              mockPendingTransactionState({
                request: mockUnfollowRequest({
                  profileId: profile.id,
                }),
              }),
            ]);

            const { followStatus } = readProfileFragment(profile);

            expect(followStatus).toMatchObject({
              isFollowedByMe: false,
              canFollow: false,
              canUnfollow: false,
            });
          });
        });
      });

      describe('when the profile is NOT followed by the one specified as the "observerId"', () => {
        const profile = mockProfileFragment({
          __isFollowedByMe: false,
        });

        beforeEach(() => {
          writeProfileFragment(profile);
        });

        it(`should have the expected "followStatus"
            - isFollowedByMe=false
            - canFollow=true
            - canUnfollow=false`, () => {
          const { followStatus } = readProfileFragment(profile);

          expect(followStatus).toMatchObject({
            isFollowedByMe: false,
            canFollow: true,
            canUnfollow: false,
          });
        });

        describe('but there is a pending follow transaction for the given profile', () => {
          it(`should have the expected "followStatus"
              - isFollowedByMe=true
              - canFollow=false
              - canUnfollow=false`, () => {
            recentTransactionsVar([
              mockPendingTransactionState({
                request: mockUnconstrainedFollowRequest({
                  profileId: profile.id,
                  followerAddress: wallet.address,
                }),
              }),
            ]);
            const { followStatus } = readProfileFragment(profile);

            expect(followStatus).toMatchObject({
              isFollowedByMe: true,
              canFollow: false,
              canUnfollow: false,
            });
          });
        });
      });

      xdescribe(`when checking the 'isFollowedByMe field`, () => {
        it('should return true if there is a pending follow transaction more recent than the pending unfollow transaction for the same profile', () => {
          const profile = mockProfileFragment({
            __isFollowedByMe: false,
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

          // const { isFollowedByMe } = readProfileFragment(profile);

          // expect(isFollowedByMe).toBe(false);
        });
      });
    });
  });
});
