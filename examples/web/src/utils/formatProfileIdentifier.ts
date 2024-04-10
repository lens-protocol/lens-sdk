import { HandleInfo, Profile } from '@lens-protocol/react-web';

function formatHandle(handle: HandleInfo): string {
  return `@${handle.fullHandle}`;
}

export function formatProfileIdentifier(profile: Profile): string {
  return (
    profile?.metadata?.displayName ?? (profile.handle ? formatHandle(profile.handle) : profile.id)
  );
}
