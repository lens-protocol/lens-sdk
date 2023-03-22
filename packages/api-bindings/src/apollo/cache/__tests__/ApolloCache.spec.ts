import { ApolloCache, DocumentNode, makeVar } from '@apollo/client';
import { DecryptionCriteriaType } from '@lens-protocol/domain/entities';
import {
  mockPublicationId,
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
} from '../../../graphql';
import {
  mockEoaOwnershipAccessCondition,
  mockAndAccessCondition,
  mockAttributeFragment,
  mockCollectConditionAccessCondition,
  mockCommentFragment,
  mockEncryptionParamsFragment,
  mockErc20OwnershipAccessCondition,
  mockFollowConditionAccessCondition,
  mockMetadataFragment,
  mockNftOwnershipAccessCondition,
  mockOrAccessCondition,
  mockPendingTransactionState,
  mockPostFragment,
  mockProfileFragment,
  mockProfileOwnershipAccessCondition,
} from '../../../mocks';
import { createApolloCache } from '../createApolloCache';
import { erc20Amount } from '../decryptionCriteria';
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
        }) ?? never('cannot read publication')
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
        }) ?? never('cannot read profile')
      );
    },
  };
}

describe(`Given an instance of the ${ApolloCache.name}`, () => {
  describe.each([
    {
      typename: 'Post',
      mockPublicationFragment: mockPostFragment,
    },
    {
      typename: 'Comment',
      mockPublicationFragment: mockCommentFragment,
    },
  ])('when reading "decryptionCriteria"', ({ mockPublicationFragment, typename }) => {
    describe(`for a not token-gated "${typename}"`, () => {
      const publication = mockPublicationFragment({
        isGated: false,
      });

      it('should return "null"', () => {
        const { writePublication, readPublication } = setupApolloCache();
        writePublication(publication);

        const read = readPublication(publication);

        expect(read.decryptionCriteria).toBe(null);
      });
    });

    describe(`for a token-gated "${typename}"`, () => {
      const author = mockProfileFragment();

      const nftCondition = mockNftOwnershipAccessCondition();
      const erc20Condition = mockErc20OwnershipAccessCondition();
      const eoaCondition = mockEoaOwnershipAccessCondition();
      const profileCondition = mockProfileOwnershipAccessCondition();
      const followCondition = mockFollowConditionAccessCondition();
      const collectCondition = mockCollectConditionAccessCondition();
      const collectThisCondition = mockCollectConditionAccessCondition({
        publicationId: mockPublicationId(),
        thisPublication: true,
      });

      describe.each([
        {
          description: 'with a NFT Ownership access condition',
          criterion: nftCondition,
          expectations: {
            type: DecryptionCriteriaType.NFT_OWNERSHIP,
            contractAddress: nftCondition.nft?.contractAddress ?? never(),
            chainId: nftCondition.nft?.chainID ?? never(),
            contractType: nftCondition.nft?.contractType ?? never(),
            tokenIds: nftCondition.nft?.tokenIds ?? never(),
          },
        },
        {
          description: 'with an ERC20 Ownership access condition',
          criterion: erc20Condition,
          expectations: {
            type: DecryptionCriteriaType.ERC20_OWNERSHIP,
            amount: erc20Amount({ from: erc20Condition.token ?? never() }),
            condition: erc20Condition.token?.condition ?? never(),
          },
        },
        {
          description: 'with an Address Ownership access condition',
          criterion: eoaCondition,
          expectations: {
            type: DecryptionCriteriaType.ADDRESS_OWNERSHIP,
            address: eoaCondition.eoa?.address ?? never(),
          },
        },
        {
          description: 'with a Profile Ownership access condition',
          criterion: profileCondition,
          expectations: {
            type: DecryptionCriteriaType.PROFILE_OWNERSHIP,
            profileId: profileCondition.profile?.profileId ?? never(),
          },
        },
        {
          description: 'with a Follow access condition',
          criterion: followCondition,
          expectations: {
            type: DecryptionCriteriaType.FOLLOW_PROFILE,
            profileId: followCondition.follow?.profileId ?? never(),
          },
        },
        {
          description: 'with a Collect access condition',
          criterion: collectCondition,
          expectations: {
            type: DecryptionCriteriaType.COLLECT_PUBLICATION,
            publicationId: collectCondition.collect?.publicationId ?? never(),
          },
        },
        {
          description: 'with a Collect access condition',
          criterion: collectThisCondition,
          expectations: {
            type: DecryptionCriteriaType.COLLECT_THIS_PUBLICATION,
          },
        },
        {
          description: 'with some criteria in AND condition',
          criterion: mockAndAccessCondition([followCondition, collectCondition]),
          expectations: {
            type: DecryptionCriteriaType.AND,
            and: [
              {
                type: DecryptionCriteriaType.FOLLOW_PROFILE,
                profileId: followCondition.follow?.profileId ?? never(),
              },
              {
                type: DecryptionCriteriaType.COLLECT_PUBLICATION,
                publicationId: collectCondition.collect?.publicationId ?? never(),
              },
            ],
          },
        },
        {
          description: 'with some criteria in OR condition',
          criterion: mockOrAccessCondition([followCondition, collectCondition]),
          expectations: {
            type: DecryptionCriteriaType.OR,
            or: [
              {
                type: DecryptionCriteriaType.FOLLOW_PROFILE,
                profileId: followCondition.follow?.profileId ?? never(),
              },
              {
                type: DecryptionCriteriaType.COLLECT_PUBLICATION,
                publicationId: collectCondition.collect?.publicationId ?? never(),
              },
            ],
          },
        },
      ])('$description', ({ criterion, expectations }) => {
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

          expect(read.decryptionCriteria).toEqual(expectations);
        });
      });
    });
  });

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
    });
  });
});
