import {
  ProfileFragment,
  usePublication,
  useHidePublication,
  PublicationOwnedByMeFragment,
  isPublicationOwnedByMe,
} from '@lens-protocol/react';
import { useState } from 'react';

import { PublicationCard } from './components/PublicationCard';
import { SelectPublicationId } from './components/PublicationSelector';
import { LoginButton } from '../components/auth/LoginButton';
import { WhenLoggedInWithProfile, WhenLoggedOut } from '../components/auth/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';

type HidePublicationButtonProps = {
  publication: PublicationOwnedByMeFragment;
};

function HidePublicationButton({ publication }: HidePublicationButtonProps) {
  const { hide, isPending } = useHidePublication();

  const hidePublication = async () => {
    await hide({ publication });
  };

  return (
    <button onClick={hidePublication} disabled={isPending || publication.hidden}>
      Hide
    </button>
  );
}

type HidePublicationInnerProps = {
  publicationId: string;
  profile: ProfileFragment;
};

function HidePublicationInner({ publicationId, profile }: HidePublicationInnerProps) {
  const {
    data: publication,
    error,
    loading: publicationLoading,
  } = usePublication({
    publicationId,
    observerId: profile.id, // important!
  });

  if (publicationLoading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      <PublicationCard publication={publication} />
      {isPublicationOwnedByMe(publication) ? (
        <HidePublicationButton publication={publication} />
      ) : (
        "Can't hide publication that's not owned by you"
      )}
    </>
  );
}

export function UseHidePublication() {
  const [publicationId, setPublicationId] = useState<string | null>();

  return (
    <>
      <h1>
        <code>useHidePublication</code>
      </h1>
      <WhenLoggedInWithProfile>
        {({ profile }) => {
          return (
            <>
              <SelectPublicationId
                onPublicationSelected={(id) => setPublicationId(id)}
                profileId={profile.id}
              />

              {publicationId && (
                <HidePublicationInner profile={profile} publicationId={publicationId} />
              )}
            </>
          );
        }}
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
