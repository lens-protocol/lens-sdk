import { CommonPaginatedResultInfoFragment } from './graphql/fragments.generated';

type PaginatedQueryData<K = unknown[]> = {
  data: {
    result: {
      pageInfo: CommonPaginatedResultInfoFragment;
      items: K;
    };
  };
};

type InferPaginatedItemsType<T extends PaginatedQueryData<unknown>> = T extends PaginatedQueryData<
  infer R
>
  ? R
  : never;

export type PaginatedResult<T> = T & {
  next(): Promise<PaginatedResult<T> | null>;
  prev(): Promise<PaginatedResult<T> | null>;
};

export async function buildPaginatedQueryResult<
  V,
  T extends PaginatedQueryData<K>,
  K = InferPaginatedItemsType<T>,
>(queryFn: (variables: V) => Promise<K>, variables: V): Promise<PaginatedResult<K>> {
  const result = await queryFn(variables);
  const paginatedResult = result as PaginatedQueryData;

  return {
    ...result,
    async next() {
      if (paginatedResult.data.result.pageInfo.next) {
        return buildPaginatedQueryResult(queryFn, {
          ...variables,
          cursor: paginatedResult.data.result.pageInfo.next,
        });
      }

      return null;
    },

    async prev() {
      if (paginatedResult.data.result.pageInfo.prev) {
        return buildPaginatedQueryResult(queryFn, {
          ...variables,
          cursor: paginatedResult.data.result.pageInfo.prev,
        });
      }

      return null;
    },
  };
  // result.pageInfo.
  //   return {
  //     ...result,
  //     next() {
  //       // if (result.) {
  //
  //       // }
  //
  //       return buildPaginatedQueryResult(queryFn, variables, result);
  //     },
  //   };
}
// export async function buildPaginatedQueryResult<V, T, QueryFn extends (variables: V) => Promise<T>>(
//   queryFn: QueryFn,
//   request: V,
//   result?: T,
// ): Promise<T> {
//   const res = result ?? (await queryFn(request));
//
//   return {
//     ...res,
//     async prev() {
//       if (res.data.result.pageInfo.next) {
//         const prevResult = await queryFn({
//           ...request,
//           cursor: res.data.result.pageInfo.prev,
//         });
//
//         return buildPaginatedQueryResult(queryFn, request, prevResult);
//       }
//
//       return null;
//     },
//     async next() {
//       if (res.data.result.pageInfo.next) {
//         const nextResult = await queryFn({
//           ...request,
//           cursor: res.data.result.pageInfo.next,
//         });
//
//         return buildPaginatedQueryResult(queryFn, request, nextResult);
//       }
//
//       return null;
//     },
//   };
// }
