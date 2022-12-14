import { FeedItemFragment, useFeed } from '@lens-protocol/react';

import { GenericError } from '../error/GenericError';
import { Loading } from '../loading/Loading';
import { ProfilePicture } from '../profile/ProfilePicture';

type FeedItemProps = {
  feedItems: FeedItemFragment[];
};

function FeedItems({ feedItems }: FeedItemProps) {
  return (
    <div>
      {feedItems.map(({ root: publication, comments }) => (
        <div key={publication.id}>
          <ProfilePicture picture={publication.profile.picture} />
          <h2>{publication.profile.name ?? `@${publication.profile.handle}`}</h2>
          <p>{publication.metadata.content}</p>
          <p>Total comments: {comments?.length ?? 0}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export function Feed() {
  const {
    data: feed,
    error,
    loading,
  } = useFeed({
    profileId: '0x3a2a',
  });

  if (loading) return <Loading />;

  if (error || !feed) return <GenericError error={error} />;

  return (
    <div>
      <h1>Feed</h1>
      <FeedItems feedItems={feed.items} />
    </div>
  );
}
