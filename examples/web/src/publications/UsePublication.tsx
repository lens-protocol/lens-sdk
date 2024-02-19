import { publicationId, usePublication } from '@lens-protocol/react-web';

import { PublicationCard } from '../components/cards';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';

export function UsePublication() {
  const {
    data: publication,
    error,
    loading,
  } = usePublication({ forId: publicationId('0x56-0x02') });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>
        <code>usePublication</code>
      </h1>
      <PublicationCard publication={publication} />
    </div>
  );
}
