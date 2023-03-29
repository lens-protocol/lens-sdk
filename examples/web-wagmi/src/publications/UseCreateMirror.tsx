import {
  usePublication,
  useCreateMirror,
  isMirrorPublication,
  ProfileOwnedByMe,
  publicationId,
} from '@lens-protocol/react-web';

import { LoginButton, WhenLoggedInWithProfile, WhenLoggedOut } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { PublicationCard } from './components/PublicationCard';

type MirrorInnerProps = {
  publisher: ProfileOwnedByMe;
};

function MirrorInner({ publisher }: MirrorInnerProps) {
  const {
    data: publication,
    error: loadingError,
    loading: publicationLoading,
  } = usePublication({
    publicationId: publicationId('0x15-0x028e'),
  });
  const { execute: create, isPending, error: mirroringError } = useCreateMirror({ publisher });

  if (publicationLoading) return <Loading />;

  if (loadingError) return <ErrorMessage error={loadingError} />;

  if (isMirrorPublication(publication)) {
    return <p>Can't mirror a mirror</p>;
  }

  const isMirroredByMe = publication.isOptimisticMirroredByMe || publication.mirrors.length > 0;

  return (
    <div>
      <PublicationCard publication={publication} />

      <div>Total Mirrors: {publication.stats.totalAmountOfMirrors}</div>
      <div>Is Mirrored by Me: {isMirroredByMe ? 'true' : 'false'}</div>

      <div>
        {mirroringError && <p>{mirroringError.message}</p>}
        <button
          onClick={() =>
            create({
              publication,
            })
          }
          disabled={isPending}
        >
          Mirror
        </button>
      </div>
    </div>
  );
}

export function UseCreateMirror() {
  return (
    <>
      <h1>
        <code>useMirror</code>
      </h1>
      <WhenLoggedInWithProfile>
        {({ profile }) => <MirrorInner publisher={profile} />}
      </WhenLoggedInWithProfile>
      <WhenLoggedOut>
        <div>
          <p>You must be logged in to use this example.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </>
  );
}
