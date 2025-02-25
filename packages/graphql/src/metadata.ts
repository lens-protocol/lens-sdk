import type { FragmentOf } from 'gql.tada';
import { type RequestOf, graphql } from './graphql';

export const RefreshMetadataStatusResultFragment = graphql(
  `fragment RefreshMetadataStatusResult on RefreshMetadataStatusResult {
    __typename
    id
    status
    reason
    updatedAt
  }`,
);
export type RefreshMetadataStatusResult = FragmentOf<typeof RefreshMetadataStatusResultFragment>;

export const RefreshMetadataStatusQuery = graphql(
  `query RefreshMetadataStatus($request: UUID!) {
    value: refreshMetadataStatus(id: $request) {
      ...RefreshMetadataStatusResult
    }
  }`,
  [RefreshMetadataStatusResultFragment],
);

export const RefreshMetadataResultFragment = graphql(
  `fragment RefreshMetadataResult on RefreshMetadataResult {
    __typename
    id
  }`,
);
export type RefreshMetadataResult = FragmentOf<typeof RefreshMetadataResultFragment>;

export const RefreshMetadataMutation = graphql(
  `mutation RefreshMetadata($request: EntityId!) {
    value: refreshMetadata(request: $request){
      ...RefreshMetadataResult
    }
  }`,
  [RefreshMetadataResultFragment],
);
export type RefreshMetadataRequest = RequestOf<typeof RefreshMetadataMutation>;
