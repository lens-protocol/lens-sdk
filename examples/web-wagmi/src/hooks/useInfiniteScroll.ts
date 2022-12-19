import { LensResponseWithPagination } from '@lens-protocol/react';
import { useInView } from 'react-cool-inview';

import { nonErrored } from '../utils/nonErrored';

export function useInfiniteScroll<T>(queryResult: LensResponseWithPagination<T>) {
  const nonErroredQueryResult = nonErrored(queryResult);

  const { observe: observeRef } = useInView({
    // Grow the root margin so the data will be loaded earlier
    rootMargin: '20% 0px',
    onEnter: async ({ unobserve, observe }) => {
      unobserve();
      await nonErroredQueryResult.next();
      observe();
    },
  });

  return { ...nonErroredQueryResult, observeRef };
}
