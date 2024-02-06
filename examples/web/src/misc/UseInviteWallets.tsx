import { Profile, useInviteWallets, useInvitedProfiles } from '@lens-protocol/react-web';
import { toast } from 'react-hot-toast';

import { RequireProfileSession } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { ProfileCard } from '../profiles/components/ProfileCard';

function InviteWalletsForm({ profile }: { profile: Profile }) {
  const { execute, error, loading } = useInviteWallets();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const address = formData.get('address') as string;

    if (!address) {
      return;
    }

    const inviteResult = await execute({
      wallets: [address],
    });

    if (inviteResult.isSuccess()) {
      toast.success('Wallet was invited!');
      form.reset();
    }
  };

  const formDisabled = loading || profile.invitesLeft === 0;

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <legend>Invite to Lens</legend>
        <p>Invites left: {profile.invitesLeft}</p>

        <label>
          Wallet address:
          <br />
          <input
            type="text"
            placeholder="0x..."
            required
            disabled={formDisabled}
            name="address"
            style={{ width: '100%' }}
          />
        </label>

        <div>
          <button disabled={formDisabled} type="submit">
            {loading ? 'Submitting...' : 'Invite'}
          </button>
        </div>
      </fieldset>

      {error && <ErrorMessage error={error} />}
    </form>
  );
}

function UseInviteWalletsInner({ profile }: { profile: Profile }) {
  const { data, error, loading } = useInvitedProfiles();

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <InviteWalletsForm profile={profile} />

      <h3>Profiles invited by you:</h3>
      {data.map((item, index) => (
        <div key={index}>
          <div>Address: {item.by}</div>
          {item.profileMinted && <ProfileCard profile={item.profileMinted} />}
        </div>
      ))}
    </div>
  );
}

export function UseInviteWallets() {
  return (
    <div>
      <h1>
        <code>useInviteWallets</code>
      </h1>

      <RequireProfileSession message="Log in to view this example.">
        {({ profile }) => <UseInviteWalletsInner profile={profile} />}
      </RequireProfileSession>
    </div>
  );
}
