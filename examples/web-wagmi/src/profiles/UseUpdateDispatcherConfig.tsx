import { ProfileFragment, useUpdateDispatcherConfig } from '@lens-protocol/react';
import { useState } from 'react';

import { LoginButton } from '../components/auth/LoginButton';
import { WhenLoggedInWithProfile, WhenLoggedOut } from '../components/auth/auth';

type UpdateDispatcherConfigFormProps = {
  activeProfile: ProfileFragment;
};

function UpdateDispatcherConfigForm({ activeProfile }: UpdateDispatcherConfigFormProps) {
  const [isEnabled, setIsEnabled] = useState(activeProfile.dispatcher !== null);
  const { update, error, isPending } = useUpdateDispatcherConfig({ profile: activeProfile });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await update({ enabled: isEnabled });
  };

  return (
    <form onSubmit={submit}>
      <fieldset>
        <p>
          <label htmlFor="isEnabled">Is dispatcher enabled</label>
          <input
            id="isEnabled"
            type="checkbox"
            disabled={isPending}
            checked={isEnabled}
            onChange={() => setIsEnabled((current) => !current)}
          />
        </p>

        <button type="submit" disabled={isPending}>
          Submit
        </button>

        {error && <p>{error.message}</p>}
      </fieldset>
    </form>
  );
}

export function UseUpdateDispatcherConfig() {
  return (
    <div>
      <h1>
        <code>useUpdateDispatcherConfig</code>
      </h1>
      <WhenLoggedInWithProfile>
        {({ profile }) => <UpdateDispatcherConfigForm activeProfile={profile} />}
      </WhenLoggedInWithProfile>
      <WhenLoggedOut>
        <div>
          <p>Log in to update dispatcher configuration.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </div>
  );
}
