import { publicationId, useCreateMirror, usePublication } from '@lens-protocol/react-web';

import { RequireProfileSession } from '../components/auth';
import { PublicationCard } from '../components/cards';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';

function CreateMirror() {
  const {
    data: publication,
    error: publicationError,
    loading: publicationLoading,
  } = usePublication({ forId: publicationId('0x56-0x02') });

  const { execute: mirror, loading, error } = useCreateMirror();

  if (publicationLoading) return <Loading />;

  if (publicationError) return <ErrorMessage error={publicationError} />;

  return (
    <PublicationCard publication={publication}>
      <button
        onClick={() =>
          mirror({
            mirrorOn: publication.id,
          })
        }
        disabled={loading}
      >
        Mirror
      </button>
      {error && <ErrorMessage error={error} />}
    </PublicationCard>
  );
}

export function UseCreateMirror() {
  return (
    <div>
      <h1>
        <code>useCreateMirror</code>
      </h1>

      <RequireProfileSession message="Log in to create a mirror.">
        <CreateMirror />
      </RequireProfileSession>
    </div>
  );
}
