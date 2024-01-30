import { OperationVariables } from '@apollo/client';
import { MockedResponse } from '@apollo/client/testing';
import { DocumentNode } from 'graphql';

import { defaultQueryParams } from '../../../apollo';
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
        imageMediumSize: defaultQueryParams.image?.medium ?? {},
        imageSmallSize: defaultQueryParams.image?.small ?? {},
        profileCoverSize: defaultQueryParams.profile?.cover ?? {},
        profilePictureSize: defaultQueryParams.profile?.thumbnail ?? {},
        profileMetadataSource: null,
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
  return mockAnyResponse({
    request: {
      query,
      variables,
    },
    result: {
      data: {
        result: {
          items,
          pageInfo: info,
        },
      },
    },
  });
}
