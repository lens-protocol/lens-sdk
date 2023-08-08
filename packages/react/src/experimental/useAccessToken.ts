import { useSharedDependencies } from '../shared';

/**
 * Returns the current access token.
 *
 * @defaultValue `null` if not authenticated.
 * @experimental This API is experimental and might change in the future.
 */
export function useAccessToken() {
  const { accessTokenStorage } = useSharedDependencies();

  return accessTokenStorage.getAccessToken();
}
