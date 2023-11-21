import { SafeApolloClient } from '@lens-protocol/api-bindings';

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
