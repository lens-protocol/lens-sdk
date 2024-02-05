import { profileId, useLazyProfiles } from '@lens-protocol/react-web';
import { toast } from 'react-hot-toast';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { ProfileCard } from './components/ProfileCard';

export function UseLazyProfiles() {
  const { called, data: profiles, error, loading, execute } = useLazyProfiles();

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const result = await execute({
      where: {
        profileIds: [
          profileId('0x01'),
          profileId('0x02'),
          profileId('0x03'),
          profileId('0x04'),
          profileId('0x05'),
        ],
      },
    });

    if (result.isFailure()) {
      toast.error(result.error.message);
    }
  };

  return (
    <div>
      <div>
        <button disabled={loading || called} type="button" onClick={handleClick}>
          {loading ? 'Loading...' : called ? 'Profiles loaded' : 'Load profiles'}
        </button>
      </div>

      {profiles?.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}

      {error && <ErrorMessage error={error} />}
    </div>
  );
}
