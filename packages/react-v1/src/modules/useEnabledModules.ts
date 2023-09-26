import { useEnabledModules as useUnderlyingQuery } from '@lens-protocol/api-bindings';

import { useLensApolloClient } from '../helpers/arguments';
import { useReadResult } from '../helpers/reads';

/**
 * @category Misc
 * @group Hooks
 */
export function useEnabledModules() {
  return useReadResult(useUnderlyingQuery(useLensApolloClient()));
}
