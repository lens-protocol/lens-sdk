import { GraphQLClient } from 'graphql-request';

import { buildPaginatedQueryResult } from './buildPaginatedQueryResult';
import { mumbaiSandbox } from '../consts/environments';
import { getSdk } from '../search/graphql/search.generated';

describe('Given a paginated query function and the paginated query result helper', () => {
  const sdk = getSdk(new GraphQLClient(mumbaiSandbox.gqlEndpoint));

  it('should be able to paginate forward', async () => {
    const result = await buildPaginatedQueryResult(
      async (variables) => {
        const res = await sdk.SearchProfiles(variables);

        return res.data.result;
      },
      { query: 'test', limit: 10 },
    );

    await expect(result.next()).resolves.not.toThrow();
  });

  it('should be able to paginate forward and then back', async () => {
    const result = await buildPaginatedQueryResult(
      async (variables) => {
        const res = await sdk.SearchProfiles(variables);

        return res.data.result;
      },
      { query: 'test', limit: 10 },
    );

    const firstPageResults = [...result.items];

    await expect(result.next()).resolves.not.toThrow();

    expect(firstPageResults).not.toEqual(result.items);

    await expect(result.prev()).resolves.not.toThrow();

    expect(result.items).toEqual(firstPageResults);
  });

  it('should be able to paginate forward and then back even if there are no results', async () => {
    const result = await buildPaginatedQueryResult(
      async (variables) => {
        const res = await sdk.SearchProfiles(variables);

        return res.data.result;
      },
      { query: 'somethingcrazywithnoresults', limit: 10 },
    );

    await expect(result.next()).resolves.not.toThrow();
    await expect(result.prev()).resolves.not.toThrow();
  });
});
