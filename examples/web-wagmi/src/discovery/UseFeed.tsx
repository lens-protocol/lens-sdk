import { FeedItemFragment, isPostPublication, useFeed } from '@lens-protocol/react';
import { Link } from 'react-router-dom';

import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { CreatePost } from '../publications/components/CreatePost';
import { PublicationCard } from '../publications/components/PublicationCard';

type PublicationProps = {
  feedItem: FeedItemFragment;
};

function Publication({ feedItem: { root: publication } }: PublicationProps) {
  return (
    <Link
      to={`/publication/${publication.id}`}
      style={{
        color: 'inherit',
        margin: '1rem',
      }}
    >
      <PublicationCard publication={publication} />
    </Link>
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

  return (
    <div>
      <h1>
        <code>useFeed</code>
      </h1>

      <CreatePost />

      {infiniteScroll.data
        .filter((i) => isPostPublication(i.root))
        .map((item, i) => (
          <Publication key={`${item.root.id}-${i}`} feedItem={item} />
        ))}

      {infiniteScroll.hasMore && <p ref={infiniteScroll.observeRef}>Loading more...</p>}
    </div>
  );
}
