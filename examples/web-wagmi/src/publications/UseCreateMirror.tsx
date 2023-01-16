import {
  ProfileFieldsFragment,
  usePublication,
  useCreateMirror,
  isMirrorPublication,
} from '@lens-protocol/react';

import { LoginButton } from '../components/auth/LoginButton';
import { WhenLoggedIn, WhenLoggedOut } from '../components/auth/auth';
import { Loading } from '../components/loading/Loading';
import { PublicationCard } from './components/PublicationCard';

type MirrorInnerProps = {
  profile: ProfileFieldsFragment;
};

function MirrorInner({ profile }: MirrorInnerProps) {
  const { data: publication, loading: publicationLoading } = usePublication({
    publicationId: '0x1b-0x0118',
    observerId: profile.id, // important!
  });
  const { create, isPending, error } = useCreateMirror();

  if (publicationLoading) return <Loading />;

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
        {error && <p>{error.message}</p>}
        <button
          onClick={() =>
            create({
              publication,
              profile,
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
      <WhenLoggedIn>{({ profile }) => <MirrorInner profile={profile} />}</WhenLoggedIn>
      <WhenLoggedOut>
        <div>
          <p>You must be logged in to use this example.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </>
  );
}
