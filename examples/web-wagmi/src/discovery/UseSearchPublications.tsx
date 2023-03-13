import { useSearchPublications } from '@lens-protocol/react-web';
import { ChangeEvent, useState } from 'react';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { PublicationCard } from '../publications/components/PublicationCard';

type SearchResultsProps = {
  query: string;
};

function SearchResults({ query }: SearchResultsProps) {
  const { data, error, loading, hasMore, observeRef } = useInfiniteScroll(
    useSearchPublications({ query }),
  );

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

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
  const [inputValue, setInputValue] = useState('');
  const [selectedQuery, setSelectedQuery] = useState<string>();

  const handleSubmit = () => {
    setSelectedQuery(inputValue);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <h1>
        <code>Search Publications</code>
      </h1>
      <div>
        <input onChange={handleChange} />
        <button onClick={handleSubmit}>Search</button>
      </div>
      {selectedQuery && <SearchResults query={selectedQuery} />}
    </div>
  );
}
