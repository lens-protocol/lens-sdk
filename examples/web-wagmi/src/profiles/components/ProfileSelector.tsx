import { useExploreProfiles, Profile } from '@lens-protocol/react-web';

import { ErrorMessage } from '../../components/error/ErrorMessage';
import { invariant } from '../../utils';

type ProfileSelectorProps = {
  onProfileSelected: (profile: Profile | null) => void;
};

export function ProfileSelector({ onProfileSelected }: ProfileSelectorProps) {
  const { data, error, loading } = useExploreProfiles({ limit: 30 });

  if (loading) return null;

  if (error) return <ErrorMessage error={error} />;

  return (
    <select
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === 'default') {
          onProfileSelected(null);
          return;
        }

        const profile = data.find((p) => p.id === e.target.value);

        invariant(profile, 'Profile with the given id should exist');

        onProfileSelected(profile);
      }}
    >
      <option value="default">Select a profile</option>
      {data.map((item) => (
        <option key={item.id} value={item.id}>
          {item.id} ({item.handle})
        </option>
      ))}
    </select>
  );
}
