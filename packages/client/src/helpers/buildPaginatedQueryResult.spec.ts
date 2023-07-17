import { GraphQLClient } from 'graphql-request';

import { buildTestEnvironment } from '../__helpers__';
import { defaultMediaTransformParams } from '../consts/defaults';
import { getSdk } from '../profile/graphql/profile.generated';
import { buildPaginatedQueryResult } from './buildPaginatedQueryResult';

describe('Given a paginated query function and the paginated query result helper', () => {
  const environment = buildTestEnvironment();
  const sdk = getSdk(new GraphQLClient(environment.gqlEndpoint));

  it('should be able to paginate forward', async () => {
    const result = await buildPaginatedQueryResult(
      async (currRequest) => {
        const res = await sdk.Profiles({
          request: currRequest,
          observerId: undefined,
          mediaTransformParams: defaultMediaTransformParams,
        });

        return res.data.result;
      },
      { ownedBy: ['0xa5653e88D9c352387deDdC79bcf99f0ada62e9c6'], limit: 2 },
    );

    await expect(result.next()).resolves.not.toThrow();
  });

  it('should be able to paginate forward and then back', async () => {
    const result = await buildPaginatedQueryResult(
      async (currRequest) => {
        const res = await sdk.Profiles({
          request: currRequest,
          observerId: undefined,
          mediaTransformParams: defaultMediaTransformParams,
        });

        return res.data.result;
      },
      { ownedBy: ['0xa5653e88D9c352387deDdC79bcf99f0ada62e9c6'], limit: 2 },
    );

    const firstPageResults = [...result.items];

    await expect(result.next()).resolves.not.toThrow();

    expect(firstPageResults).not.toEqual(result.items);

    await expect(result.prev()).resolves.not.toThrow();

    expect(result.items).toEqual(firstPageResults);
  });

  it('should be able to paginate forward and then back even if there are no results', async () => {
    const result = await buildPaginatedQueryResult(
      async (currRequest) => {
        const res = await sdk.Profiles({
          request: currRequest,
          observerId: undefined,
          mediaTransformParams: defaultMediaTransformParams,
        });

        return res.data.result;
      },
      { ownedBy: ['0xa5653e88D9c352387deDdC79bcf99f0ada62e9c6'], limit: 50 },
    );

    await expect(result.next()).resolves.not.toThrow();
    await expect(result.prev()).resolves.not.toThrow();
  });
});
