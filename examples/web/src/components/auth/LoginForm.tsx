import { profileId, useLogin, useProfilesManaged } from '@lens-protocol/react-web';
import { toast } from 'react-hot-toast';

import { never } from '../../utils';
import { formatProfileIdentifier } from '../../utils/formatProfileIdentifier';
import { ErrorMessage } from '../error/ErrorMessage';
import { Loading } from '../loading/Loading';

export function LoginForm({ owner, onSuccess }: { owner: string; onSuccess?: () => void }) {
  const { execute: login, loading: isLoginPending } = useLogin();
  const { data: profiles, error, loading } = useProfilesManaged({ for: owner, includeOwned: true });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const id = profileId(formData.get('id') as string) ?? never();

    const result = await login({
      address: owner,
      profileId: id,
    });

    if (result.isSuccess()) {
      toast.success(`Welcome ${String(result.value && formatProfileIdentifier(result.value))}`);
      return onSuccess?.();
    }

    toast.error(result.error.message);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (profiles.length === 0) {
    return <p>No profiles on this wallet.</p>;
  }

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <legend>Which Profile you want to log-in with?</legend>

        {profiles.map((profile, idx) => (
          <label key={profile.id}>
            <input
              disabled={isLoginPending}
              type="radio"
              defaultChecked={idx === 0}
              name="id"
              value={profile.id}
            />
            {formatProfileIdentifier(profile)}
          </label>
        ))}

        <div>
          <button disabled={isLoginPending} type="submit">
            Continue
          </button>
        </div>
      </fieldset>
    </form>
  );
}
