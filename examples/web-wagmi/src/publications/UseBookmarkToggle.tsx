import {
  Post,
  Comment,
  ProfileOwnedByMe,
  PublicationSortCriteria,
  PublicationTypes,
  useExplorePublications,
  useBookmarkToggle,
} from '@lens-protocol/react-web';

import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedInWithProfile } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { PublicationCard } from './components/PublicationCard';

function IndividualPublication({
  profile,
  publication,
}: {
  profile: ProfileOwnedByMe;
  publication: Post | Comment;
}) {
  const { execute: toggle, isPending } = useBookmarkToggle({ profile, publication });
  return (
    <PublicationCard publication={publication}>
      <label>
        Bookmarked{' '}
        <input
          disabled={isPending}
          type="checkbox"
          checked={publication.bookmarked}
          onChange={toggle}
        />
      </label>
    </PublicationCard>
  );
}

export function UseBookmarkToggle() {
  const {
    data: publications,
    error,
    loading,
  } = useExplorePublications({
    sortCriteria: PublicationSortCriteria.TopCollected,
    publicationTypes: [PublicationTypes.Comment, PublicationTypes.Post],
  });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>
        <code>useBookmarkToggle</code>
      </h1>

      <WhenLoggedInWithProfile>
        {({ profile }) => (
          <>
            {publications.map((publication) => (
              <IndividualPublication
                key={publication.id}
                profile={profile}
                publication={publication as Post | Comment}
              />
            ))}
          </>
        )}
      </WhenLoggedInWithProfile>
      <UnauthenticatedFallback message="Log in to run this demo." />
    </div>
  );
}
