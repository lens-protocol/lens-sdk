import { OperationVariables } from '@apollo/client';
import { MockedResponse } from '@apollo/client/testing';
import { DocumentNode } from 'graphql';

import { PaginatedResultInfo, SupportedFiatType } from '../../graphql/generated';
import { mockPaginatedResultInfo } from '../fragments';

export function mockAnyResponse(bulk: MockedResponse) {
  return {
    request: {
      query: bulk.request.query,
      variables: {
        ...bulk.request.variables,
        // The values below should match the superset of the variables default values used in
        // any query that needs such variables. The fact one query might use a subset of these
        // variables is irrelevant.
        fxRateFor: SupportedFiatType.Usd,
        imageMediumSize: {},
        imageSmallSize: {},
        profileCoverSize: {},
        profilePictureSize: {},
      },
    },
    result: bulk.result,
  };
}

/**
 * Mock any paginated responses.
 */
export function mockAnyPaginatedResponse<V extends OperationVariables, I>({
  variables,
  items,
  info = mockPaginatedResultInfo(),
  query,
}: {
  variables: V;
  items: I[];
  info?: PaginatedResultInfo;
  query: DocumentNode;
}) {
  return {
    request: {
      query,
      variables: {
        ...variables,
        // The values below should match the superset of the variables default values used in
        // any query that needs such variables. The fact one query might use a subset of these
        // variables is irrelevant.
        fxRateFor: SupportedFiatType.Usd,
        imageMediumSize: {},
        imageSmallSize: {},
        profileCoverSize: {},
        profilePictureSize: {},
      },
    },
    result: {
      data: {
        result: {
          items,
          pageInfo: info,
        },
      },
    },
  };
}
