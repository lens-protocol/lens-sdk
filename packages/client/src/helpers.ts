import { CommonPaginatedResultInfoFragment } from './graphql/fragments.generated';

export async function buildPaginatedQueryResult<
  V,
  QueryFn extends (variables: V) => Promise<Result>,
  Result extends { data: { result: { pageInfo: CommonPaginatedResultInfoFragment } } },
>(queryFn: QueryFn, request: V, result?: Result) {
  const res = result ?? (await queryFn(request));

  return {
    ...res,
    async prev() {
      if (res.data.result.pageInfo.next) {
        const prevResult = await queryFn({
          ...request,
          cursor: res.data.result.pageInfo.prev,
        });

        return buildPaginatedQueryResult(queryFn, request, prevResult);
      }

      return null;
    },
    async next() {
      if (res.data.result.pageInfo.next) {
        const nextResult = await queryFn({
          ...request,
          cursor: res.data.result.pageInfo.next,
        });

        return buildPaginatedQueryResult(queryFn, request, nextResult);
      }

      return null;
    },
  };
}
