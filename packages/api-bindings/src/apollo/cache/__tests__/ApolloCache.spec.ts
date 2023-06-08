import { ApolloCache, DocumentNode, makeVar } from '@apollo/client';
import { empty } from '@apollo/client/link/core';
import { DecryptionCriteriaType } from '@lens-protocol/domain/entities';
import {
  mockCreateMirrorRequest,
  mockFreeCollectRequest,
  mockProfile,
  mockPublicationId,
  mockUnconstrainedFollowRequest,
  mockUnfollowRequest,
  mockWalletData,
} from '@lens-protocol/domain/mocks';
import { CollectPolicyType } from '@lens-protocol/domain/use-cases/publications';
import { WalletData } from '@lens-protocol/domain/use-cases/wallets';
import { never } from '@lens-protocol/shared-kernel';

import {
  CollectState,
  ContentPublication,
  GetProfileData,
  GetProfileVariables,
  GetPublicationData,
  GetPublicationVariables,
  Profile,
} from '../../../graphql';
import {
  FragmentComment,
  FragmentPost,
  FragmentProfile,
  GetProfileDocument,
  GetPublicationDocument,
} from '../../../graphql/hooks';
import {
  mockAndAccessCondition,
  mockAttributeFragment,
  mockCollectConditionAccessCondition,
  mockCommentFragment,
  mockEncryptionParamsOutputFragment,
  mockEoaOwnershipAccessCondition,
  mockErc20OwnershipAccessCondition,
  mockFollowConditionAccessCondition,
  mockFreeCollectModuleSettings,
  mockMetadataOutputFragment,
  mockNftOwnershipAccessCondition,
  mockOrAccessCondition,
  mockTransactionState,
  mockPostFragment,
  mockProfileFragment,
  mockProfileOwnershipAccessCondition,
  mockPublicationStatsFragment,
} from '../../../mocks';
import { LensApolloClient } from '../../LensApolloClient';
import { activeProfileIdentifierVar } from '../activeProfileIdentifier';
import { createApolloCache } from '../createApolloCache';
import { erc20Amount } from '../decryptionCriteria';
import { recentTransactionsVar } from '../transactions';

const typeToFragmentMap: Record<ContentPublication['__typename'], DocumentNode> = {
  Post: FragmentPost,
  Comment: FragmentComment,
};

