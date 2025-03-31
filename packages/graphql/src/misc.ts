import type { FragmentOf } from 'gql.tada';
import { type RequestOf, graphql } from './graphql';

export const HealthQuery = graphql(
  `query Health {
    value: health
  }`,
);

const AccessControlResultFragment = graphql(`
  fragment AccessControlResult on AccessControlResult {
    address
    createdAt
  }`);
export type AccessControlResult = FragmentOf<typeof AccessControlResultFragment>;

export const AccessControlQuery = graphql(
  `query AccessControl($request: AccessControlRequest!) {
    value: accessControl(request: $request) {
      ...AccessControlResult
    }
  }`,
  [AccessControlResultFragment],
);
export type AccessControlRequest = RequestOf<typeof AccessControlQuery>;
