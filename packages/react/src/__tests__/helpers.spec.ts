import { ApolloError, QueryResult as ApolloQueryResult } from '@apollo/client';
import { UnspecifiedError } from '@lens-protocol/api-bindings';
import { renderHook } from '@testing-library/react';

import { PaginatedQueryData, QueryData, usePaginatedReadResult, useReadResult } from '../helpers';

describe(`Given the hook helpers`, () => {
  describe(`when creating an hook with the ${useReadResult.name} helper`, () => {
    it(`should wrap any error into ${UnspecifiedError.name}`, async () => {
      const cause = new ApolloError({ graphQLErrors: [] });
      const queryResult = { error: cause, data: undefined, loading: false } as ApolloQueryResult<
        QueryData<void>
      >;
      const { result } = renderHook(() => useReadResult(queryResult));

      expect(result.current).toMatchObject({
        error: expect.any(UnspecifiedError),
        data: undefined,
        loading: false,
      });
    });
  });

  describe(`when creating an hook with the ${usePaginatedReadResult.name} helper`, () => {
    it(`should wrap any error into ${UnspecifiedError.name}`, async () => {
      const cause = new ApolloError({ graphQLErrors: [] });
      const queryResult = { error: cause, data: undefined, loading: false } as ApolloQueryResult<
        PaginatedQueryData<void>
      >;
      const { result } = renderHook(() => usePaginatedReadResult(queryResult));

      expect(result.current).toMatchObject({
        error: expect.any(UnspecifiedError),
        data: undefined,
        loading: false,
      });
    });
  });
});
