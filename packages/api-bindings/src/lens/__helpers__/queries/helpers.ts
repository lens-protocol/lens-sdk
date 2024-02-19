import { OperationVariables } from '@apollo/client';
import { MockedResponse } from '@apollo/client/testing';
import { DocumentNode } from 'graphql';

import { PaginatedResultInfo } from '../../graphql/generated';
import { mockPaginatedResultInfo } from '../fragments';

// TODO verify if this is still needed
export function mockAnyResponse(bulk: MockedResponse) {
  return {
    request: {
      query: bulk.request.query,
    },
    variableMatcher: (variables: OperationVariables) => {
      if (!bulk.request.variables) {
        return true;
      }

      for (const key in bulk.request.variables) {
        if (variables[key] !== bulk.request.variables[key]) {
          // eslint-disable-next-line no-console
          console.error(
            `Variable ${key} mismatch, expected: ${bulk.request.variables[key]}, got: ${variables[key]}`,
          );
          return false;
        }
      }
      return true;
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
