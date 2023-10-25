import { Profile, useUpdateProfileManagers, useProfileManagers } from '@lens-protocol/react-web';

import { UnauthenticatedFallback, WhenLoggedIn, WhenLoggedOut } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';

function UpdateProfileManagersForm({ profile }: { profile: Profile }) {
  const { data: managers } = useProfileManagers({
    for: profile.id,
  });
  const { execute, loading, error } = useUpdateProfileManagers();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const enabled = formData.get('enabled') === 'on';

    await execute({
      approveSignless: enabled,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <legend>Your Profile Managers configuration</legend>

        {managers && (
          <>
            <p>Profile Manager addresses enabled on your profile:</p>
            <ul>
              {managers?.map(({ address }) => (
                <li key={address}>{address}</li>
              ))}
            </ul>
          </>
        )}

        <label>
          <input
            name="enabled"
            type="checkbox"
            defaultChecked={profile.signless}
            value="on"
            disabled={loading}
          />
          &nbsp;Lens Manager
        </label>

        <div>
          <button disabled={loading} type="submit">
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </fieldset>

      {error && <ErrorMessage error={error} />}
    </form>
  );
}

export function UseUpdateProfileManagers() {
  return (
    <div>
      <h1>
        <code>useUpdateProfileManagers</code>
      </h1>

      <WhenLoggedIn>
        {({ profile }) => <UpdateProfileManagersForm profile={profile} />}
      </WhenLoggedIn>

      <WhenLoggedOut>
        <UnauthenticatedFallback />
      </WhenLoggedOut>
    </div>
  );
}
