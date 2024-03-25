import { useEffect, useState } from 'react';

import { useSharedDependencies } from '../shared';

/**
 * Returns the current identity token.
 *
 * @experimental This API is VERY experimental and might change in the future.
 * @defaultValue `null` if not authenticated.
 */
export function useIdentityToken() {
  const { credentialsStorage } = useSharedDependencies();
  const [token, setToken] = useState(() => credentialsStorage.getIdentityToken());

  useEffect(() => {
    const subscription = credentialsStorage.subscribe((credentials) => {
      if (!credentials) {
        setToken(null);
        return;
      }
      setToken(credentials.identityToken);
    });

    return () => subscription.unsubscribe();
  }, [credentialsStorage]);

  return token;
}
