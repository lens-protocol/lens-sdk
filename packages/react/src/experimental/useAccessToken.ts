import { useSharedDependencies } from '../shared';

/**
 * Returns the current access token.
 *
 * @experimental This API is VERY experimental and might change in the future.
 * @defaultValue `null` if not authenticated.
 */
export function useAccessToken() {
  const { accessTokenStorage } = useSharedDependencies();

  return accessTokenStorage.getAccessToken();
}
