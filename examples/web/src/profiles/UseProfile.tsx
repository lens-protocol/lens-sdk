import { profileId, useProfile } from '@lens-protocol/react-web';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { ProfileCard } from './components/ProfileCard';

export function UseProfile() {
  const { data: profile, error, loading } = useProfile({ forProfileId: profileId('0x01') });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return <ProfileCard profile={profile} />;
}
