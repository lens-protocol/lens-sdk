import { EnabledModulesFragment, useEnabledModulesQuery } from '@lens-protocol/api-bindings';

import { ReadResult, useReadResult } from '../helpers';
import { useSharedDependencies } from '../shared';

export function useEnabledModules(): ReadResult<EnabledModulesFragment> {
  const { apolloClient } = useSharedDependencies();
  return useReadResult(useEnabledModulesQuery({ client: apolloClient }));
}
