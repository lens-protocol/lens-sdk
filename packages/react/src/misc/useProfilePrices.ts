import { ProfilePrices, ReadPriceError } from '@lens-protocol/domain/use-cases/profile';

import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useProfilePricesController } from './adapters/useProfilePricesController';

export type { ProfilePrices, ReadPriceError };

/**
 * Retrieve the prices for minting a new Lens Profile, denominated in various currencies.
 *
 * @example
 * ```tsx
 * const { execute, error, loading } = useProfilePrices();
 * ```
 *
 * @category Misc
 * @group Hooks
 */
export function useProfilePrices(): UseDeferredTask<ProfilePrices, ReadPriceError, void> {
  const fetchPrices = useProfilePricesController();

  return useDeferredTask(fetchPrices);
}
