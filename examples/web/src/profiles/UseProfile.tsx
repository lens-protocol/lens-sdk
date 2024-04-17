import { useProfile } from '@lens-protocol/react-web';
import { Suspense } from 'react';

import { Loading } from '../components/loading/Loading';
import { ProfileCard } from './components/ProfileCard';

export function UseProfileInner() {
  const { data: profile } = useProfile({ forHandle: 'lens/brainjammer', suspense: true });

  return <ProfileCard profile={profile} />;
}

export function UseProfile() {
  return (
    <Suspense fallback={<Loading />}>
      <UseProfileInner />
    </Suspense>
  );
}
