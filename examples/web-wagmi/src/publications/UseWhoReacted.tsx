import { publicationId, useWhoReacted } from '@lens-protocol/react-web';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { ProfileCard } from '../profiles/components/ProfileCard';

export function UseWhoReacted() {
  const { data, error, loading, hasMore, observeRef } = useInfiniteScroll(
    useWhoReacted({ publicationId: publicationId('0x02-0x1a') }),
  );

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  if (data.length === 0) {
    return <p>No profiles found</p>;
  }

  return (
    <>
      <h1>
        <code>useWhoReacted</code>
      </h1>

      <div>
        {data.map((item, index) => (
          <div key={index}>
            {item.reaction}
            <ProfileCard profile={item.profile} />
          </div>
        ))}

        {hasMore && <p ref={observeRef}>Loading more...</p>}
      </div>
    </>
  );
}
