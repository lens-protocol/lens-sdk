import { gql } from '@apollo/client';
import { MockedResponse } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';

import { Cursor, CursorBasedPaginatedResult, FragmentPaginatedResultInfo } from '../../../../lens';
import { mockPaginatedResultInfo } from '../../../../lens/__helpers__/fragments';

export const AnyPaginatedQueryDocument = gql`
  query GetHero($cursor: String!) {
    result: hero(cursor: $cursor) {
      items {
        name
      }
      pageInfo {
        ...PaginatedResultInfo
      }
    }
  }
  ${FragmentPaginatedResultInfo}
`;

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
