import { ApolloClient, InMemoryCache } from '@apollo/client';
import { MockedResponse, mockSingleLink } from '@apollo/client/testing';
import { InvariantError } from '@lens-protocol/shared-kernel';

import { mockCursor } from '../../../../mocks';
import {
  GetHeroData,
  GetHeroDocument,
  GetHeroVariables,
  mockGetHeroResponse,
  mockHeroPaginatedResult,
} from '../__helpers__/mocks';
import { cursorBasedPagination } from '../cursorBasedPagination';

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

  return apollo.watchQuery<GetHeroData, GetHeroVariables>({
    query: GetHeroDocument,
  });
}

describe(`Given a cursor-based paginated query field`, () => {
  describe('and an observable query watching it', () => {
    describe('when fetching the initial page for the first time', () => {
      it('should set the "pageInfo.beforeCount = 0" so to assume there is not results newer than the provided', async () => {
        const observable = setupObservable([
          mockGetHeroResponse({
            result: mockHeroPaginatedResult({
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
          - update "pageInfo.prev" to results prior the initial page and "pageInfo.next" to results after the last page
          - update "pageInfo.moreAfter" accordingly`, async () => {
        const initialResult = mockHeroPaginatedResult({
          next: nextCursor,
          prev: prevCursor,
        });
        const nextResult = mockHeroPaginatedResult({
          next: mockCursor(),
          prev: initialCursor,
        });
        const observable = setupObservable([
          mockGetHeroResponse({
            result: initialResult,
          }),
          mockGetHeroResponse({
            cursor: nextCursor,
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

      it(`should:
          - NOT update the "pageInfo.next" cursor if the incoming result is empty
          - unset the "pageInfo.moreAfter" flag`, async () => {
        const initialResult = mockHeroPaginatedResult({
          next: nextCursor,
          prev: prevCursor,
        });
        const observable = setupObservable([
          mockGetHeroResponse({
            result: initialResult,
          }),
          mockGetHeroResponse({
            cursor: nextCursor,
            result: mockHeroPaginatedResult({
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

    describe('when fetching the previous page', () => {
      it(`should:
          - prepend incoming items to the existing ones
          - update the "pageInfo.prev" to results prior the initial page and "pageInfo.next" to results after the last page
          - update "pageInfo.beforeCount = 0" and "pageInfo.moreAfter" accordingly`, async () => {
        const initialResult = mockHeroPaginatedResult({
          prev: prevCursor,
          next: null,
        });
        const prevResult = mockHeroPaginatedResult({
          next: initialCursor,
          prev: mockCursor(),
        });
        const observable = setupObservable([
          mockGetHeroResponse({
            result: initialResult,
          }),
          mockGetHeroResponse({
            cursor: prevCursor,
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

      it(`should:
          - NOT update the "pageInfo.prev" cursor if the incoming result is empty
          - update the "pageInfo.beforeCount = 0"`, async () => {
        const initialResult = mockHeroPaginatedResult({
          prev: prevCursor,
          next: nextCursor,
        });
        const observable = setupObservable([
          mockGetHeroResponse({
            result: initialResult,
          }),
          mockGetHeroResponse({
            cursor: prevCursor,
            result: mockHeroPaginatedResult({
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

    describe('when fetching the initial page again', () => {
      it('should replace the existing items with the incoming ones', async () => {
        const initialResult = mockHeroPaginatedResult({
          next: nextCursor,
        });
        const nextResult = mockHeroPaginatedResult({
          next: mockCursor(),
          prev: initialCursor,
        });
        const observable = setupObservable([
          mockGetHeroResponse({
            result: initialResult,
          }),
          mockGetHeroResponse({
            cursor: nextCursor,
            result: nextResult,
          }),
          mockGetHeroResponse({
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
      const unknownPageResponse = mockGetHeroResponse({
        cursor: unknownCursor,
        result: mockHeroPaginatedResult(),
      });

      it(`should throw an ${InvariantError.name}`, async () => {
        const observable = setupObservable([
          mockGetHeroResponse({
            result: mockHeroPaginatedResult(),
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
