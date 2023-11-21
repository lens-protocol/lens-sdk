import {
  EvmAddress,
  HandleInfo,
  Profile,
  ProfileId,
  useLinkHandle,
  useOwnedHandles,
  useProfiles,
  useUnlinkHandle,
} from '@lens-protocol/react-web';
import toast from 'react-hot-toast';

import { RequireProfileSession } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';

type LinkHandleButtonProps = {
  handle: HandleInfo;
};

function LinkHandleButton({ handle }: LinkHandleButtonProps) {
  const { execute, error, loading } = useLinkHandle();

  if (error) {
    toast.error(error.message);
  }

  const isLinkable = !handle.linkedTo;

  if (isLinkable) {
    return (
      <button
        onClick={() => execute({ handle })}
        disabled={loading}
        style={{ padding: '1px 6px', margin: 0 }}
      >
        Link
      </button>
    );
  }

  return null;
}

type UnlinkHandleButtonProps = {
  handle: HandleInfo;
  profileId: ProfileId;
};

function UnlinkHandleButton({ handle, profileId }: UnlinkHandleButtonProps) {
  const { execute, error, loading } = useUnlinkHandle();

  if (error) {
    toast.error(error.message);
  }

  const isUnlinkable = handle.linkedTo?.nftTokenId === profileId;

  if (!isUnlinkable) return null;

  return (
    <button
      onClick={() => execute({ handle })}
      disabled={loading}
      style={{ padding: '1px 6px', margin: 0 }}
    >
      Unlink
    </button>
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

function UseOwnedHandlesInner({
  address,
  profileId,
}: {
  address: EvmAddress;
  profileId: ProfileId;
}) {
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
            <span>
              {handle.fullHandle}{' '}
              {handle.linkedTo ? `linked to ${handle.linkedTo.nftTokenId}` : 'NOT LINKED'}
            </span>{' '}
            <LinkHandleButton handle={handle} />{' '}
            <UnlinkHandleButton handle={handle} profileId={profileId} />
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
      <p>
        Wallet address: <strong>{address}</strong>.
      </p>
      <p>
        Active profile: <strong>{profile.id}</strong>. Current handle{' '}
        <strong>{profile.handle?.fullHandle || 'NOT LINKED'}</strong>.
      </p>
      <div style={{ display: 'flex' }}>
        <UseOwnedProfiles address={address} />
        <UseOwnedHandlesInner address={address} profileId={profile.id} />
      </div>
    </div>
  );
}

export function UseOwnedHandles() {
  return (
    <div>
      <h1>
        <code>useOwnedHandles & useLinkHandle & useUnlinkHandle</code>
      </h1>

      <RequireProfileSession message="Log in to view this example.">
        {({ address, profile }) => <Content address={address} profile={profile} />}
      </RequireProfileSession>
    </div>
  );
}
