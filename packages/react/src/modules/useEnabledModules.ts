import { useEnabledModules as useUnderlyingQuery } from '@lens-protocol/api-bindings';

import { useLensApolloClient } from '../helpers/arguments';
import { useReadResult } from '../helpers/reads';

export function useEnabledModules() {
  return useReadResult(useUnderlyingQuery(useLensApolloClient()));
}
