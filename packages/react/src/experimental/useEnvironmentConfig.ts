import type { EnvironmentConfig } from '../environments';
import { useSharedDependencies } from '../shared';

/**
 * Returns the internal {@link EnvironmentConfig}.
 *
 * @internal
 */
export function useEnvironmentConfig(): EnvironmentConfig {
  const { environment } = useSharedDependencies();

  return environment;
}
