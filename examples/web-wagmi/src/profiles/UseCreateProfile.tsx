import { useActiveWallet, useCreateProfile, useProfilesOwnedByMe } from '@lens-protocol/react';

import { never } from '../utils';
import { ProfileCard } from './components/ProfileCard';

function OwnedProfiles() {
  const { data } = useProfilesOwnedByMe();

  return (
    <div>
      <h3>Owned Profiles</h3>

      {data
        ?.slice()
        .reverse()
        .map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
    </div>
  );
}

export function UseCreateProfile() {
  const { execute: create, error, isPending } = useCreateProfile();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const handle = (formData.get('handle') as string) ?? never();
    await create(handle);
  };

  const activeWallet = useActiveWallet();

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

      {activeWallet.data && <OwnedProfiles />}
    </div>
  );
}
