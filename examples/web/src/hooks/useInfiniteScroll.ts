import { SuspendablePaginatedResult } from '@lens-protocol/react-web';
import { RefCallback, startTransition } from 'react';
import { useInView } from 'react-cool-inview';

export function useInfiniteScroll<T, Q extends SuspendablePaginatedResult<T>>(
  queryResult: Q,
): Q & { observeRef: RefCallback<unknown> } {
  const { observe: observeRef } = useInView({
    // Grow the root margin so the data will be loaded earlier
    rootMargin: '20% 0px',
    onEnter: async ({ unobserve, observe }) => {
      unobserve();
      startTransition(() => {
        void queryResult.next();
      });
      observe();
    },
  });

  return { ...queryResult, observeRef };
}
