import { faker } from '@faker-js/faker';
import {
  AddressOwnershipCriterion,
  CollectPublicationCriterion,
  DecryptionCriteriaType,
  Erc20OwnershipCriterion,
  FollowProfileCriterion,
  NftContractType,
  NftOwnershipCriterion,
  ProfileOwnershipCriterion,
  TransactionKind,
} from '@lens-protocol/domain/entities';
import {
  mockAddressOwnershipCriterion,
  mockCollectPublicationCriterion,
  mockCollectThisPublicationCriterion,
  mockCreatePostRequest,
  mockFollowProfileCriterion,
  mockNftOwnershipCriterion,
  mockProfileId,
  mockProfileOwnershipCriterion,
  mockPublicationId,
} from '@lens-protocol/domain/mocks';
import { FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';
import {
  CollectPolicyType,
  ContentFocus,
  ReferencePolicyType,
} from '@lens-protocol/domain/use-cases/publications';
import { mockEthereumAddress } from '@lens-protocol/shared-kernel/mocks';

import {
  validateCreateCommentRequest,
  validateCreatePostRequest,
  validateTokenAllowanceRequest,
  validateUpdateFollowPolicyRequest,
  validateUpdateProfileDetailsRequest,
} from '../validators';

describe(`Given the validator helpers`, () => {
  describe(`when testing the "validateCreatePostRequest" on a request`, () => {
    describe('with invalid "NftOwnershipCriterion" criteria for "decryptionCriteria"', () => {
      it('should provide an actionable error message', () => {
        expect(() =>
          validateCreatePostRequest(
            mockCreatePostRequest({
              decryptionCriteria: {
                type: DecryptionCriteriaType.AND,
                and: [
                  {
                    type: DecryptionCriteriaType.NFT_OWNERSHIP,
                  } as NftOwnershipCriterion,
                  {
                    type: DecryptionCriteriaType.NFT_OWNERSHIP,
                    contractAddress: mockEthereumAddress(),
                    chainId: 1,
                    contractType: NftContractType.Erc721,
                    tokenIds: [],
                  },
                  {
                    type: DecryptionCriteriaType.NFT_OWNERSHIP,
                    contractAddress: mockEthereumAddress(),
                    chainId: 1,
                    contractType: NftContractType.Erc721,
                    tokenIds: Array.from({ length: 31 }, faker.datatype.hexadecimal),
                  },
                ],
              },
            }),
          ),
        ).toThrowErrorMatchingInlineSnapshot(`
          "fix the following issues
          · "decryptionCriteria.and[0].contractAddress": Required
          · "decryptionCriteria.and[0].chainId": Required
          · "decryptionCriteria.and[0].contractType": Required
          · "decryptionCriteria.and[1].tokenIds": Array must contain at least 1 element(s)
          · "decryptionCriteria.and[2].tokenIds": Array must contain at most 30 element(s)"
        `);
      });
    });

    describe('with invalid "Erc20OwnershipCriterion" criteria for "decryptionCriteria"', () => {
      it('should provide an actionable error message', () => {
        expect(() =>
          validateCreatePostRequest(
            mockCreatePostRequest({
              decryptionCriteria: {
                type: DecryptionCriteriaType.ERC20_OWNERSHIP,
              } as Erc20OwnershipCriterion,
            }),
          ),
        ).toThrowErrorMatchingInlineSnapshot(`
          "fix the following issues
          · "decryptionCriteria.amount": value not instance of Amount<Erc20>
          · "decryptionCriteria.condition": Required"
        `);
      });
    });

    describe('with invalid "AddressOwnershipCriterion" criteria for "decryptionCriteria"', () => {
      it('should provide an actionable error message', () => {
        expect(() =>
          validateCreatePostRequest(
            mockCreatePostRequest({
              decryptionCriteria: {
                type: DecryptionCriteriaType.ADDRESS_OWNERSHIP,
              } as AddressOwnershipCriterion,
            }),
          ),
        ).toThrowErrorMatchingInlineSnapshot(`
          "fix the following issues
          · "decryptionCriteria.address": Required"
        `);
      });
    });

    describe('with invalid "ProfileOwnershipCriterion" criteria for "decryptionCriteria"', () => {
      it('should provide an actionable error message', () => {
        expect(() =>
          validateCreatePostRequest(
            mockCreatePostRequest({
              decryptionCriteria: {
                type: DecryptionCriteriaType.PROFILE_OWNERSHIP,
              } as ProfileOwnershipCriterion,
            }),
          ),
        ).toThrowErrorMatchingInlineSnapshot(`
          "fix the following issues
          · "decryptionCriteria.profileId": Required"
        `);
      });
    });

    describe('with invalid "FollowProfileCriterion" criteria for "decryptionCriteria"', () => {
      it('should provide an actionable error message', () => {
        expect(() =>
          validateCreatePostRequest(
            mockCreatePostRequest({
              decryptionCriteria: {
                type: DecryptionCriteriaType.FOLLOW_PROFILE,
              } as FollowProfileCriterion,
            }),
          ),
        ).toThrowErrorMatchingInlineSnapshot(`
          "fix the following issues
          · "decryptionCriteria.profileId": Required"
        `);
      });
    });

    describe('with invalid "CollectPublicationCriterion" criteria for "decryptionCriteria"', () => {
      it('should provide an actionable error message', () => {
        expect(() =>
          validateCreatePostRequest(
            mockCreatePostRequest({
              decryptionCriteria: {
                type: DecryptionCriteriaType.COLLECT_PUBLICATION,
              } as CollectPublicationCriterion,
            }),
          ),
        ).toThrowErrorMatchingInlineSnapshot(`
          "fix the following issues
          · "decryptionCriteria.publicationId": Required"
        `);
      });
    });

    describe('with invalid "AndCriterion" criteria for "decryptionCriteria"', () => {
      it('should provide an actionable error message for not enough criteria', () => {
        expect(() =>
          validateCreatePostRequest(
            mockCreatePostRequest({
              decryptionCriteria: {
                type: DecryptionCriteriaType.AND,
                and: [mockCollectThisPublicationCriterion()],
              },
            }),
          ),
        ).toThrowErrorMatchingInlineSnapshot(`
          "fix the following issues
          · "decryptionCriteria.and": Array must contain at least 2 element(s)"
        `);
      });

      it('should provide an actionable error message for duplicated criteria', () => {
        expect(() =>
          validateCreatePostRequest(
            mockCreatePostRequest({
              decryptionCriteria: {
                type: DecryptionCriteriaType.AND,
                and: [mockCollectThisPublicationCriterion(), mockCollectThisPublicationCriterion()],
              },
            }),
          ),
        ).toThrowErrorMatchingInlineSnapshot(`
          "fix the following issues
          · "decryptionCriteria.and": Must be an array of unique criteria"
        `);
      });

      it('should provide an actionable error message for too many criteria', () => {
        expect(() =>
          validateCreatePostRequest(
            mockCreatePostRequest({
              decryptionCriteria: {
                type: DecryptionCriteriaType.AND,
                and: [
                  mockCollectThisPublicationCriterion(),
                  mockCollectPublicationCriterion(),
                  mockNftOwnershipCriterion(),
                  mockAddressOwnershipCriterion(),
                  mockProfileOwnershipCriterion(),
                  mockFollowProfileCriterion(),
                ],
              },
            }),
          ),
        ).toThrowErrorMatchingInlineSnapshot(`
          "fix the following issues
          · "decryptionCriteria.and": Array must contain at most 5 element(s)"
        `);
      });
    });

    describe('with invalid "OrCriterion" criteria for "decryptionCriteria"', () => {
      it('should provide an actionable error message for not enough criteria', () => {
        expect(() =>
          validateCreatePostRequest(
            mockCreatePostRequest({
              decryptionCriteria: {
                type: DecryptionCriteriaType.OR,
                or: [mockCollectThisPublicationCriterion()],
              },
            }),
          ),
        ).toThrowErrorMatchingInlineSnapshot(`
          "fix the following issues
          · "decryptionCriteria.or": Array must contain at least 2 element(s)"
        `);
      });

      it('should provide an actionable error message for duplicated criteria', () => {
        expect(() =>
          validateCreatePostRequest(
            mockCreatePostRequest({
              decryptionCriteria: {
                type: DecryptionCriteriaType.OR,
                or: [mockCollectThisPublicationCriterion(), mockCollectThisPublicationCriterion()],
              },
            }),
          ),
        ).toThrowErrorMatchingInlineSnapshot(`
          "fix the following issues
          · "decryptionCriteria.or": Must be an array of unique criteria"
        `);
      });

      it('should provide an actionable error message for too many criteria', () => {
        expect(() =>
          validateCreatePostRequest(
            mockCreatePostRequest({
              decryptionCriteria: {
                type: DecryptionCriteriaType.OR,
                or: [
                  mockCollectThisPublicationCriterion(),
                  mockCollectPublicationCriterion(),
                  mockNftOwnershipCriterion(),
                  mockAddressOwnershipCriterion(),
                  mockProfileOwnershipCriterion(),
                  mockFollowProfileCriterion(),
                ],
              },
            }),
          ),
        ).toThrowErrorMatchingInlineSnapshot(`
          "fix the following issues
          · "decryptionCriteria.or": Array must contain at most 5 element(s)"
        `);
      });
    });

    describe('with invalid "collect" policy', () => {
      it('should provide an actionable error message', () => {
        expect(() =>
          validateCreatePostRequest({
            contentFocus: ContentFocus.TEXT_ONLY,
            content: '',
            collect: {
              type: CollectPolicyType.CHARGE,
              fee: '1',
            },
            delegate: false,
            locale: 'en',
            kind: TransactionKind.CREATE_POST,
            offChain: false,
            profileId: mockProfileId(),
            reference: {
              type: ReferencePolicyType.ANYONE,
            },
          }),
        ).toThrowErrorMatchingInlineSnapshot(`
                  "fix the following issues
                  · "collect" expected to match one of the following groups:
                  		· "collect.fee": value not instance of Amount<Erc20>
                  		· "collect.followersOnly": Required
                  		· "collect.metadata": Required
                  		· "collect.mirrorReward": Required
                  		· "collect.recipient": Required
                  		· "collect.timeLimited": Required
                  	OR:
                  		· "collect.fee": value not instance of Amount<Erc20>
                  		· "collect.followersOnly": Required
                  		· "collect.metadata": Required
                  		· "collect.mirrorReward": Required
                  		· "collect.recipients": Required
                  	OR:
                  		· "collect.fee": value not instance of Amount<Erc20>
                  		· "collect.followersOnly": Required
                  		· "collect.metadata": Required
                  		· "collect.mirrorReward": Required
                  		· "collect.recipient": Required
                  		· "collect.vault": Required
                  	OR:
                  		· "collect.fee": value not instance of Amount<Erc20>
                  		· "collect.followersOnly": Required
                  		· "collect.metadata": Required
                  		· "collect.mirrorReward": Required
                  		· "collect.recipient": Required
                  		· "collect.depositToAave": Invalid literal value, expected true
                  	OR:
                  		· "collect.type": Invalid literal value, expected "FREE"
                  		· "collect.metadata": Required
                  		· "collect.followersOnly": Required
                  	OR:
                  		· "collect.type": Invalid literal value, expected "NO_COLLECT""
              `);
      });
    });

    describe('with invalid "collect.metadata" for collectable publications', () => {
      it('should provide an actionable error message in case of "collect.metadata" misconfiguration', () => {
        expect(() =>
          validateCreatePostRequest({
            contentFocus: ContentFocus.TEXT_ONLY,
            content: '',
            collect: {
              type: CollectPolicyType.FREE,
              metadata: {},
            },
            delegate: false,
            locale: 'en',
            kind: TransactionKind.CREATE_POST,
            offChain: false,
            profileId: mockProfileId(),
            reference: {
              type: ReferencePolicyType.ANYONE,
            },
          }),
        ).toThrowErrorMatchingInlineSnapshot(`
          "fix the following issues
          · "collect" expected to match one of the following groups:
          		· "collect.type": Invalid literal value, expected "CHARGE"
          		· "collect.fee": value not instance of Amount<Erc20>
          		· "collect.followersOnly": Required
          		· "collect.metadata.name": Required
          		· "collect.mirrorReward": Required
          		· "collect.recipient": Required
          		· "collect.timeLimited": Required
          	OR:
          		· "collect.type": Invalid literal value, expected "CHARGE"
          		· "collect.fee": value not instance of Amount<Erc20>
          		· "collect.followersOnly": Required
          		· "collect.metadata.name": Required
          		· "collect.mirrorReward": Required
          		· "collect.recipients": Required
          	OR:
          		· "collect.type": Invalid literal value, expected "CHARGE"
          		· "collect.fee": value not instance of Amount<Erc20>
          		· "collect.followersOnly": Required
          		· "collect.metadata.name": Required
          		· "collect.mirrorReward": Required
          		· "collect.recipient": Required
          		· "collect.vault": Required
          	OR:
          		· "collect.type": Invalid literal value, expected "CHARGE"
          		· "collect.fee": value not instance of Amount<Erc20>
          		· "collect.followersOnly": Required
          		· "collect.metadata.name": Required
          		· "collect.mirrorReward": Required
          		· "collect.recipient": Required
          		· "collect.depositToAave": Invalid literal value, expected true
          	OR:
          		· "collect.metadata.name": Required
          		· "collect.followersOnly": Required
          	OR:
          		· "collect.type": Invalid literal value, expected "NO_COLLECT""
        `);
      });
    });

    describe('with invalid "attributes"', () => {
      it('should provide an actionable error message', () => {
        expect(() =>
          validateCreatePostRequest({
            attributes: {},
            contentFocus: ContentFocus.TEXT_ONLY,
            content: '',
            collect: {
              type: CollectPolicyType.NO_COLLECT,
            },
            delegate: false,
            locale: 'en',
            kind: TransactionKind.CREATE_POST,
            offChain: false,
            profileId: mockProfileId(),
            reference: {
              type: ReferencePolicyType.ANYONE,
            },
          }),
        ).toThrowErrorMatchingInlineSnapshot(`
          "fix the following issues
          · "attributes": Expected array, received object"
        `);
      });
    });

    describe('with invalid "image"', () => {
      it('should provide an actionable error message', () => {
        expect(() =>
          validateCreatePostRequest({
            contentFocus: ContentFocus.TEXT_ONLY,
            content: '',
            collect: {
              type: CollectPolicyType.NO_COLLECT,
            },
            delegate: false,
            image: {},
            locale: 'en',
            kind: TransactionKind.CREATE_POST,
            offChain: false,
            profileId: mockProfileId(),
            reference: {
              type: ReferencePolicyType.ANYONE,
            },
          }),
        ).toThrowErrorMatchingInlineSnapshot(`
          "fix the following issues
          · "image.mimeType": Required
          · "image.url": Required"
        `);
      });
    });

    describe('with invalid "attributes"', () => {
      it('should provide an actionable error message', () => {
        expect(() =>
          validateCreatePostRequest({
            contentFocus: ContentFocus.TEXT_ONLY,
            content: '',
            collect: {
              type: CollectPolicyType.NO_COLLECT,
            },
            delegate: false,
            locale: 'en',
            kind: TransactionKind.CREATE_POST,
            offChain: false,
            profileId: mockProfileId(),
            reference: {
              type: ReferencePolicyType.DEGREES_OF_SEPARATION,
            },
          }),
        ).toThrowErrorMatchingInlineSnapshot(`
                  "fix the following issues
                  · "reference.params": Required"
              `);
      });
    });
  });

  describe(`when testing the "validateCreateCommentRequest"`, () => {
    it('should provide an actionable error message in case of "collect" policy misconfiguration', () => {
      expect(() =>
        validateCreateCommentRequest({
          contentFocus: ContentFocus.TEXT_ONLY,
          content: '',
          collect: {
            type: CollectPolicyType.CHARGE,
            fee: '1',
          },
          delegate: false,
          locale: 'en',
          kind: TransactionKind.CREATE_COMMENT,
          offChain: false,
          profileId: mockProfileId(),
          publicationId: mockPublicationId(),
          reference: {
            type: ReferencePolicyType.ANYONE,
          },
        }),
      ).toThrowErrorMatchingInlineSnapshot(`
        "fix the following issues
        · "collect" expected to match one of the following groups:
        		· "collect.fee": value not instance of Amount<Erc20>
        		· "collect.followersOnly": Required
        		· "collect.metadata": Required
        		· "collect.mirrorReward": Required
        		· "collect.recipient": Required
        		· "collect.timeLimited": Required
        	OR:
        		· "collect.fee": value not instance of Amount<Erc20>
        		· "collect.followersOnly": Required
        		· "collect.metadata": Required
        		· "collect.mirrorReward": Required
        		· "collect.recipients": Required
        	OR:
        		· "collect.fee": value not instance of Amount<Erc20>
        		· "collect.followersOnly": Required
        		· "collect.metadata": Required
        		· "collect.mirrorReward": Required
        		· "collect.recipient": Required
        		· "collect.vault": Required
        	OR:
        		· "collect.fee": value not instance of Amount<Erc20>
        		· "collect.followersOnly": Required
        		· "collect.metadata": Required
        		· "collect.mirrorReward": Required
        		· "collect.recipient": Required
        		· "collect.depositToAave": Invalid literal value, expected true
        	OR:
        		· "collect.type": Invalid literal value, expected "FREE"
        		· "collect.metadata": Required
        		· "collect.followersOnly": Required
        	OR:
        		· "collect.type": Invalid literal value, expected "NO_COLLECT""
      `);
    });

    it('should provide an actionable error message in case of "reference" policy misconfiguration', () => {
      expect(() =>
        validateCreateCommentRequest({
          contentFocus: ContentFocus.TEXT_ONLY,
          content: '',
          collect: {
            type: CollectPolicyType.NO_COLLECT,
          },
          delegate: false,
          locale: 'en',
          kind: TransactionKind.CREATE_COMMENT,
          offChain: false,
          profileId: mockProfileId(),
          publicationId: mockPublicationId(),
          reference: {
            type: ReferencePolicyType.DEGREES_OF_SEPARATION,
          },
        }),
      ).toThrowErrorMatchingInlineSnapshot(`
        "fix the following issues
        · "reference.params": Required"
        `);
    });
  });

  describe(`when testing the "validateTokenAllowanceRequest"`, () => {
    it('should provide an actionable error message in case of misuse', () => {
      expect(() =>
        validateTokenAllowanceRequest({
          amount: 42,
          kind: TransactionKind.APPROVE_MODULE,
        }),
      ).toThrowErrorMatchingInlineSnapshot(`
        "fix the following issues
        · "amount": value not instance of Amount<Erc20>
        · "spender": Required
        · "limit": Required"
        `);
    });
  });

  describe(`when testing the "validateUpdateFollowPolicyRequest"`, () => {
    it('should provide an actionable error message in case of misuse', () => {
      expect(() =>
        validateUpdateFollowPolicyRequest({
          kind: TransactionKind.UPDATE_FOLLOW_POLICY,
          policy: {
            type: FollowPolicyType.CHARGE,
            amount: 42,
          },
          profileId: mockProfileId(),
        }),
      ).toThrowErrorMatchingInlineSnapshot(`
        "fix the following issues
        · "policy.amount": value not instance of Amount<Erc20>
        · "policy.recipient": Required"
      `);
    });
  });

  describe(`when testing the "validateUpdateProfileDetailsRequest"`, () => {
    it('should provide an actionable error message in case of misuse', () => {
      expect(() =>
        validateUpdateProfileDetailsRequest({
          attributes: {
            foo: new RegExp('foo'),
          },
          bio: 42,
          coverPicture: null,
          delegate: false,
          kind: TransactionKind.UPDATE_PROFILE_DETAILS,
          policy: {
            type: FollowPolicyType.CHARGE,
            amount: 42,
          },
          profileId: mockProfileId(),
        }),
      ).toThrowErrorMatchingInlineSnapshot(`
        "fix the following issues
        · "attributes.foo" expected to match one of the following groups:
        		· "attributes.foo": Expected boolean, received object
        	OR:
        		· "attributes.foo": Invalid date
        	OR:
        		· "attributes.foo": Expected number, received object
        	OR:
        		· "attributes.foo": Expected string, received object
        	OR:
        		· "attributes.foo": Expected null, received object
        · "bio": Expected string, received number
        · "name": Required"
      `);
    });
  });
});
