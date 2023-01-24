import { ApolloError, QueryResult as ApolloQueryResult } from '@apollo/client';
import { renderHook } from '@testing-library/react';

import { PaginatedQueryData, QueryData, usePaginatedReadResult, useReadResult } from '../helpers';
import { NetworkError } from '../publication/adapters/NetworkError';

describe(`Given the hook helpers`, () => {
  describe(`when creating an hook with the ${useReadResult.name} helper`, () => {
    it(`should wrap any error into ${NetworkError.name}`, async () => {
      const cause = new ApolloError({ graphQLErrors: [] });
      const queryResult = { error: cause, data: undefined, loading: false } as ApolloQueryResult<
        QueryData<void>
      >;
      const { result } = renderHook(() => useReadResult(queryResult));

      expect(result.current).toMatchObject({
        error: expect.any(NetworkError),
        data: undefined,
        loading: false,
      });
    });
  });

  describe(`when creating an hook with the ${usePaginatedReadResult.name} helper`, () => {
    it(`should wrap any error into ${NetworkError.name}`, async () => {
      const cause = new ApolloError({ graphQLErrors: [] });
      const queryResult = { error: cause, data: undefined, loading: false } as ApolloQueryResult<
        PaginatedQueryData<void>
      >;
      const { result } = renderHook(() => usePaginatedReadResult(queryResult));

      expect(result.current).toMatchObject({
        error: expect.any(NetworkError),
        data: undefined,
        loading: false,
      });
    });
  });
});
