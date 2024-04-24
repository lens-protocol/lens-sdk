import { ApolloError, gql, QueryResult as ApolloQueryResult, useQuery } from '@apollo/client';
import { MockedResponse } from '@apollo/client/testing';
import { UnspecifiedError } from '@lens-protocol/api-bindings';
import { mockLensApolloClient } from '@lens-protocol/api-bindings/mocks';
import { renderHook, waitFor } from '@testing-library/react';

import { QueryData, useReadResult } from '../reads';

const document = gql`
  query Ping {
    result: ping
  }
`;

type PingData = QueryData<void>;

function mockQueryResponse<TData extends QueryData<unknown>>(data: TData): MockedResponse<TData> {
  return {
    request: {
      query: document,
    },
    result: { data },
  };
}

describe(`Given the read hook helpers`, () => {
  describe(`when rendering an hook created via the ${useReadResult.name} helper`, () => {
    it('should return the data at the end of the initial loading phase', async () => {
      const client = mockLensApolloClient([mockQueryResponse({ result: true })]);
      const { result } = renderHook(() => useReadResult(useQuery<PingData>(document, { client })));

      expect(result.current).toMatchObject({
        error: undefined,
        data: undefined,
        loading: true,
      });

      await waitFor(() => expect(result.current.loading).toBeFalsy());

      expect(result.current).toMatchObject({
        data: true,
        loading: false,
      });
    });

    it(`should wrap any error into ${UnspecifiedError.name}`, async () => {
      const cause = new ApolloError({ graphQLErrors: [] });
      const queryResult = {
        error: cause,
        data: undefined,
        loading: false,
      } as ApolloQueryResult<PingData>;
      const { result } = renderHook(() => useReadResult(queryResult));

      expect(result.current).toMatchObject({
        error: expect.any(UnspecifiedError),
        data: undefined,
        loading: false,
      });
    });

    it(`should return data if immediately available without flickering the loading flag and then update it with fresh data as it updates`, async () => {
      const client = mockLensApolloClient([
        mockQueryResponse({ result: true }),
        mockQueryResponse({ result: false }),
      ]);

      const first = renderHook(() => useReadResult(useQuery<PingData>(document, { client })));
      await waitFor(() => expect(first.result.current.loading).toBeFalsy());

      const second = renderHook(() =>
        useReadResult(
          useQuery<PingData>(document, {
            client,
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first',
          }),
        ),
      );

      expect(second.result.current).toMatchObject({
        data: true,
        loading: false,
      });
      await waitFor(() => expect(first.result.current.data).toBeFalsy());
    });
  });
});
