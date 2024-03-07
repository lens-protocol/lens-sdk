import { EvmAddress, useLastLoggedInProfile } from '@lens-protocol/react-web';

import { RequireConnectedWallet } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { ProfileCard } from '../profiles/components/ProfileCard';

function UseLastLoggedInProfileInner({ address }: { address: EvmAddress }) {
  const { data: profile, error, loading } = useLastLoggedInProfile({ for: address });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return <ProfileCard profile={profile} />;
}

export function UseLastLoggedInProfile() {
  return (
    <div>
      <h1>
        <code>useLastLoggedInProfile</code>
      </h1>

      <RequireConnectedWallet message="Connect wallet to view this example.">
        {(address) => <UseLastLoggedInProfileInner address={address} />}
      </RequireConnectedWallet>
    </div>
  );
}
