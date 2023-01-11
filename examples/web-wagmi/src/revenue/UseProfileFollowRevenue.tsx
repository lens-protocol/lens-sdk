import { useProfile, useProfileFollowRevenue } from '@lens-protocol/react';
import { useState } from 'react';

import { Loading } from '../components/loading/Loading';
import { ProfileCard } from '../profiles/components/ProfileCard';
import { SelectProfileId } from '../profiles/components/ProfileSelector';
import { RevenueCard } from './components/RevenueCard';

function UseProfileFollowRevenueInner({ profileId }: { profileId: string }) {
  const { data: profile, loading: profileLoading } = useProfile({ profileId });
  const { data: publicationRevenue, loading: publicationRevenueLoading } = useProfileFollowRevenue({
    profileId,
  });

  if (publicationRevenueLoading || profileLoading) return <Loading />;

  return (
    <div>
      <h3>Profile</h3>
      <ProfileCard profile={profile} />
      <h3>Follow revenue</h3>
      {publicationRevenue.length ? (
        publicationRevenue.map((revenue) => (
          <RevenueCard key={revenue.total.asset.symbol} revenue={revenue} />
        ))
      ) : (
        <p>No revenue from following.</p>
      )}
    </div>
  );
}

export function UseProfileFollowRevenue() {
  const [profileId, setProfileId] = useState<string | null>(null);
  return (
    <>
      <h1>
        <code>useProfileFollowRevenue</code>
      </h1>
      <p>Select a profile to see their follow revenue:</p>
      <SelectProfileId
        onProfileSelected={(h: string) => {
          return setProfileId(h);
        }}
      />
      {profileId && profileId !== 'default' && (
        <UseProfileFollowRevenueInner profileId={profileId} />
      )}
    </>
  );
}
