import {
  EthereumAddress,
  useProfilesOwnedBy,
  Profile,
  useActiveProfileSwitch,
  ProfileId,
} from '@lens-protocol/react-web';
import { useState } from 'react';

import { LoginButton, WhenLoggedInWithProfile, WhenLoggedOut } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';

type ProfilesSwitcherProps = {
  address: EthereumAddress;
  current: Profile;
};

function ProfilesSwitcher({ address, current }: ProfilesSwitcherProps) {
  const { execute: switchProfile, isPending } = useActiveProfileSwitch();
  const [selected, setSelected] = useState<ProfileId>(current.id);
  const { data, error, loading } = useProfilesOwnedBy({ address, limit: 50 });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void switchProfile(selected);
  };

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  if (data.length === 0) {
    return <p>No profiles found</p>;
  }

  return (
    <form onSubmit={onSubmit}>
      {data.map((profile) => (
        <label key={profile.id}>
          <input
            type="checkbox"
            name="profile"
            value={profile.id}
            checked={profile.id === selected}
            onChange={() => setSelected(profile.id)}
          />
          &nbsp;
          {profile.handle}
        </label>
      ))}
      <button type="submit">{isPending ? 'Saving...' : 'Submit'}</button>
    </form>
  );
}

export function UseActiveProfileSwitch() {
  return (
    <div>
      <h1>
        <code>useActiveProfileSwitch</code>
      </h1>

      <WhenLoggedInWithProfile>
        {({ profile, wallet }) => <ProfilesSwitcher address={wallet.address} current={profile} />}
      </WhenLoggedInWithProfile>
      <WhenLoggedOut>
        <div>
          <p>You must be logged in to use this example.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </div>
  );
}
