import { AccountsAvailableQuery, type AccountsAvailableRequest } from '@lens-protocol/graphql';
import { useQuery } from 'urql';

/**
 * Fetch the accounts available for a given address.
 */
export function useAccountsAvailable(request: AccountsAvailableRequest) {
  return useQuery({
    query: AccountsAvailableQuery,
    variables: { request },
  });
}
