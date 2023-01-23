import { useEffect, useMemo } from 'react';

export function useFilePreview<T extends File | null>(file: T) {
  const url = useMemo(
    () => (file ? URL.createObjectURL(file) : null) as T extends File ? string : null,
    [file],
  );

  useEffect(
    () => () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    },
    [url],
  );

  return url;
}
