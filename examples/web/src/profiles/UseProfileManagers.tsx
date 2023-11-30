import { profileId, useProfileManagers } from '@lens-protocol/react-web';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

const target = profileId('0x04');

export function UseProfileManagers() {
  const {
    data: managers,
    error,
    loading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(
    useProfileManagers({
      for: target,
    }),
  );

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>
        <code>useProfileManagers</code>
      </h1>
      <p>
        List of profile managers for: <code>{target}</code>
      </p>
      <ul>
        {managers.map(({ address }) => (
          <li key={address}>{address}</li>
        ))}

        {hasMore && <p ref={observeRef}>Loading more...</p>}
      </ul>
    </div>
  );
}
