import { useSharedDependencies } from '../shared';

/**
 * Returns the {@link IStorageProvider} or {@link IObservableStorageProvider} instance defined in LensConfig.
 */
export function useStorage() {
  const { config } = useSharedDependencies();

  return config.storage;
}
