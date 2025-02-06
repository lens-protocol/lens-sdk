import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';
import { NamespaceOperationValidationOutcomeFragment } from './primitives';

export const LoggedInUsernameOperationsFragment = graphql(
  `fragment LoggedInUsernameOperations on LoggedInUsernameOperations {
      __typename
      canRemove {
        ...NamespaceOperationValidationOutcome
      }
      canAssign {
        ...NamespaceOperationValidationOutcome
      }
      canUnassign {
        ...NamespaceOperationValidationOutcome
      }
  }`,
  [NamespaceOperationValidationOutcomeFragment],
);
export type LoggedInUsernameOperations = FragmentOf<typeof LoggedInUsernameOperationsFragment>;

export const UsernameFragment = graphql(
  `fragment Username on Username {
      __typename
      id
      value
      localName
      linkedTo
      ownedBy
      timestamp
      namespace
      operations {
        ...LoggedInUsernameOperations
      }
  }`,
  [LoggedInUsernameOperationsFragment],
);
export type Username = FragmentOf<typeof UsernameFragment>;
