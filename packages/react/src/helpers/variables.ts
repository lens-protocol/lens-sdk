import { OperationVariables } from '@apollo/client';
import { AllFragmentVariables } from '@lens-protocol/api-bindings';
import merge from 'lodash/merge';
import { useCallback } from 'react';

import { useSharedDependencies } from '../shared';

/**
 * @internal
 */
export function useLazyFragmentVariables() {
  const { config } = useSharedDependencies();

  return useCallback(
    <TVariables extends OperationVariables>(
      variables: TVariables,
    ): AllFragmentVariables & TVariables => {
      // order matters here, as we want to be able to override the resolved values on a hook-by-hook basis
      // Lodash merge is used because it skips source properties that resolve to undefined
      return merge({}, config.fragmentVariables, variables);
    },
    [config.fragmentVariables],
  );
}

/**
 * @internal
 */
export function useFragmentVariables<TVariables extends OperationVariables>(
  variables?: TVariables,
): AllFragmentVariables & TVariables {
  const { config } = useSharedDependencies();

  // order matters here, as we want to be able to override the resolved values on a hook-by-hook basis
  // Lodash merge is used because it skips source properties that resolve to undefined
  return merge({}, config.fragmentVariables, variables);
}
