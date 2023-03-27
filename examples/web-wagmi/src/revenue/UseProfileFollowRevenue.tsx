import { Profile, useProfileFollowRevenue } from '@lens-protocol/react-web';
import { useState } from 'react';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { ProfileCard } from '../profiles/components/ProfileCard';
import { ProfileSelector } from '../profiles/components/ProfileSelector';
import { RevenueCard } from './components/RevenueCard';

type UseProfileFollowRevenueInnerProps = {
  profile: Profile;
};

function UseProfileFollowRevenueInner({ profile }: UseProfileFollowRevenueInnerProps) {
  const {
    data: publicationRevenue,
    error,
    loading,
  } = useProfileFollowRevenue({
    profileId: profile.id,
  });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h3>Profile</h3>
      <ProfileCard profile={profile} />
      <h3>Follow revenue</h3>
      {publicationRevenue.length ? (
        publicationRevenue.map((revenue) => (
          <RevenueCard key={revenue.totalAmount.asset.symbol} revenue={revenue} />
        ))
      ) : (
        <p>No revenue from following.</p>
      )}
    </div>
  );
}

export function UseProfileFollowRevenue() {
  const [profile, setProfile] = useState<Profile | null>(null);
  return (
    <>
      <h1>
        <code>useProfileFollowRevenue</code>
      </h1>
      <p>Select a profile to see their follow revenue:</p>
      <ProfileSelector onProfileSelected={(p) => setProfile(p)} />
      {profile && <UseProfileFollowRevenueInner profile={profile} />}
    </>
  );
}
