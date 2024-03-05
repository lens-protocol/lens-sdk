import { OperationVariables } from '@apollo/client';
import { MockedResponse } from '@apollo/client/testing';
import { DocumentNode } from 'graphql';

import { PaginatedResultInfo } from '../../graphql/generated';
import { mockPaginatedResultInfo } from '../fragments';

/**
 * Mock any response by matching the query and variables.
 */
export function mockAnyResponse(bulk: MockedResponse) {
  return {
    request: {
      query: bulk.request.query,
    },
    variableMatcher: (variables: OperationVariables) => {
      if (!bulk.request.variables) {
        return true;
      }

      try {
        expect(variables).toMatchObject(bulk.request.variables);
        return true;
      } catch {
        return false;
      }
    },
    result: bulk.result,
  };
}

/**
 * Mock any paginated responses by matching the query and variables.
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
