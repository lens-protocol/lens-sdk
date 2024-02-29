import { QueryResult } from '@apollo/client';
import { UnspecifiedError } from '@lens-protocol/api-bindings';
import { useEffect, useState } from 'react';

import { ReadResult, useReadResult } from '../helpers/reads';
import {
  ProfilePriceResult,
  useProfilePriceController,
} from './adapters/useProfilePriceController';

export type { ProfilePriceResult };

/**
 * Retrieve the prices for minting a new Lens Profile, denominated in various currencies.
 *
 * @example
 * ```tsx
 * const { data, error, loading } = useProfilePrice();
 * ```
 *
 * @category Misc
 * @group Hooks
 */
export function useProfilePrice(): ReadResult<ProfilePriceResult> {
  const [prices, setPrices] = useState<ProfilePriceResult>();
  const [error, setError] = useState<UnspecifiedError>();
  const fetchPrices = useProfilePriceController();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchPrices();

      if (result.isFailure()) {
        setError(result.error);
        return;
      }

      setPrices(result.value);
    };

    void fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useReadResult({ error, data: { result: prices } } as QueryResult);
}
