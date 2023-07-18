import { PublicationTypes, profileId, usePublications } from '@lens-protocol/react-web';
import { useState } from 'react';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { PublicationCard } from './components/PublicationCard';

const allPublicationTypes = [
  PublicationTypes.Comment,
  PublicationTypes.Post,
  PublicationTypes.Mirror,
];

export function UsePublications() {
  const [publicationTypes, setPublicationTypes] = useState<PublicationTypes[]>([
    PublicationTypes.Post,
  ]);

  const {
    data: publications,
    beforeCount,
    error,
    loading,
    hasMore,
    observeRef,
    prev,
  } = useInfiniteScroll(
    usePublications({
      profileId: profileId('0x15'),
      publicationTypes,
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
          {allPublicationTypes.map((value) => (
            <label key={value}>
              <input
                type="checkbox"
                checked={publicationTypes.includes(value)}
                name="publicationTypes"
                value={value}
                onChange={(e) => {
                  if (e.target.checked) {
                    setPublicationTypes([...publicationTypes, value]);
                  } else {
                    setPublicationTypes(publicationTypes.filter((i) => i !== value));
                  }
                }}
              />
              &nbsp;{value}
            </label>
          ))}
        </fieldset>

        {beforeCount > 0 && (
          <button disabled={loading} onClick={prev}>
            Fetch newer
          </button>
        )}

        {publications.map((publication) => (
          <PublicationCard key={publication.id} publication={publication} />
        ))}
        {hasMore && <p ref={observeRef}>Loading more...</p>}
      </div>
    </div>
  );
}
