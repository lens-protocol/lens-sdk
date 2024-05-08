import { useMemo, useSyncExternalStore } from 'react';

import { CredentialsStorage } from '../authentication/adapters/CredentialsStorage';
import { JwtCredentials } from '../authentication/adapters/JwtCredentials';
import { useSharedDependencies } from '../shared';

type Callback = () => void;

class ExternalStorageAdapter {
  private cache: JwtCredentials | null = null;

  constructor(private readonly credentialsStorage: CredentialsStorage) {}

  subscribe = (cb: Callback): Callback => {
    // initial value
    void this.credentialsStorage.get().then((credentials) => {
      this.cache = credentials;
      cb();
    });

    // subsequent values
    const subscription = this.credentialsStorage.subscribe((credentials) => {
      this.cache = credentials;
      cb();
    });
    return () => subscription.unsubscribe();
  };

  get = () => this.cache;
}

function useCredentials() {
  const { credentialsStorage } = useSharedDependencies();
  const adapter = useMemo(
    () => new ExternalStorageAdapter(credentialsStorage),
    [credentialsStorage],
  );
  const credentials = useSyncExternalStore(adapter.subscribe, adapter.get);

  return credentials;
}

/**
 * Returns the current access token.
 *
 * @experimental This API is VERY experimental and might change in the future.
 * @defaultValue `null` if not authenticated.
 *
 * @category Misc
 * @group Hooks
 */
export function useAccessToken() {
  const credentials = useCredentials();

  return credentials?.accessToken ?? null;
}

/**
 * Returns the current identity token.
 *
 * @experimental This API is VERY experimental and might change in the future.
 * @defaultValue `null` if not authenticated.
 *
 * @category Misc
 * @group Hooks
 */
export function useIdentityToken() {
  const credentials = useCredentials();

  return credentials?.identityToken ?? null;
}

/**
 * Returns the current refresh token.
 *
 * @experimental This API is VERY experimental and might change in the future.
 * @defaultValue `null` if not authenticated.
 *
 * @category Misc
 * @group Hooks
 */
export function useRefreshToken() {
  const credentials = useCredentials();

  return credentials?.refreshToken ?? null;
}
