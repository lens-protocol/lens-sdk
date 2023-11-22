import { MockedResponse } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';
import { DocumentNode } from 'graphql';

import { Cursor, CursorBasedPaginatedResult, FragmentPaginatedResultInfo } from '../../../../lens';
import { mockPaginatedResultInfo } from '../../../../lens/__helpers__/fragments';

/**
 * AST for:
 *
 * ```graphql
 * query GetHero($cursor: String!) {
 *   result: hero(cursor: $cursor) {
 *     items {
 *       name
 *     }
 *     pageInfo {
 *       ...PaginatedResultInfo
 *     }
 *   }
 * }
 * ```
 *
 * We couldn't use `graphql-tag` because it's does rely on fragment `DocumentNode` to
 * have `loc` property (from `gql` usage itself), which is not the case for our generated
 * fragments.
 */

export const AnyPaginatedQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetHero' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'cursor' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Cursor' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'hero' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'cursor' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'cursor' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'name' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PaginatedResultInfo' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    ...FragmentPaginatedResultInfo.definitions,
  ],
} as unknown as DocumentNode;

type AnyPaginatedItem = {
  name: string;
};

export type AnyPaginatedQueryVariables = {
  cursor?: string;
};

type AnyPaginatedQueryResult = CursorBasedPaginatedResult<AnyPaginatedItem>;

export type AnyPaginatedQueryData = {
  result: AnyPaginatedQueryResult;
};

function mockAnyPaginatedItem(): AnyPaginatedItem {
  return {
    name: faker.helpers.arrayElement(['Luke Skywalker', 'Darth Vader', 'Han Solo']),
  };
}

export function mockAnyPaginatedQueryResult<T = AnyPaginatedItem>({
  items = [mockAnyPaginatedItem() as T],
  next = null,
  prev = null,
}:
  | {
      items?: T[];
      next?: null;
      prev?: null;
    }
  | {
      items?: [T];
      next?: Cursor | null;
      prev?: Cursor | null;
    } = {}): CursorBasedPaginatedResult<T> {
  return {
    items,
    pageInfo: mockPaginatedResultInfo({
      next,
      prev,
    }),
  };
}

export function mockAnyPaginatedQueryResponse({
  variables = {},
  result,
}: {
  variables?: AnyPaginatedQueryVariables;
  result: AnyPaginatedQueryResult;
}): MockedResponse<AnyPaginatedQueryData> {
  return {
    request: {
      query: AnyPaginatedQueryDocument,
      variables,
    },
    result: {
      data: { result },
    },
  };
}
