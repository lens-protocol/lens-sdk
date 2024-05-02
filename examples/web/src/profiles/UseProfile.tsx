import { useProfile } from '@lens-protocol/react-web';
import { Suspense, startTransition, useState } from 'react';

import { Loading } from '../components/loading/Loading';
import { ProfileCard } from './components/ProfileCard';

function UseProfileInner({ localName }: { localName: string }) {
  const { data, error } = useProfile({ forHandle: `lens/${localName}`, suspense: true });

  if (error) {
    return <p>Profile not found.</p>;
  }

  return <ProfileCard profile={data} />;
}

export function UseProfile() {
  const [localName, setLocalName] = useState('brainjammer');

  const update = (event: React.ChangeEvent<HTMLInputElement>) =>
    startTransition(() => {
      if (event.target.value.length > 0) {
        setLocalName(event.target.value);
      }
    });

  return (
    <div>
      <h1>
        <code>useProfile</code>
      </h1>

      <label>
        lens/
        <input type="text" name="localName" defaultValue={localName} onChange={update} />
      </label>

      <Suspense fallback={<Loading />}>
        <UseProfileInner localName={localName} />
      </Suspense>
    </div>
  );
}
