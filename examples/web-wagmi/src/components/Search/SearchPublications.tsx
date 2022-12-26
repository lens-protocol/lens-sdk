import { useSearchPublications } from '@lens-protocol/react';
import { ChangeEvent, useState } from 'react';

import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { Loading } from '../loading/Loading';
import { PublicationCard } from '../publication/PublicationCard';

type SearchResultsProps = {
  query: string;
};

function SearchResults({ query }: SearchResultsProps) {
  const { data, loading, hasMore, observeRef } = useInfiniteScroll(
    useSearchPublications({ query }),
  );
  if (loading) return <Loading />;
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

export function SearchPublications() {
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
      <h2>Search Publications</h2>
      <div>
        <input onChange={handleChange} />
        <button onClick={handleSubmit}>Search</button>
      </div>
      {selectedQuery && <SearchResults query={selectedQuery} />}
    </div>
  );
}
