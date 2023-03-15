import { useProfilesToFollowQuery } from '@lens-protocol/api-bindings';

import {
  WithObserverIdOverride,
  useActiveProfileAsDefaultObserver,
  useConfigSourcesVariable,
  useLensApolloClient,
} from '../helpers/arguments';
import { useReadResult } from '../helpers/reads';

export type UseProfilesToFollowArgs = WithObserverIdOverride;

export function useProfilesToFollow({ observerId }: UseProfilesToFollowArgs = {}) {
  return useReadResult(
    useProfilesToFollowQuery(
      useLensApolloClient(
        useActiveProfileAsDefaultObserver({
          variables: useConfigSourcesVariable({
            observerId,
          }),
        }),
      ),
    ),
  );
}
