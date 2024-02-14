import { GraphQLClient } from 'graphql-request';

import { buildTestEnvironment } from '../__helpers__';
import { LimitType } from '../graphql/types.generated';
import { getSdk } from '../submodules/momoka/graphql/momoka.generated';
import { buildPaginatedQueryResult } from './buildPaginatedQueryResult';

describe('Given a paginated query function and the paginated query result helper', () => {
  const environment = buildTestEnvironment();
  const sdk = getSdk(new GraphQLClient(environment.gqlEndpoint));

  it('should be able to paginate forward and then back', async () => {
    const result = await buildPaginatedQueryResult(
      async (currRequest) => {
        const res = await sdk.momokaTransactions({
          request: currRequest,
        });

        return res.data.result;
      },
      { limit: LimitType.Ten },
    );

    const firstPageResults = [...result.items];

    await expect(result.next()).resolves.not.toThrow();

    expect(firstPageResults).not.toEqual(result.items);

    await expect(result.prev()).resolves.not.toThrow();

    // TODO: enable when the prev items order is fixed on the API side
    // expect(result.items).toEqual(firstPageResults);
  });
});
