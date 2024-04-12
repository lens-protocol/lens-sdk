import { Profile, useProfiles } from '@lens-protocol/react-web';
import { useCanMessage } from '@xmtp/react-sdk';
import { useEffect, useState } from 'react';

import { ErrorMessage } from '../../components/error/ErrorMessage';
import { invariant } from '../../utils';
import { formatProfileIdentifier } from '../../utils/formatProfileIdentifier';

type ProfileSelectorProps = {
  onProfileSelected: (profile: Profile | null) => void;
};

export function ProfileSelector({ onProfileSelected }: ProfileSelectorProps) {
  const {
    data: profiles,
    error,
    loading,
  } = useProfiles({
    where: {
      ownedBy: [
        '0x8d960334c2EF30f425b395C1506Ef7c5783789F3',
        '0x3fC47cdDcFd59dce20694b575AFc1D94186775b0',
        '0x01d79BcEaEaaDfb8fD2F2f53005289CFcF483464',
        '0x52EAF3F04cbac0a4B9878A75AB2523722325D4D4',
        '0xd3B307753097430FaEdFdb89809610bF8e8f3203',
      ],
    },
  });
  const { canMessageStatic } = useCanMessage();
  const [profilesOnXmtp, setProfilesOnXmtp] = useState<Profile[]>([]);

  useEffect(() => {
    async function run() {
      if (!profiles) return [];

      const results = await Promise.all(
        profiles.map(async (p) => {
          const r = await canMessageStatic(p.ownedBy.address);
          return r;
        }),
      );

      const filtered = profiles.filter((_, i) => results[i]);
      setProfilesOnXmtp(filtered);
    }
    void run();
  }, [profiles, canMessageStatic]);

  if (loading) return null;

  if (error) return <ErrorMessage error={error} />;

  return (
    <select
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === 'default') {
          onProfileSelected(null);
          return;
        }

        const profile = profilesOnXmtp.find((p) => p.id === e.target.value);

        invariant(profile, 'Profile with the given id should exist');

        onProfileSelected(profile);
      }}
    >
      <option value="default">Select a profile</option>
      {profilesOnXmtp.map((item) => (
        <option key={item.id} value={item.id}>
          {formatProfileIdentifier(item)}
        </option>
      ))}
    </select>
  );
}
