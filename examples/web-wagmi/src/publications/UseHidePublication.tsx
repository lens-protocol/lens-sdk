import {
  ProfileFieldsFragment,
  usePublication,
  useHidePublication,
  PublicationFragment,
} from '@lens-protocol/react';
import { useState } from 'react';

import { LoginButton } from '../components/auth/LoginButton';
import { WhenLoggedInWithProfile, WhenLoggedOut } from '../components/auth/auth';
import { Loading } from '../components/loading/Loading';
import { PublicationCard } from './components/PublicationCard';
import { SelectPublicationId } from './components/PublicationSelector';

type HidePublicationButtonProps = {
  publication: PublicationFragment;
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
  profile: ProfileFieldsFragment;
};

function HidePublicationInner({ publicationId, profile }: HidePublicationInnerProps) {
  const { data: publication, loading: publicationLoading } = usePublication({
    publicationId,
    observerId: profile.id, // important!
  });

  if (publicationLoading) return <Loading />;

  return (
    <>
      <PublicationCard publication={publication} />
      <HidePublicationButton publication={publication} />
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
