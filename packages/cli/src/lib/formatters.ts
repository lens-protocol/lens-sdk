import { HandleInfoFragment, ProfileFragment } from '@lens-protocol/client';

export function formatProfile(profile: ProfileFragment) {
  return {
    id: profile.id,
    fullHandle: profile.handle && profile.handle.fullHandle,
    ownedBy: profile.ownedBy.address,
    createdAt: profile.createdAt,
    sponsor: profile.sponsor,
    signless: profile.signless,
    // guardian: profile.guardian, // can only be read by owner
    metadata: profile.metadata && {
      displayName: profile.metadata.displayName,
      bio: profile.metadata.bio,
    },
    stats: profile.stats,
  };
}

export function formatHandle(handle: HandleInfoFragment) {
  return {
    fullHandle: handle.fullHandle,
    linkedTo: {
      profileId: handle.linkedTo?.nftTokenId,
    },
    ownedBy: handle.ownedBy,
  };
}
