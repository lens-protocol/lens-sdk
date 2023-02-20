import { useSharedDependencies } from '../shared';

export function useApolloClient() {
  const { apolloClient } = useSharedDependencies();

  return apolloClient;
}
