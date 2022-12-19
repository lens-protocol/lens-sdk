import { FeedItemFragment, useFeed } from '@lens-protocol/react';
import { Link } from 'react-router-dom';

import { GenericError } from '../error/GenericError';
import { Loading } from '../loading/Loading';
import { PublicationCard } from '../publication/PublicationCard';

type FeedItemProps = {
  feedItems: FeedItemFragment[];
};

function FeedItems({ feedItems }: FeedItemProps) {
  return (
    <div>
      {feedItems.map(({ root: publication, comments }) => (
        <Link
          to={`/publication/${publication.id}`}
          key={publication.id}
          style={{
            color: 'inherit',
          }}
        >
          <PublicationCard publication={publication} />
          <p>Total comments: {comments?.length ?? 0}</p>
          <hr />
        </Link>
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
