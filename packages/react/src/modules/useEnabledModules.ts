import { useEnabledModulesQuery } from '@lens-protocol/api-bindings';

import { useReadResult } from '../helpers/reads';
import { useSharedDependencies } from '../shared';

export function useEnabledModules() {
  const { apolloClient } = useSharedDependencies();
  return useReadResult(useEnabledModulesQuery({ client: apolloClient }));
}
