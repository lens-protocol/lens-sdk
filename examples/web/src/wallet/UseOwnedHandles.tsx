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
import { toast } from 'react-hot-toast';

import { RequireProfileSession } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { formatProfileIdentifier } from '../utils/formatProfileIdentifier';

type LinkHandleButtonProps = {
  handle: HandleInfo;
};

function LinkHandleButton({ handle }: LinkHandleButtonProps) {
  const { execute, error, loading } = useLinkHandle();

  const linkHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await execute({ handle, sponsored: formData.get('sponsored') === 'on' });
  };

  if (error) {
    toast.error(error.message);
  }

  const isLinkable = !handle.linkedTo;

  if (isLinkable) {
    return (
      <form onSubmit={linkHandle}>
        <button type="submit" disabled={loading}>
          Link
        </button>
        <label>
          <input type="checkbox" name="sponsored" value="on" defaultChecked={true} />
          sponsored
        </label>
      </form>
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

  const unlinkHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await execute({ handle, sponsored: formData.get('sponsored') === 'on' });
  };

  if (error) {
    toast.error(error.message);
  }

  const isUnlinkable = handle.linkedTo?.nftTokenId === profileId;

  if (!isUnlinkable) return null;

  return (
    <form onSubmit={unlinkHandle}>
      <button type="submit" disabled={loading}>
        Unlink
      </button>
      <label>
        <input type="checkbox" name="sponsored" value="on" defaultChecked={true} />
        sponsored
      </label>
    </form>
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
          <li key={index}>{formatProfileIdentifier(p)}</li>
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
      <div>
        {handleResult.map((handle) => (
          <article key={handle.id}>
            <p>
              <strong> {handle.fullHandle}</strong>
            </p>
            <span>
              Status: {handle.linkedTo ? `linked to ${handle.linkedTo.nftTokenId}` : 'NOT LINKED'}
            </span>
            <LinkHandleButton handle={handle} />{' '}
            <UnlinkHandleButton handle={handle} profileId={profileId} />
          </article>
        ))}
      </div>
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
        <strong>{formatProfileIdentifier(profile)}</strong>.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
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
