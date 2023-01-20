import { useState } from 'react';

import { useSwitchActiveProfileController } from './adapters/useSwitchActiveProfileController';

export function useActiveProfileSwitch() {
  const [isPending, setIsPending] = useState(false);
  const switchActiveProfile = useSwitchActiveProfileController();

  async function switchProfile(profileId: string) {
    setIsPending(true);

    try {
      await switchActiveProfile({ profileId });
    } finally {
      setIsPending(false);
    }
  }

  return {
    isPending,
    switchProfile,
  };
}
