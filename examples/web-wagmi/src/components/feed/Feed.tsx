import { FeedItemFragment, isPostPublication, useFeed } from '@lens-protocol/react';

import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { Loading } from '../loading/Loading';
import { ProfilePicture } from '../profile/ProfilePicture';

type PublicationProps = {
  feedItem: FeedItemFragment;
};

function Publication({ feedItem: { root: publication, comments } }: PublicationProps) {
  return (
    <div>
      <ProfilePicture picture={publication.profile.picture} />
      <h2>{publication.profile.name ?? `@${publication.profile.handle}`}</h2>
      <p>{publication.metadata.content}</p>
      <p>Total comments: {comments?.length ?? 0}</p>
      <hr />
    </div>
  );
}

export function Feed() {
  const infiniteScroll = useInfiniteScroll(
    useFeed({
      profileId: '0x3a2a',
    }),
  );

  if (infiniteScroll.loading) return <Loading />;

  if (infiniteScroll.data.length === 0) return <p>No items</p>;

  const hasMoreItems = infiniteScroll.nextCursor !== null;

  return (
    <div>
      <h1>Feed</h1>

      {infiniteScroll.data
        .filter((i) => isPostPublication(i.root))
        .map((item, i) => (
          <Publication key={`${item.root.id}-${i}`} feedItem={item} />
        ))}

      {hasMoreItems && <p ref={infiniteScroll.observeRef}>Loading more...</p>}
    </div>
  );
}
