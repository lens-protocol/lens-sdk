import { useProfilesToFollow as useUnderlyingQuery } from '@lens-protocol/api-bindings';

import {
  WithObserverIdOverride,
  useActiveProfileAsDefaultObserver,
  useSourcesFromConfig,
  useLensApolloClient,
} from '../helpers/arguments';
import { useReadResult } from '../helpers/reads';

export type UseProfilesToFollowArgs = WithObserverIdOverride;

/**
 * @category Profiles
 * @group Hooks
 */
export function useProfilesToFollow({ observerId }: UseProfilesToFollowArgs = {}) {
  return useReadResult(
    useUnderlyingQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useSourcesFromConfig({
            observerId,
          }),
        }),
      ),
    ),
  );
}
