import { LensClient, development } from '@lens-protocol/client';
import { useSession, useStorage } from '@lens-protocol/react-web';
import { useEffect, useMemo, useState } from 'react';

import { RequireProfileSession } from '../components/auth';

export function LensClientInteroperability() {
  const { data: session } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // initialize LensClient with React SDK storage
  const storage = useStorage();
  const client = useMemo(
    () =>
      new LensClient({
        environment: development,
        storage,
      }),
    [storage],
  );

  useEffect(() => {
    void (async () => {
      const status = await client.authentication.isAuthenticated();
      setIsAuthenticated(status);
    })();
  }, [client, session?.authenticated]);

  return (
    <div>
      <h1>
        <code>LensClient interoperability</code>
      </h1>

      <div>Is LensClient authenticated? {isAuthenticated ? 'true' : 'false'}</div>

      <RequireProfileSession message="Login with React Hooks SDK and notice that LensClient instance is also authenticated.">
        <div>Is React SDK authenticated? {session?.authenticated ? 'true' : 'false'}</div>
      </RequireProfileSession>
    </div>
  );
}
