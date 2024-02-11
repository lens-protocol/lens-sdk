import { profileId, useLazyProfile } from '@lens-protocol/react-web';
import { toast } from 'react-hot-toast';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { never } from '../utils';
import { ProfileCard } from './components/ProfileCard';

export function UseLazyProfile() {
  const { data: profile, error, loading, execute } = useLazyProfile();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const id = profileId(formData.get('id') as string) ?? never();

    const result = await execute({ forProfileId: id });

    if (result.isFailure()) {
      toast.error(result.error.message);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <fieldset>
          <legend>Which Profile you want to log-in with?</legend>

          <input name="id" defaultValue="0x01" />

          <div>
            <button disabled={loading} type="submit">
              {loading ? 'Loading...' : 'Load'}
            </button>
          </div>
        </fieldset>
      </form>

      {profile && <ProfileCard profile={profile} />}

      {error && <ErrorMessage error={error} />}
    </div>
  );
}
