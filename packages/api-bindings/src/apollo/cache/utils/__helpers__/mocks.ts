import { gql } from '@apollo/client';
import { MockedResponse } from '@apollo/client/testing';
import { faker } from '@faker-js/faker';

import {
  Cursor,
  CursorBasedPaginatedResult,
  FragmentPaginatedResultInfo,
} from '../../../../graphql';
import { mockPaginatedResultInfo } from '../../../../mocks';

export const GetHeroDocument = gql`
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

type Hero = {
  name: string;
};

export type GetHeroVariables = {
  cursor?: string;
};

type HeroPaginatedResult = CursorBasedPaginatedResult<Hero>;

export type GetHeroData = {
  result: HeroPaginatedResult;
};

function mockHero(): Hero {
  return {
    name: faker.helpers.arrayElement(['Luke Skywalker', 'Darth Vader', 'Han Solo']),
  };
}

export function mockHeroPaginatedResult({
  items = [mockHero()],
  next = null,
  prev = null,
}:
  | {
      items?: [];
      next?: null;
      prev?: null;
    }
  | {
      items?: [Hero];
      next?: Cursor | null;
      prev?: Cursor | null;
    } = {}): HeroPaginatedResult {
  return {
    items,
    pageInfo: mockPaginatedResultInfo({
      next,
      prev,
    }),
  };
}

export function mockGetHeroResponse({
  cursor,
  result,
}: {
  cursor?: Cursor;
  result: HeroPaginatedResult;
}): MockedResponse<GetHeroData> {
  return {
    request: {
      query: GetHeroDocument,
      variables: { cursor },
    },
    result: {
      data: { result },
    },
  };
}
