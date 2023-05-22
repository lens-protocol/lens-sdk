import type { EnvironmentConfig } from '../environments';
import { useSharedDependencies } from '../shared';

/**
 * Returns the internal Apollo Client instance.
 
 * @experimental This hook is experimental and may change in the future.
 * @category Misc
 * @group Hooks
 */
export function useEnvironmentConfig(): EnvironmentConfig {
  const { environment } = useSharedDependencies();

  return environment;
}
