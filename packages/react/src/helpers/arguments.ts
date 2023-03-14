import { OperationVariables } from '@apollo/client';
import { LensApolloClient } from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';
import { UnknownObject } from '@lens-protocol/shared-kernel';

import { useActiveProfileIdentifier } from '../profile/useActiveProfileIdentifier';
import { useSharedDependencies } from '../shared';

type UseLensApolloClientResult<TArgs extends UnknownObject> = TArgs & {
  client: LensApolloClient;
};

export function useLensApolloClient<TArgs extends UnknownObject>(
  args: TArgs = {} as TArgs,
): UseLensApolloClientResult<TArgs> {
  const { apolloClient } = useSharedDependencies();

  return {
    ...args,
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
