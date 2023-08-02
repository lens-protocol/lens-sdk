import { OperationVariables } from '@apollo/client';
import {
  createSnapshotApolloClient,
  MediaTransformParams,
  SafeApolloClient,
  SessionType,
  Sources,
  useSessionVar,
} from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';
import { Overwrite, Prettify } from '@lens-protocol/shared-kernel';
import { useState } from 'react';

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

export function useSnapshotApolloClient<TOptions>(
  args: TOptions = {} as TOptions,
): UseApolloClientResult<TOptions> {
  const { environment } = useSharedDependencies();

  const [client] = useState(() =>
    createSnapshotApolloClient({
      backendURL: environment.snapshot.hub,
    }),
  );

  return {
    ...args,
    client,
  };
}

export type WithObserverIdOverride<TVariables = unknown> = Prettify<
  TVariables & {
    /**
     * The ID of the profile that is observing the data.
     *
     * @defaultValue The ID of the Active Profile if it exists, otherwise `null`
     */
    observerId?: ProfileId;
  }
>;

export type UseActiveProfileAsDefaultObserverArgs<TVariables> = {
  skip?: boolean;
  variables: WithObserverIdOverride<TVariables>;
};

export type UseActiveProfileAsDefaultObserverResultVariables<TVariables> = TVariables & {
  observerId: ProfileId | null;
};

export type UseActiveProfileAsDefaultObserverResult<TVariables> = Prettify<
  Overwrite<
    UseActiveProfileAsDefaultObserverArgs<TVariables>,
    {
      variables: UseActiveProfileAsDefaultObserverResultVariables<TVariables>;
      skip: boolean;
    }
  >
>;

export function useActiveProfileAsDefaultObserver<TVariables>({
  skip,
  variables,
  ...others
}: UseActiveProfileAsDefaultObserverArgs<TVariables>): UseActiveProfileAsDefaultObserverResult<TVariables> {
  const session = useSessionVar();

  return {
    ...others,
    variables: {
      ...variables,
      observerId:
        variables.observerId ??
        (session && session.type === SessionType.WithProfile ? session.profile.id : null),
    },
    skip: skip || !session,
  };
}

export type UseSourcesFromConfigResult<TVariables extends OperationVariables> = TVariables & {
  sources: Sources;
};

export function useSourcesFromConfig<TVariables extends OperationVariables>(
  variables: TVariables,
): UseSourcesFromConfigResult<TVariables> {
  const { sources } = useSharedDependencies();

  return {
    ...variables,
    sources,
  };
}

export type UseMediaTransformFromConfigResult<TVariables extends OperationVariables> =
  TVariables & {
    mediaTransformPublicationSmall: MediaTransformParams;
    mediaTransformPublicationMedium: MediaTransformParams;
    mediaTransformProfileThumbnail: MediaTransformParams;
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
