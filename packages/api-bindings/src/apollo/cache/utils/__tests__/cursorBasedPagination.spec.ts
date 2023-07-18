import { ApolloClient, InMemoryCache } from '@apollo/client';
import { MockedResponse, mockSingleLink } from '@apollo/client/testing';
import { InvariantError } from '@lens-protocol/shared-kernel';

import { mockCursor } from '../../../../mocks';
import {
  AnyPaginatedQueryData,
  AnyPaginatedQueryDocument,
  AnyPaginatedQueryVariables,
  mockAnyPaginatedQueryResponse,
  mockAnyPaginatedQueryResult,
} from '../__helpers__/mocks';
import { cursorBasedPagination, newResultsProbe } from '../cursorBasedPagination';

const initialCursor = mockCursor();
const nextCursor = mockCursor();
const prevCursor = mockCursor();

function setupObservable(mocks: ReadonlyArray<MockedResponse<unknown>>) {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          hero: cursorBasedPagination([]),
        },
      },
    },
  });

  const apollo = new ApolloClient({
    cache,
    link: mockSingleLink(...mocks).setOnError((error) => {
      throw error;
    }),
  });

  return apollo.watchQuery<AnyPaginatedQueryData, AnyPaginatedQueryVariables>({
    query: AnyPaginatedQueryDocument,
  });
}

