import { useCreateProfile } from '@lens-protocol/react-web';
import toast from 'react-hot-toast';

import { RequireConnectedWallet } from '../components/auth';
import { formatProfileIdentifier } from '../utils/formatProfileIdentifier';

export function CreateProfileForm({ address }: { address: string }) {
  const { execute, loading } = useCreateProfile();

  const createProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const localName = formData.get('localName') as string;

    const result = await execute({ localName, to: address });

    if (result.isFailure()) {
      toast.error(result.error.message);
      return;
    }

    const profile = result.value;

    toast.success(`Congratulations! You now own: ${formatProfileIdentifier(profile)}!`);
    return;
  };

  return (
    <form onSubmit={createProfile}>
      <fieldset>
        <legend>Choose an handle for your profile</legend>
        <label>
          <div>
            lens/&nbsp;
            <input type="text" name="localName" placeholder="wagmi" disabled={loading} />
          </div>
        </label>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <button disabled={loading}>Submit</button>
        </div>
      </fieldset>
    </form>
  );
}

export function UseCreateProfile() {
  return (
    <div>
      <h1>
        <code>useCreateProfile</code>
      </h1>

      <RequireConnectedWallet message="Connect wallet to view this example.">
        {(address) => <CreateProfileForm address={address} />}
      </RequireConnectedWallet>
    </div>
  );
}
