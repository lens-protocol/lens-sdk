import { useCreateProfile, useProfile } from '@lens-protocol/react-web';
import { useState } from 'react';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { never } from '../utils';
import { ProfileCard } from './components/ProfileCard';

function ShowProfile({ handle }: { handle: string }) {
  const { data: profile, error, loading } = useProfile({ handle: `${handle}.test` });

  if (loading) return null;

  if (error) return <ErrorMessage error={error} />;

  return <ProfileCard profile={profile} />;
}

export function UseCreateProfile() {
  const [newProfileHandle, setNewProfileHandle] = useState<string | null>(null);

  const { execute: create, error, isPending } = useCreateProfile();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setNewProfileHandle(null);

    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const handle = (formData.get('handle') as string) ?? never();

    const result = await create(handle);

    if (result.isSuccess()) {
      setNewProfileHandle(handle);
    }
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
              name="handle"
              minLength={5}
              maxLength={31}
              required
              type="text"
              disabled={isPending}
            />
          </label>

          <button type="submit" disabled={isPending}>
            {isPending ? 'Creating...' : 'Create profile'}
          </button>
        </fieldset>

        {error && <p>{error.message}</p>}
      </form>

      <div>{newProfileHandle && <ShowProfile handle={newProfileHandle} />}</div>
    </div>
  );
}
