import { useExploreProfiles, ProfileFragment } from '@lens-protocol/react';
import { invariant } from '../../utils';

type SelectProfileProps = {
  onProfileSelected: (profile: ProfileFragment | null) => void;
};

export function SelectProfile({ onProfileSelected }: SelectProfileProps) {
  const { data, loading } = useExploreProfiles({ limit: 30 });

  if (loading) return null;

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
