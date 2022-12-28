import { useExploreProfiles } from '@lens-protocol/react';

type ProfileSelectorLinkProps = {
  onProfileSelected: (profileHandle: string) => void;
};

export function SelectProfileHandle({ onProfileSelected }: ProfileSelectorLinkProps) {
  const { data, loading } = useExploreProfiles({ limit: 30 });

  if (loading) return null;

  return (
    <select
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onProfileSelected(e.target.value)}
    >
      <option value="default">Select a profile</option>
      {data.map((item) => (
        <option key={item.id} value={item.handle}>
          {item.handle}
        </option>
      ))}
    </select>
  );
}

export function SelectProfileId({ onProfileSelected }: ProfileSelectorLinkProps) {
  const { data, loading } = useExploreProfiles({ limit: 30 });

  if (loading) return null;

  return (
    <select
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onProfileSelected(e.target.value)}
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
