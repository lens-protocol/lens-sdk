import { useProfiles } from '@lens-protocol/react-web';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { ProfileCard } from './components/ProfileCard';

export function UseProfiles() {
  const { data, error, loading, hasMore, observeRef } = useInfiniteScroll(
    useProfiles({ handles: ['yoginth.test', 'foobar.test'] }),
  );

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <>
        <h1>
          <code>useProfiles</code>
        </h1>

        {data.map((item) => (
          <ProfileCard key={item.id} profile={item} />
        ))}

        {hasMore && <p ref={observeRef}>Loading more...</p>}
      </>
    </div>
  );
}
