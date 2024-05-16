import { LimitType, useSearchPublications } from '@lens-protocol/react-web';
import { Suspense, startTransition, useState } from 'react';

import { PublicationCard } from '../components/cards';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

type SearchResultsProps = {
  query: string;
};

function SearchResults({ query }: SearchResultsProps) {
  const { data, hasMore, observeRef } = useInfiniteScroll(
    useSearchPublications({
      query,
      limit: LimitType.Fifty,
      suspense: true,
    }),
  );

  if (data.length === 0) {
    return <p>No publications found</p>;
  }

  return (
    <div>
      {data.map((publication) => (
        <PublicationCard key={publication.id} publication={publication} />
      ))}
      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}

export function UseSearchPublications() {
  const [query, setQuery] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const q = formData.get('query') as string | null;

    if (q) {
      startTransition(() => {
        setQuery(q);
      });
    }
  };

  return (
    <div>
      <h1>
        <code>Search Publications</code>
      </h1>
      <form onSubmit={handleSubmit}>
        <input name="query" />
        &nbsp;
        <button>Search</button>
      </form>
      <Suspense fallback={<Loading />}>{query && <SearchResults query={query} />}</Suspense>
    </div>
  );
}
