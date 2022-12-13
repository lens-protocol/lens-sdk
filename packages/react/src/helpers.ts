import { QueryResult } from '@apollo/client';

export type LensResponse<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export function useLensResponse<T, V>({
  error,
  data,
  loading,
}: QueryResult<T, V>): LensResponse<T> {
  return {
    data: data ?? null,
    loading,
    error: error ? new Error(error.message) : null,
  };
}
