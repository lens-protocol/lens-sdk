import { profileId, useLogin, useProfiles } from '@lens-protocol/react-web';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAccount, useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import { ErrorMessage } from './components/error/ErrorMessage';
import { Loading } from './components/loading/Loading';

function ProfilesList({ owner }: { owner: string }) {
  const navigate = useNavigate();
  const { execute: login, loading: isLoginPending } = useLogin();
  const { data: profiles, error, loading } = useProfiles({ where: { ownedBy: [owner] } });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const id = profileId(formData.get('id') as string);

    const result = await login({
      address: owner,
      ...(id && { profileId: id }),
    });

    if (result.isSuccess()) {
      toast.success(`Welcome ${String(result.value.handle?.fullHandle ?? result.value.id)}`);
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

        <label>
          <input disabled={isLoginPending} type="radio" name="id" value="" />
          LOGIN WITH WALLET ONLY
        </label>
        {profiles.map((profile, idx) => (
          <label key={profile.id}>
            <input
              disabled={isLoginPending}
              type="radio"
              defaultChecked={idx === 0}
              name="id"
              value={profile.id}
            />
            {profile.handle?.fullHandle ?? profile.id}
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
  const { address, isConnected, isConnecting } = useAccount();

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  return (
    <div>
      {!isConnected && (
        <button disabled={isConnecting} onClick={() => connect()}>
          Connect first
        </button>
      )}

      {address && (
        <div>
          <p>{`Using wallet ${address}`}</p>
          <ProfilesList owner={address} />
        </div>
      )}
    </div>
  );
}
