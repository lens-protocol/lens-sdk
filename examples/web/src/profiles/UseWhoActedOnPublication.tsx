import { publicationId, useWhoActedOnPublication } from '@lens-protocol/react-web';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { ProfileCard } from './components/ProfileCard';

export function UseWhoActedOnPublication() {
  const {
    data: profiles,
    error,
    loading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(
    useWhoActedOnPublication({
      on: publicationId('0x56-0x02'),
    }),
  );

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>
        <code>useWhoActedOnPublication</code>
      </h1>
      <div>
        {profiles.map((p) => (
          <ProfileCard key={p.id} profile={p} />
        ))}

        {hasMore && <p ref={observeRef}>Loading more...</p>}
      </div>
    </div>
  );
}
