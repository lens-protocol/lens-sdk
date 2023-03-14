import { OperationVariables } from '@apollo/client';
import { LensApolloClient } from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';
import { Prettify } from '@lens-protocol/shared-kernel';

import { useActiveProfileIdentifier } from '../profile/useActiveProfileIdentifier';
import { useSharedDependencies } from '../shared';

type UseLensApolloClientArgs<TVariables> = {
  variables: TVariables;
};

type UseLensApolloClientResult<TVariables> = Prettify<
  UseLensApolloClientArgs<TVariables> & {
    client: LensApolloClient;
  }
>;

export function useLensApolloClient<TVariables extends OperationVariables = OperationVariables>(
  options: UseLensApolloClientArgs<TVariables>,
): UseLensApolloClientResult<TVariables> {
  const { apolloClient } = useSharedDependencies();

  return {
    ...options,
    client: apolloClient,
  };
}

type UseActiveProfileAsDefaultObserverArgs = { observerId: ProfileId | null };

type UseActiveProfileAsDefaultObserverResult<TArgs extends UseActiveProfileAsDefaultObserverArgs> =
  {
    variables: Omit<TArgs, 'observerId'> & { observerId: ProfileId | null };
    skip: boolean;
  };

export function useActiveProfileAsDefaultObserver<
  TArgs extends UseActiveProfileAsDefaultObserverArgs,
>({ observerId, ...others }: TArgs): UseActiveProfileAsDefaultObserverResult<TArgs> {
  const { data: activeProfile, loading: bootstrapping } = useActiveProfileIdentifier();

  return {
    variables: {
      ...others,
      observerId: observerId ?? activeProfile?.id ?? null,
    },
    skip: bootstrapping,
  };
}

export function useConfigSources<TArgs extends OperationVariables>(args: TArgs) {
  const { sources } = useSharedDependencies();

  return {
    ...args,
    sources,
  };
}
