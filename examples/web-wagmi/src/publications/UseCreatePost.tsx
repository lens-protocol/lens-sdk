import { useFeed, useRecentPosts } from '@lens-protocol/react';

import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedInWithProfile } from '../components/auth/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { PostComposer } from './components/PostComposer';
import { PublicationCard } from './components/PublicationCard';

type TimelineProps = {
  profileId: string;
};

export function Timeline({ profileId }: TimelineProps) {
  const recentPosts = useRecentPosts();
  const { data, error, loading, hasMore, observeRef } = useInfiniteScroll(useFeed({ profileId }));

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  if (data.length === 0) return <p>No items</p>;

  return (
    <div>
      {recentPosts.map((item, i) => (
        <PublicationCard key={`${item.id}-${i}`} publication={item} />
      ))}

      {data.map((item, i) => (
        <PublicationCard key={`${item.root.id}-${i}`} publication={item.root} />
      ))}

      {hasMore && <p ref={observeRef}>Loading more...</p>}
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
      <UnauthenticatedFallback message="Log in to create a post." />
    </div>
  );
}
