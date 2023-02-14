import { CommonPaginatedResultInfoFragment } from './graphql/fragments.generated';
import { buildPaginatedQueryResult } from './helpers';

describe('Given a query function and request for the paginated helper', () => {
  it('should return the next page of results if there are more', async () => {
    const response = {
      items: [1, 2, 3],
      pageInfo: {
        next: 'cursor',
      } as CommonPaginatedResultInfoFragment,
    };

    const result = await buildPaginatedQueryResult(async () => response, {});

    expect(result).toMatchObject(response);

    const nextResult = await result.next();

    expect(nextResult).toMatchObject(response);
  });

  it('should return null if there are no more', async () => {
    const response = {
      items: [1, 2, 3],
      pageInfo: {
        next: null,
      } as CommonPaginatedResultInfoFragment,
    };

    const result = await buildPaginatedQueryResult(async () => response, {});

    expect(result).toMatchObject(response);

    const nextResult = await result.next();

    expect(nextResult).toBe(null);
  });
});
