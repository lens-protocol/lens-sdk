import { useEffect, useState } from 'react';

import { useSharedDependencies } from '../shared';

/**
 * Returns the current access token.
 *
 * @experimental This API is VERY experimental and might change in the future.
 * @defaultValue `null` if not authenticated.
 */
export function useAccessToken() {
  const { credentialsStorage } = useSharedDependencies();
  const [token, setToken] = useState(() => credentialsStorage.getAccessToken());

  useEffect(() => {
    const subscription = credentialsStorage.subscribe((credentials) => {
      if (!credentials) {
        setToken(null);
        return;
      }
      setToken(credentials.accessToken);
    });

    return () => subscription.unsubscribe();
  }, [credentialsStorage]);

  return token;
}
