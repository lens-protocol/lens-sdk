import { buildPaginatedQueryResult } from './helpers';

describe('Given a query function and request for the paginated helper', () => {
  it('should return the next page of results if there are more', async () => {
    const response = {
      data: {
        result: {
          items: [1, 2, 3],
          pageInfo: {
            next: 'cursor',
          },
        },
      },
    };

    const result = await buildPaginatedQueryResult(async () => response, {});

    expect(result.data).toMatchObject(response.data);

    expect(true).toBe(true);

    const nextResult = await result.next();

    expect(nextResult?.data).toMatchObject(response.data);
  });

  it('should return null if there are no more', async () => {
    const response = {
      data: {
        result: {
          items: [1, 2, 3],
          pageInfo: {
            next: null,
          },
        },
      },
    };

    const result = await buildPaginatedQueryResult(async () => response, {});

    expect(result.data).toMatchObject(response.data);

    expect(true).toBe(true);

    const nextResult = await result.next();

    expect(nextResult).toBe(null);
  });
});
