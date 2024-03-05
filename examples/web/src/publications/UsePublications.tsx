import { PublicationType, profileId, usePublications } from '@lens-protocol/react-web';
import { useState } from 'react';

import { PublicationCard } from '../components/cards';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

const allPublicationType = [PublicationType.Comment, PublicationType.Post, PublicationType.Mirror];

export function UsePublications() {
  const [publicationType, setPublicationType] = useState<PublicationType[]>([PublicationType.Post]);

  const {
    data: publications,
    beforeCount,
    error,
    loading,
    hasMore,
    prev,
    observeRef,
  } = useInfiniteScroll(
    usePublications({
      where: {
        from: [profileId('0x06')],
        publicationTypes: publicationType,
      },
    }),
  );

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>
        <code>usePublications</code>
      </h1>
      <div>
        <fieldset>
          <legend>Publication types</legend>
          {allPublicationType.map((value) => (
            <label key={value}>
              <input
                type="checkbox"
                checked={publicationType.includes(value)}
                name="PublicationType"
                value={value}
                onChange={(e) => {
                  if (e.target.checked) {
                    setPublicationType([...publicationType, value]);
                  } else {
                    setPublicationType(publicationType.filter((i) => i !== value));
                  }
                }}
              />
              &nbsp;{value}
            </label>
          ))}
        </fieldset>

        <button disabled={loading || beforeCount === 0} onClick={prev}>
          Fetch newer
        </button>

        {publications.map((publication) => (
          <PublicationCard key={publication.id} publication={publication} />
        ))}

        {hasMore && <p ref={observeRef}>Loading more...</p>}
      </div>
    </div>
  );
}
