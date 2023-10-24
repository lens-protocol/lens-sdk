import {
  EvmAddress,
  Profile,
  useLinkHandle,
  useOwnedHandles,
  useProfiles,
  useUnlinkHandle,
} from '@lens-protocol/react-web';

import { UnauthenticatedFallback, WhenLoggedIn, WhenLoggedOut } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';

type LinkHandleButtonProps = {
  handle: string;
};

function LinkHandleButton({ handle }: LinkHandleButtonProps) {
  const { execute, error, loading } = useLinkHandle();

  return (
    <>
      <button onClick={() => execute({ handle })} disabled={loading} style={{ padding: '1px 6px' }}>
        Link
      </button>
      {error && <p>{error.message}</p>}
    </>
  );
}

type UnlinkHandleButtonProps = {
  handle: string;
};

function UnlinkHandleButton({ handle }: UnlinkHandleButtonProps) {
  const { execute, error, loading } = useUnlinkHandle();

  return (
    <>
      <button onClick={() => execute({ handle })} disabled={loading} style={{ padding: '1px 6px' }}>
        Unlink
      </button>
      {error && <p>{error.message}</p>}
    </>
  );
}

function UseOwnedProfiles({ address }: { address: EvmAddress }) {
  const {
    data: profiles,
    loading,
    error,
  } = useProfiles({
    where: {
      ownedBy: [address],
    },
  });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h4>Owned profiles</h4>
      <ul>
        {profiles.map((p, index) => (
          <li key={index}>
            {p.id} {p.handle?.fullHandle || 'NOT LINKED'}
          </li>
        ))}
      </ul>
    </div>
  );
}

// eslint-disable-next-line
function UseOwnedHandlesInner({ address }: { address: EvmAddress }) {
  const {
    data: handleResult,
    loading,
    error,
  } = useOwnedHandles({
    for: address,
  });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h4>Owned handles</h4>
      <ul>
        {handleResult.map((handle, index) => (
          <li key={index}>
            <div>{handle.fullHandle}</div>
            <LinkHandleButton handle={handle.fullHandle} />{' '}
            <UnlinkHandleButton handle={handle.fullHandle} />
          </li>
        ))}
      </ul>
    </div>
  );
}

type ContentProps = {
  address: EvmAddress;
  profile: Profile;
};

function Content({ address, profile }: ContentProps) {
  return (
    <div>
      <p>Wallet address: {address}.</p>
      <p>
        Active profile: {profile.id}. Current handle {profile.handle?.fullHandle || 'NOT LINKED'}
      </p>
      <div style={{ display: 'flex' }}>
        <UseOwnedProfiles address={address} />
        {/* <UseOwnedHandlesInner address={address} /> */}
      </div>
    </div>
  );
}

export function UseOwnedHandles() {
  return (
    <div>
      <h1>
        {/* <code>useOwnedHandles & useLinkHandle & useUnlinkHandle</code> */}
        <code>useOwnedHandles</code>
      </h1>

      <WhenLoggedIn>
        {({ address, profile }) => <Content address={address} profile={profile} />}
      </WhenLoggedIn>

      <WhenLoggedOut>
        <UnauthenticatedFallback />
      </WhenLoggedOut>
    </div>
  );
}
