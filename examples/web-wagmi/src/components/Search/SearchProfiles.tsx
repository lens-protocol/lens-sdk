import { useSearchProfiles } from '@lens-protocol/react';
import { ChangeEvent, useState } from 'react';

import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { Loading } from '../loading/Loading';
import { ProfileCard } from '../profile/ProfileCard';

type SearchResultsProps = {
  query: string;
};

function SearchResults({ query }: SearchResultsProps) {
  const { data, loading, hasMore, observeRef } = useInfiniteScroll(useSearchProfiles({ query }));
  if (loading) return <Loading />;
  if (data.length === 0) {
    return <p>No profiles found</p>;
  }
  return (
    <div>
      {data.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  );
}

export function SearchProfiles() {
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
      <div>
        <input onChange={handleChange} />
        <button onClick={handleSubmit}>Search</button>
      </div>
      {selectedQuery && <SearchResults query={selectedQuery} />}
    </div>
  );
}
