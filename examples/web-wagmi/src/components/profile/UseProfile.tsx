import { useState } from 'react';
import { Link } from 'react-router-dom';


export function UseProfile() {
  const [handle, setHandle] = useState<string | null>(null);
  const [profileId, setProfileId] = useState<string | null>(null);

  return (
    <div>
      <h1>
        <code>useProfile</code>
      </h1>

      <p>
        Search by <Link to="/profiles/useProfile/handle">Lens handle</Link> or{' '}
        <Link to="/profiles/useProfile/id">profile ID</Link>
      </p>
    </div>
  );
}