describe(`Given a cursor-based paginated query field`, () => {
  describe('and an observable query watching it', () => {
    describe('when fetching the initial page for the first time', () => {
      it('should set the "pageInfo.beforeCount = 0" so to assume there is not results newer than the provided', async () => {
        const observable = setupObservable([
          mockAnyPaginatedQueryResponse({
            result: mockAnyPaginatedQueryResult({
              prev: prevCursor,
              next: nextCursor,
            }),
          }),
        ]);

        const { data } = await observable.result();

        expect(data.result).toMatchObject({
          pageInfo: {
            beforeCount: 0,
            moreAfter: true,
          },
        });
      });
    });

    describe('when fetching the next page', () => {
      it(`should:
          - append incoming items to the existing ones
          - update "pageInfo.prev" to results prior the first page and "pageInfo.next" to results after the new last page
          - update "pageInfo.moreAfter" accordingly`, async () => {
        const initialResult = mockAnyPaginatedQueryResult({
          next: nextCursor,
          prev: prevCursor,
        });
        const nextResult = mockAnyPaginatedQueryResult({
          next: mockCursor(),
          prev: initialCursor,
        });
        const observable = setupObservable([
          mockAnyPaginatedQueryResponse({
            result: initialResult,
          }),
          mockAnyPaginatedQueryResponse({
            variables: { cursor: nextCursor },
            result: nextResult,
          }),
        ]);

        await observable.result();

        await observable.fetchMore({
          variables: {
            cursor: nextCursor,
          },
        });
        const { data } = await observable.result();

        expect(data.result).toMatchObject({
          items: [...initialResult.items, ...nextResult.items],
          pageInfo: {
            beforeCount: 0,
            moreAfter: true,
            next: nextResult.pageInfo.next,
            prev: initialResult.pageInfo.prev,
          },
        });
      });

      describe('but the incoming result is empty', () => {
        it(`should:
            - NOT update the "pageInfo.next" cursor
            - unset the "pageInfo.moreAfter" flag`, async () => {
          const initialResult = mockAnyPaginatedQueryResult({
            next: nextCursor,
            prev: prevCursor,
          });
          const observable = setupObservable([
            mockAnyPaginatedQueryResponse({
              result: initialResult,
            }),
            mockAnyPaginatedQueryResponse({
              variables: { cursor: nextCursor },
              result: mockAnyPaginatedQueryResult({
                items: [],
                prev: null,
                next: null,
              }),
            }),
          ]);

          await observable.result();

          await observable.fetchMore({
            variables: {
              cursor: nextCursor,
            },
          });
          const { data } = await observable.result();

          expect(data.result).toMatchObject({
            pageInfo: {
              beforeCount: 0,
              moreAfter: false,
              next: initialResult.pageInfo.next,
              prev: initialResult.pageInfo.prev,
            },
          });
        });
      });
    });

    describe('when fetching the previous page', () => {
      it(`should:
          - prepend incoming items to the existing ones
          - update the "pageInfo.prev" to results prior the new first page and "pageInfo.next" to results after the last page
          - update "pageInfo.beforeCount = 0" and "pageInfo.moreAfter" accordingly`, async () => {
        const initialResult = mockAnyPaginatedQueryResult({
          prev: prevCursor,
          next: null,
        });
        const prevResult = mockAnyPaginatedQueryResult({
          next: initialCursor,
          prev: mockCursor(),
        });
        const observable = setupObservable([
          mockAnyPaginatedQueryResponse({
            result: initialResult,
          }),
          mockAnyPaginatedQueryResponse({
            variables: { cursor: prevCursor },
            result: prevResult,
          }),
        ]);

        await observable.result();

        await observable.fetchMore({
          variables: {
            cursor: prevCursor,
          },
        });
        const { data } = await observable.result();

        expect(data.result).toMatchObject({
          items: [...prevResult.items, ...initialResult.items],
          pageInfo: {
            beforeCount: 0,
            moreAfter: false,
            next: initialResult.pageInfo.next,
            prev: prevResult.pageInfo.prev,
          },
        });
      });

      describe('but the incoming result is empty', () => {
        it(`should:
            - NOT update the "pageInfo.prev" cursor
            - update the "pageInfo.beforeCount = 0"`, async () => {
          const initialResult = mockAnyPaginatedQueryResult({
            prev: prevCursor,
            next: nextCursor,
          });
          const observable = setupObservable([
            mockAnyPaginatedQueryResponse({
              result: initialResult,
            }),
            mockAnyPaginatedQueryResponse({
              variables: { cursor: prevCursor },
              result: mockAnyPaginatedQueryResult({
                items: [],
                prev: null,
                next: null,
              }),
            }),
          ]);

          await observable.result();

          await observable.fetchMore({
            variables: {
              cursor: prevCursor,
            },
          });
          const { data } = await observable.result();

          expect(data.result).toMatchObject({
            pageInfo: {
              beforeCount: 0,
              moreAfter: true,
              next: initialResult.pageInfo.next,
              prev: initialResult.pageInfo.prev,
            },
          });
        });
      });

      describe('as part of a query flagged as probe for newer results', () => {
        it(`should:
            - update the "pageInfo.beforeCount" to the number of results
            - retains the existing items
            - retain the "pageInfo.prev" cursor`, async () => {
          const initialResult = mockAnyPaginatedQueryResult({
            prev: prevCursor,
            next: nextCursor,
          });
          const prevResult = mockAnyPaginatedQueryResult({
            next: initialCursor,
            prev: mockCursor(),
          });
          const observable = setupObservable([
            mockAnyPaginatedQueryResponse({
              result: initialResult,
            }),
            mockAnyPaginatedQueryResponse({
              variables: newResultsProbe({ cursor: prevCursor }),
              result: prevResult,
            }),
          ]);

          await observable.result();

          await observable.fetchMore({
            variables: newResultsProbe({
              cursor: prevCursor,
            }),
          });

          const { data } = await observable.result();

          expect(data.result).toMatchObject({
            pageInfo: {
              beforeCount: prevResult.items.length,
              moreAfter: true,
              next: initialResult.pageInfo.next,
              prev: initialResult.pageInfo.prev,
            },
          });
        });
      });
    });

    describe('when fetching the initial page again', () => {
      it('should replace the existing items with the incoming ones', async () => {
        const initialResult = mockAnyPaginatedQueryResult({
          next: nextCursor,
        });
        const nextResult = mockAnyPaginatedQueryResult({
          next: mockCursor(),
          prev: initialCursor,
        });
        const observable = setupObservable([
          mockAnyPaginatedQueryResponse({
            result: initialResult,
          }),
          mockAnyPaginatedQueryResponse({
            variables: { cursor: nextCursor },
            result: nextResult,
          }),
          mockAnyPaginatedQueryResponse({
            result: initialResult,
          }),
        ]);

        await observable.result();

        await observable.fetchMore({
          variables: {
            cursor: nextCursor,
          },
        });

        // refetch initial page
        const { data } = await observable.refetch();

        expect(data.result).toMatchObject(initialResult);
      });
    });

    describe('when the incoming items cannot be prepended or appended to the existing items', () => {
      const unknownCursor = mockCursor();
      const unknownPageResponse = mockAnyPaginatedQueryResponse({
        variables: { cursor: unknownCursor },
        result: mockAnyPaginatedQueryResult(),
      });

      it(`should throw an ${InvariantError.name}`, async () => {
        const observable = setupObservable([
          mockAnyPaginatedQueryResponse({
            result: mockAnyPaginatedQueryResult(),
          }),
          unknownPageResponse,
        ]);

        await observable.result();

        await expect(() =>
          observable.fetchMore({
            variables: {
              cursor: unknownCursor,
            },
          }),
        ).rejects.toThrow(InvariantError);
      });
    });
  });
});