function setupApolloCache({ wallet = null }: { wallet?: WalletData | null } = {}) {
  const activeWalletVar = makeVar<WalletData | null>(wallet);
  const cache = createApolloCache({ activeWalletVar });

  return {
    writePublication(publication: ContentPublication) {
      cache.writeFragment({
        id: cache.identify(publication),
        fragment: typeToFragmentMap[publication.__typename],
        fragmentName: publication.__typename,
        data: publication,
      });
    },

    readPublication(publication: ContentPublication) {
      return (
        cache.readFragment<ContentPublication>({
          id: cache.identify(publication),
          fragment: typeToFragmentMap[publication.__typename],
          fragmentName: publication.__typename,
        }) ?? never('cannot read publication')
      );
    },

    writeProfileFragment(profile: Profile) {
      cache.writeFragment({
        data: profile,
        fragment: FragmentProfile,
        fragmentName: 'Profile',
      });
    },

    readProfileFragment(profile: Profile) {
      return (
        cache.readFragment<Profile>({
          fragment: FragmentProfile,
          fragmentName: 'Profile',
          id: cache.identify(profile),
        }) ?? never('cannot read profile')
      );
    },

    get client() {
      return new LensApolloClient({
        cache,
        link: empty(),
      });
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
  ])('and a cached $typename', ({ mockPublicationFragment, typename }) => {
    describe(`when reading the same ${typename} via the "publication" query`, () => {
      const publication = mockPublicationFragment();
      const { client, writePublication } = setupApolloCache();

      beforeAll(() => {
        writePublication(publication);
      });

      it('should perform a cache redirect and avoid a extra network request', async () => {
        const { data } = await client.query<GetPublicationData, GetPublicationVariables>({
          query: GetPublicationDocument,
          variables: { request: { publicationId: publication.id }, sources: [] },
        });

        expect(data.result).toMatchObject(publication);
      });
    });

    describe('when reading "collectPolicy"', () => {
      it('should support "CollectPolicy" for free collect', () => {
        const publication = mockPublicationFragment({
          profile: mockProfileFragment(),
          collectModule: mockFreeCollectModuleSettings(),
          collectPolicy: undefined,
          stats: mockPublicationStatsFragment(),
        });

        const { writePublication, readPublication } = setupApolloCache();
        writePublication(publication);
        const read = readPublication(publication);

        expect(read.collectPolicy).toMatchObject({
          type: CollectPolicyType.FREE,
          state: CollectState.CAN_BE_COLLECTED,
          followerOnly: false,
        });
      });

      it('should support "CollectPolicy" for not follower profile, free collect with followerOnly flag', () => {
        const publication = mockPublicationFragment({
          profile: mockProfileFragment({
            isFollowedByMe: false,
          }),
          collectModule: mockFreeCollectModuleSettings({ followerOnly: true }),
          collectPolicy: undefined,
          stats: mockPublicationStatsFragment(),
        });

        const { writePublication, readPublication } = setupApolloCache();
        writePublication(publication);
        const read = readPublication(publication);

        expect(read.collectPolicy).toMatchObject({
          type: CollectPolicyType.FREE,
          state: CollectState.NOT_A_FOLLOWER,
          followerOnly: true,
        });
      });

      it('should support "CollectPolicy" for a follower profile, free collect with followerOnly flag', () => {
        const publication = mockPublicationFragment({
          profile: mockProfileFragment({
            isFollowedByMe: true,
          }),
          collectModule: mockFreeCollectModuleSettings({ followerOnly: true }),
          collectPolicy: undefined,
          stats: mockPublicationStatsFragment(),
        });

        const { writePublication, readPublication } = setupApolloCache();
        writePublication(publication);
        const read = readPublication(publication);

        expect(read.collectPolicy).toMatchObject({
          type: CollectPolicyType.FREE,
          state: CollectState.CAN_BE_COLLECTED,
          followerOnly: true,
        });
      });
    });

    describe('and an active profile is defined', () => {
      const activeProfile = mockProfile();
      beforeAll(() => {
        activeProfileIdentifierVar(activeProfile);
      });

      afterAll(() => {
        activeProfileIdentifierVar(undefined);
      });

      describe('when reading "hasCollectedByMe" while an active profile is defined', () => {
        it('should return "true" if a a collect transaction for the same publication is pending', () => {
          const publication = mockPublicationFragment({
            profile: mockProfileFragment(),
            hasCollectedByMe: false,
          });

          recentTransactionsVar([
            mockTransactionState({
              request: mockFreeCollectRequest({
                profileId: activeProfile.id,
                publicationId: publication.id,
              }),
            }),
          ]);

          const { writePublication, readPublication } = setupApolloCache();
          writePublication(publication);
          const read = readPublication(publication);

          expect(read.hasCollectedByMe).toBe(true);
        });
      });

      describe('when reading "isMirroredByMe" while an active profile is defined', () => {
        it('should return "true" if a mirror transaction for the same publication is pending', () => {
          const publication = mockPublicationFragment({
            profile: mockProfileFragment(),
            mirrors: [],
            isMirroredByMe: false,
          });

          recentTransactionsVar([
            mockTransactionState({
              request: mockCreateMirrorRequest({
                profileId: activeProfile.id,
                publicationId: publication.id,
              }),
            }),
          ]);

          const { writePublication, readPublication } = setupApolloCache();
          writePublication(publication);
          const read = readPublication(publication);

          expect(read.isMirroredByMe).toBe(true);
        });
      });

      describe('when reading its "stats" while an active profile is defined', () => {
        it('should return "totalAmountOfMirrors" incremented by number of pending mirror transactions', () => {
          const publication = mockPublicationFragment({
            profile: mockProfileFragment(),
            mirrors: [mockPublicationId()],
            stats: mockPublicationStatsFragment({
              totalAmountOfMirrors: 1,
            }),
          });

          recentTransactionsVar([
            mockTransactionState({
              request: mockCreateMirrorRequest({
                profileId: activeProfile.id,
                publicationId: publication.id,
              }),
            }),
          ]);

          const { writePublication, readPublication } = setupApolloCache();
          writePublication(publication);
          const read = readPublication(publication);

          expect(read.stats.totalAmountOfMirrors).toEqual(2);
        });

        it('should return "totalAmountOfCollects" incremented by number of pending collect transactions', () => {
          const publication = mockPublicationFragment({
            profile: mockProfileFragment(),
            stats: mockPublicationStatsFragment({
              totalAmountOfCollects: 1,
            }),
          });

          recentTransactionsVar([
            mockTransactionState({
              request: mockFreeCollectRequest({
                profileId: activeProfile.id,
                publicationId: publication.id,
              }),
            }),
          ]);

          const { writePublication, readPublication } = setupApolloCache();
          writePublication(publication);
          const read = readPublication(publication);

          expect(read.stats.totalAmountOfCollects).toEqual(2);
        });
      });
    });

    describe('when reading "decryptionCriteria"', () => {
      it('should return "null" if not token-gated', () => {
        const publication = mockPublicationFragment({
          isGated: false,
        });
        const { writePublication, readPublication } = setupApolloCache();
        writePublication(publication);

        const read = readPublication(publication);

        expect(read.decryptionCriteria).toBe(null);
      });

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

      it.each([
        {
          description: 'NFT Ownership access condition',
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
          description: 'ERC20 Ownership access condition',
          criterion: erc20Condition,
          expectations: {
            type: DecryptionCriteriaType.ERC20_OWNERSHIP,
            amount: erc20Amount({ from: erc20Condition.token ?? never() }),
            condition: erc20Condition.token?.condition ?? never(),
          },
        },
        {
          description: 'Address Ownership access condition',
          criterion: eoaCondition,
          expectations: {
            type: DecryptionCriteriaType.ADDRESS_OWNERSHIP,
            address: eoaCondition.eoa?.address ?? never(),
          },
        },
        {
          description: 'Profile Ownership access condition',
          criterion: profileCondition,
          expectations: {
            type: DecryptionCriteriaType.PROFILE_OWNERSHIP,
            profileId: profileCondition.profile?.profileId ?? never(),
          },
        },
        {
          description: 'Follow access condition',
          criterion: followCondition,
          expectations: {
            type: DecryptionCriteriaType.FOLLOW_PROFILE,
            profileId: followCondition.follow?.profileId ?? never(),
          },
        },
        {
          description: 'Collect access condition',
          criterion: collectCondition,
          expectations: {
            type: DecryptionCriteriaType.COLLECT_PUBLICATION,
            publicationId: collectCondition.collect?.publicationId ?? never(),
          },
        },
        {
          description: 'Collect access condition',
          criterion: collectThisCondition,
          expectations: {
            type: DecryptionCriteriaType.COLLECT_THIS_PUBLICATION,
          },
        },
        {
          description: '2+ criteria in AND condition',
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
          description: '2+ criteria in OR condition',
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
      ])('should return "DecryptionCriteria" for $description', ({ criterion, expectations }) => {
        const metadata = mockMetadataOutputFragment({
          encryptionParams: mockEncryptionParamsOutputFragment({
            ownerId: author.id,
            others: [criterion],
          }),
        });
        const publication = mockPublicationFragment({
          isGated: true,
          metadata,
          profile: author,
        });

        const { writePublication, readPublication } = setupApolloCache();
        writePublication(publication);

        const read = readPublication(publication);

        expect(read.decryptionCriteria).toEqual(expectations);
      });
    });
  });

  describe('and a cached Profile', () => {
    describe('when reading its "attributes"', () => {
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

      it('should return "null" if attempting to access date attributes as Number', () => {
        expect(read.attributes.validDate?.toNumber()).toEqual(null);
      });

      it('should return "null" if parsing a date attribute fails', () => {
        expect(read.attributes.invalidDate?.toDate()).toBe(null);
      });

      it('should allow to access number attributes as Number', () => {
        expect(read.attributes.validNumber?.toNumber()).toEqual(42);
      });

      it('should allow to access number attributes as String', () => {
        expect(read.attributes.validNumber?.toString()).toEqual('42');
      });

      it('should return "null" if parsing a number attribute fails', () => {
        expect(read.attributes.invalidNumber?.toNumber()).toBe(null);
      });

      it('should allow to access boolean attributes as Boolean', () => {
        expect(read.attributes.validBoolean?.toBoolean()).toBe(true);
      });

      it('should return "null" if parsing a boolean attribute fails', () => {
        expect(read.attributes.invalidBoolean?.toBoolean()).toBe(null);
      });

      it('should allow to access string attributes as String', () => {
        expect(read.attributes.string?.toString()).toEqual('NY');
      });
    });

    describe(`when reading the same Profile via the "profile" query`, () => {
      const profile = mockProfileFragment();
      const { client, writeProfileFragment } = setupApolloCache();

      beforeAll(() => {
        writeProfileFragment(profile);
      });

      it('should perform a cache redirect and avoid a extra network request', async () => {
        const { data } = await client.query<GetProfileData, GetProfileVariables>({
          query: GetProfileDocument,
          variables: { request: { profileId: profile.id } },
        });

        expect(data.result).toMatchObject(profile);
      });

      it('should attempt a cache redirect even if queried by its handle', async () => {
        const { data } = await client.query<GetProfileData, GetProfileVariables>({
          query: GetProfileDocument,
          variables: { request: { handle: profile.handle } },
        });

        expect(data.result).toMatchObject(profile);
      });
    });

    describe('and an active wallet is defined', () => {
      const wallet = mockWalletData();
      const { writeProfileFragment, readProfileFragment } = setupApolloCache({ wallet });

      describe('when the profile is followed by the one specified as the "observerId"', () => {
        const profile = mockProfileFragment({
          isFollowedByMe: true,
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
              mockTransactionState({
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
          isFollowedByMe: false,
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
              mockTransactionState({
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
