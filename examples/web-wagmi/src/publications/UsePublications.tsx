import { usePublications } from '@lens-protocol/react';

import { PublicationCard } from './components/PublicationCard';

export function UsePublications() {
  const { data, loading } = usePublications({ profileId: '0x1b' });

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>
        <code>usePublications</code>
      </h1>
      {data.map((publication) => (
        <PublicationCard key={publication.id} publication={publication} />
      ))}
    </div>
  );
}
