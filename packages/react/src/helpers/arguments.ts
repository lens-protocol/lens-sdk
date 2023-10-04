import { OperationVariables } from '@apollo/client';
import { MediaTransformParams, SafeApolloClient } from '@lens-protocol/api-bindings';

import { mediaTransformConfigToQueryVariables } from '../mediaTransforms';
import { useSharedDependencies } from '../shared';

export type UseApolloClientResult<TOptions> = TOptions & {
  client: SafeApolloClient;
};

export function useLensApolloClient<TOptions>(
  args: TOptions = {} as TOptions,
): UseApolloClientResult<TOptions> {
  const { apolloClient: client } = useSharedDependencies();

  return {
    ...args,
    client,
  };
}

export type UseMediaTransformFromConfigResult<TVariables extends OperationVariables> =
  TVariables & {
    publicationImageTransform: MediaTransformParams;
    profileCoverTransform: MediaTransformParams;
    profilePictureTransform: MediaTransformParams;
  };

export function useMediaTransformFromConfig<TVariables extends OperationVariables>(
  variables: TVariables,
): UseMediaTransformFromConfigResult<TVariables> {
  const { mediaTransforms } = useSharedDependencies();

  return {
    ...variables,
    ...mediaTransformConfigToQueryVariables(mediaTransforms),
  };
}
