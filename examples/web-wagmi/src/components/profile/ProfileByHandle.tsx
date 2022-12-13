import { useProfileByHandle } from '@lens-protocol/react';

import { GenericError } from '../error/GenericError';
import { Loading } from '../loading/Loading';

export function ProfileByHandle() {
  const { data: profile, loading, error } = useProfileByHandle({ handle: 'lensprotocol.test' });

  if (loading) return <Loading />;

  if (error) return <GenericError error={error} />;

  return (
    <div>
      <h1>Profile by Handle</h1>
      <input type="text" />
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
}
