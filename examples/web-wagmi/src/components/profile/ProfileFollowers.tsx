import { useProfileFollowers } from "@lens-protocol/react";

import { GenericError } from "../error/GenericError";
import { Loading } from "../loading/Loading";
import { ProfileCard } from "./ProfileCard";

type ProfileFollowersProps = {
  profileId: string
};

export function ProfileFollowers({ profileId }: ProfileFollowersProps) {
  const { data: followers, loading, error } = useProfileFollowers({ profileId });
  if (loading) return <Loading />;
  if (error || !followers) return <GenericError error={error} />;
  return (
    <div>
      <h2>Followers</h2>
      <div>
        {followers.items.map((follower) =>
          follower.wallet.defaultProfile ? (
            <ProfileCard key={follower.wallet.address} profile={follower.wallet.defaultProfile} />
          ) : (
            <div key={follower.wallet.address}>{follower.wallet.address}</div>
          ),
        )}
      </div>
    </div>
  );
}
