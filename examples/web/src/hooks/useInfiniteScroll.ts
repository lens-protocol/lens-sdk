import { PaginatedReadResult } from '@lens-protocol/react-web';
import { RefCallback } from 'react';
import { useInView } from 'react-cool-inview';

export function useInfiniteScroll<T, Q extends PaginatedReadResult<T> = PaginatedReadResult<T>>(
  queryResult: Q,
): Q & { observeRef: RefCallback<unknown> } {
  const { observe: observeRef } = useInView({
    // Grow the root margin so the data will be loaded earlier
    rootMargin: '20% 0px',
    onEnter: async ({ unobserve, observe }) => {
      unobserve();
      await queryResult.next();
      observe();
    },
  });

  return { ...queryResult, observeRef };
}
