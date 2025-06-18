import {
  AccountQuery,
  graphql,
  UsernameFragment,
} from '@lens-protocol/graphql';
import { NoUnusedFragmentsRule } from 'graphql';
import { describe, expect, it } from 'vitest';

import { FragmentResolver } from './fragments';
import { assertTypedDocumentSatisfies } from './test-utils';

describe(`Given an instance of the '${FragmentResolver.name}' helper`, () => {
  describe('When replacing fragments on a query document', () => {
    it('Then it should replace new fragments and remove unused ones', () => {
      const BaseAccountFragment = graphql(
        `fragment BaseAccount on Account {
          test: address
        }`,
      );
      const AccountFragment = graphql(
        `fragment Account on Account {
          ...BaseAccount 
          username {
            ...Username
          }
        }`,
        [BaseAccountFragment, UsernameFragment],
      );

      const actual = FragmentResolver.from([AccountFragment]).replaceFrom(
        AccountQuery,
      );

      assertTypedDocumentSatisfies(actual, [NoUnusedFragmentsRule]);
    });
  });

  describe('When providing one or more fragments with the same name', () => {
    it('Then it should throw an error so to warn the developer of the mistake', () => {
      const AccountFragment = graphql(
        `fragment Account on Account {
          username {
            ...Username
          }
        }`,
        [UsernameFragment],
      );
      const PostFieldsFragment = graphql(
        `fragment PostFields on Post {
          id
          author {
            ...Account
          }
        }
        
        fragment Account on Account {
          address
        }`,
      );

      expect(() =>
        FragmentResolver.from([AccountFragment, PostFieldsFragment]),
      ).toThrowErrorMatchingInlineSnapshot(
        `[InvariantError: Duplicate fragment detected. A fragment named "Account" has already been provided, either directly or as part of another fragment document.]`,
      );
    });
  });
});
