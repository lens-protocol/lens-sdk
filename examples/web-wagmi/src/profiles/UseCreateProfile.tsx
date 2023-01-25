import { useCreateProfile, useProfile, isValidHandle } from '@lens-protocol/react';
import { FormEvent, useState } from 'react';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { invariant } from '../utils';
import { ProfileCard } from './components/ProfileCard';

function ShowProfile({ handle }: { handle: string }) {
  const { data: profile, error, loading } = useProfile({ handle: `${handle}.test` });

  if (loading) return null;

  if (error) return <ErrorMessage error={error} />;

  return <ProfileCard profile={profile} />;
}

export function UseCreateProfile() {
  const [handle, setHandle] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const { create, error, isPending } = useCreateProfile();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    invariant(handle, 'handle should be set');
    await create(handle);
    setSubmitted(true);
  };

  return (
    <div>
      <h1>
        <code>useCreateProfile</code>
      </h1>

      <form onSubmit={onSubmit}>
        <fieldset>
          <label>
            Enter a profile handle:
            <br />
            <input
              minLength={5}
              maxLength={31}
              required
              type="text"
              disabled={isPending}
              onChange={(e) => {
                if (isValidHandle(e.target.value)) {
                  setHandle(e.target.value);
                } else {
                  setHandle(null);
                }
              }}
            />
          </label>

          <button type="submit" disabled={!handle || isPending}>
            {isPending ? 'Creating...' : 'Create profile'}
          </button>
        </fieldset>

        {error && <p>{error.message}</p>}
      </form>

      <div>{handle && submitted && error === null && <ShowProfile handle={handle} />}</div>
    </div>
  );
}
