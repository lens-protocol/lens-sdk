import { LensResponseWithPagination } from '@lens-protocol/react';

type NarrowedQueryData<T> = { loading: true; data: undefined } | { loading: false; data: T };
type NarrowedQueryResult<T> = NarrowedQueryData<T> &
  Omit<LensResponseWithPagination<T>, 'error' | 'loading' | 'data'>;

export const nonErrored = <T>({
  error,
  loading,
  data,
  ...rest
}: LensResponseWithPagination<T>): NarrowedQueryResult<T> => {
  if (error) {
    throw error;
  }

  if (data && !loading) {
    return {
      loading: false,
      data,
      ...rest,
    };
  }

  return {
    loading: true,
    data: undefined,
    ...rest,
  };
};
