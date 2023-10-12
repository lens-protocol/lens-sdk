import { TransactionKind } from '@lens-protocol/domain/entities';
import { mockProfileId, mockPublicationId } from '@lens-protocol/domain/mocks';
import { FollowPolicyType } from '@lens-protocol/domain/use-cases/profile';
import { ReferencePolicyType } from '@lens-protocol/domain/use-cases/publications';

import {
  validateCreateCommentRequest,
  validateCreatePostRequest,
  validateTokenAllowanceRequest,
  validateUpdateFollowPolicyRequest,
  validateUpdateProfileDetailsRequest,
  validateUpdateProfileManagersRequest,
} from '../validators';

describe(`Given the validator helpers`, () => {
  describe(`when testing the "validateCreatePostRequest" on a request`, () => {
    it.only('should provide an actionable error message in case of "reference" policy misconfiguration', () => {
      expect(() =>
        validateCreatePostRequest({
          kind: TransactionKind.CREATE_POST,
          delegate: false,
          momoka: false,
          reference: {
            type: ReferencePolicyType.DEGREES_OF_SEPARATION,
          },
        }),
      ).toThrowErrorMatchingInlineSnapshot(`
        "fix the following issues
        · "metadata": Required
        · "reference.params": Required
        · "actions": Required"
      `);
    });
  });

  describe(`when testing the "validateCreateCommentRequest"`, () => {
    it('should provide an actionable error message in case of "reference" policy misconfiguration', () => {
      expect(() =>
        validateCreateCommentRequest({
          kind: TransactionKind.CREATE_POST,
          delegate: false,
          momoka: false,
          commentOn: mockPublicationId(),
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

  describe(`when testing the "validateUpdateProfileManagersRequest"`, () => {
    it('should provide an actionable error message in case of misuse', () => {
      expect(() =>
        validateUpdateProfileManagersRequest({
          kind: TransactionKind.UPDATE_PROFILE_MANAGERS,
          profileId: mockProfileId(),
        }),
      ).toThrowErrorMatchingInlineSnapshot(`
        "fix the following issues
        At least one of 'add', 'remove', or 'lensManager' must be present."
      `);
    });
  });
});
