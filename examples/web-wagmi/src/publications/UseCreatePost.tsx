import { useFeed, useRecentPosts } from '@lens-protocol/react';

import { LoginButton } from '../components/auth/LoginButton';
import { WhenLoggedInWithProfile, WhenLoggedOut } from '../components/auth/auth';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { PostComposer } from './components/PostComposer';
import { PublicationCard } from './components/PublicationCard';

type TimelineProps = {
  profileId: string;
};

export function Timeline({ profileId }: TimelineProps) {
  const recentPosts = useRecentPosts();
  const infiniteScroll = useInfiniteScroll(useFeed({ profileId }));

  if (infiniteScroll.loading) return <Loading />;

  if (infiniteScroll.data.length === 0) return <p>No items</p>;

  return (
    <div>
      {recentPosts.map((item, i) => (
        <PublicationCard key={`${item.id}-${i}`} publication={item} />
      ))}

      {infiniteScroll.data.map((item, i) => (
        <PublicationCard key={`${item.root.id}-${i}`} publication={item.root} />
      ))}

      {infiniteScroll.hasMore && <p ref={infiniteScroll.observeRef}>Loading more...</p>}
    </div>
  );
}

export function UseCreatePost() {
  return (
    <div>
      <h1>
        <code>useCreatePost</code>
      </h1>

      <WhenLoggedInWithProfile>
        {({ profile }) => (
          <>
            <PostComposer profile={profile} />

            <Timeline profileId={profile.id} />
          </>
        )}
      </WhenLoggedInWithProfile>
      <WhenLoggedOut>
        <div>
          <p>Log in to create a post.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </div>
  );
}
