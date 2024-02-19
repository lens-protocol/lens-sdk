import { publicationId, useWhoReactedToPublication } from '@lens-protocol/react-web';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { ProfileCard } from '../profiles/components/ProfileCard';

export function UseWhoReactedToPublication() {
  const {
    data: reactions,
    error,
    loading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(
    useWhoReactedToPublication({
      for: publicationId('0x56-0x02'),
    }),
  );

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>
        <code>useWhoReactedToPublication</code>
      </h1>
      <div>
        {reactions.length === 0 && <p>No reactions.</p>}

        {reactions.map((p) => (
          <div key={p.profile.id}>
            <ProfileCard profile={p.profile} />
            <div>
              {p.reactions.map((r) => (
                <div key={r.reactionAt}>
                  {r.reaction} at {r.reactionAt}
                </div>
              ))}
            </div>
          </div>
        ))}

        {hasMore && <p ref={observeRef}>Loading more...</p>}
      </div>
    </div>
  );
}
