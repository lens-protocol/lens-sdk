import { OperationVariables } from '@apollo/client';
import { MediaTransformParams, SafeApolloClient, Sources } from '@lens-protocol/api-bindings';
import { AppId } from '@lens-protocol/domain/entities';

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

export type UseProfileStatsArgFromConfigResult<TVariables extends OperationVariables> =
  TVariables & {
    profileStatsArg?: {
      forApps?: Sources;
    };
  };

export function useProfileStatsArgFromConfig<
  TVariables extends OperationVariables & { sources?: AppId[] },
>(variables: TVariables): UseProfileStatsArgFromConfigResult<TVariables> {
  const { sources } = useSharedDependencies();

  return {
    ...variables,
    profileStatsArg: { forApps: sources },
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
