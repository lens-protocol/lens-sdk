import { useProfileById } from '@lens-protocol/react';

import { GenericError } from '../error/GenericError';
import { Loading } from '../loading/Loading';

export function ProfileById() {
  const { data: profile, loading, error } = useProfileById({ id: '0x40c6' });

  if (loading) return <Loading />;

  if (error) return <GenericError error={error} />;

  return (
    <div>
      <h1>Profile by ID</h1>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
}
