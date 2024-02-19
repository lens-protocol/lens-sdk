import { OperationVariables } from '@apollo/client';
import {
  PublicationFragmentVariables,
  ProfileFragmentVariables,
} from '@lens-protocol/api-bindings';

import { useSharedDependencies } from '../shared';

/**
 * @internal
 */
export function useProfileFragmentVariables<TVariables extends OperationVariables>(
  variables: TVariables,
): ProfileFragmentVariables & TVariables {
  const { config } = useSharedDependencies();

  return {
    // order matters here, as we want to be able to override the resolved values on a hook-by-hook basis
    ...config.profileVariables,
    ...variables,
  };
}

/**
 * @internal
 */
export function usePublicationFragmentVariables<TVariables extends OperationVariables>(
  variables: TVariables,
): PublicationFragmentVariables & TVariables {
  const { config } = useSharedDependencies();

  return {
    // order matters here, as we want to be able to override the resolved values on a hook-by-hook basis
    ...config.publicationVariables,
    ...variables,
  };
}
