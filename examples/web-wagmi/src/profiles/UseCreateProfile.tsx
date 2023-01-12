import { useCreateProfile, useProfile } from '@lens-protocol/react';
import { FormEvent, useState } from 'react';

import { ProfileCard } from './components/ProfileCard';

function ShowProfile({ handle }: { handle: string }) {
  const { data: profile, loading } = useProfile({ handle: `${handle}.test` });

  if (loading) return null;

  return <ProfileCard profile={profile} />;
}

export function UseCreateProfile() {
  const [handle, setHandle] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { create, error, isPending } = useCreateProfile();

  return (
    <div>
      <h1>
        <code>useCreateProfile</code>
      </h1>

      <form
        onSubmit={async (e: FormEvent) => {
          e.preventDefault();
          if (!handle) return;
          await create(handle);
          setSubmitted(true);
        }}
      >
        <p>Enter a profile handle:</p>
        <div>
          <input
            minLength={5}
            maxLength={31}
            required
            type="text"
            disabled={isPending}
            onChange={(e) => {
              if (isPending) return;
              setSubmitted(false);
              return setHandle(e.target.value);
            }}
          />
          <button type="submit" disabled={!handle || isPending}>
            {isPending ? 'Creating...' : 'Create profile'}
          </button>
        </div>
      </form>

      <div>
        {error && <p>{error.message}</p>}

        {handle && submitted && error === null && <ShowProfile handle={handle} />}
      </div>
      <style>
        {`
          div {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
        `}
      </style>
    </div>
  );
}
