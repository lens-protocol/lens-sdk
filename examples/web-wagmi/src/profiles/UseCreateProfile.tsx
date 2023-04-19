import { useCreateProfile, useProfilesOwnedByMe } from '@lens-protocol/react-web';

import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedInWithProfile } from '../components/auth/WhenLoggedInWithProfile';
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

function CreateProfileForm() {
  const { execute: create, error, isPending } = useCreateProfile();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);
    const handle = (formData.get('handle') as string) ?? never();

    const result = await create({ handle });

    if (result.isSuccess()) {
      form.reset();
    }
  };

  return (
    <div>
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

      <OwnedProfiles />
    </div>
  );
}

export function UseCreateProfile() {
  return (
    <div>
      <h1>
        <code>useCreateProfile</code>
      </h1>

      <WhenLoggedInWithProfile>{() => <CreateProfileForm />}</WhenLoggedInWithProfile>
      <UnauthenticatedFallback message="Log in to create new profiles" />
    </div>
  );
}
