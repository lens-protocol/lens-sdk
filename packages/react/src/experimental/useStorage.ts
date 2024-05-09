import { useSharedDependencies } from '../shared';

/**
 * Returns the {@link IStorageProvider} or {@link IObservableStorageProvider} instance defined in LensConfig.
 *
 * @category Misc
 * @group Hooks
 */
export function useStorage() {
  const { config } = useSharedDependencies();

  return config.storage;
}
