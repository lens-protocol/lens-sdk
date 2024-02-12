import { Profile, useProfileManagers, useUpdateProfileManagers } from '@lens-protocol/react-web';

import { RequireProfileSession } from '../components/auth';
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
      sponsored: formData.get('sponsored') === 'on',
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

      <label>
        <input type="checkbox" name="sponsored" value="on" defaultChecked={true} />
        sponsored
      </label>

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

      <RequireProfileSession message="Log in to view this example.">
        {({ profile }) => <UpdateProfileManagersForm profile={profile} />}
      </RequireProfileSession>
    </div>
  );
}
