import { ProfileId, useLogin, useProfiles } from '@lens-protocol/react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAccount, useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import { ErrorMessage } from './components/error/ErrorMessage';
import { Loading } from './components/loading/Loading';
import { never } from './utils';

function ProfilesList({ owner }: { owner: string }) {
  const navigate = useNavigate();
  const { execute: login, isPending: isLoginPending } = useLogin();
  const { data: profiles, error, loading } = useProfiles({ where: { ownedBy: [owner] } });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const profileId = (formData.get('id') as string) ?? never();

    const result = await login({
      address: owner,
      profileId: profileId as ProfileId,
    });

    if (result.isSuccess()) {
      toast.success(`Welcome ${String(result.value.handle)}`);
      return navigate('/');
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
            {profile.handle}
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

export function LogInPage() {
  const { address, isDisconnected } = useAccount();

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  return (
    <div>
      {isDisconnected && <button onClick={() => connect()}>Connect first</button>}

      {address && <ProfilesList owner={address} />}
    </div>
  );
}
