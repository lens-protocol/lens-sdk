import {
  AnyPublication,
  Comment,
  HiddenCommentsType,
  Profile,
  PublicationType,
  isCommentPublication,
  isPostPublication,
  useHideCommentToggle,
  usePublications,
} from '@lens-protocol/react-web';

import { RequireProfileSession } from '../components/auth';
import { PublicationCard } from '../components/cards';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';

function HideableComment({ comment }: { comment: Comment }) {
  const { execute: toggle, loading } = useHideCommentToggle();

  return (
    <PublicationCard publication={comment}>
      <label>
        Hidden by author{' '}
        <input
          disabled={loading}
          type="checkbox"
          checked={comment.hiddenByAuthor}
          onChange={() => toggle({ comment })}
        />
      </label>
    </PublicationCard>
  );
}

function CommentsOnPublication({ publication }: { publication: AnyPublication }) {
  const {
    data: publications,
    error,
    loading,
  } = usePublications({
    where: {
      commentOn: {
        id: publication.id,
        hiddenComments: HiddenCommentsType.Show,
      },
    },
  });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  const comments = publications.filter(isCommentPublication);

  return (
    <div>
      {comments.map((comment) => (
        <HideableComment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

function AllProfilePublications({ profile }: { profile: Profile }) {
  const {
    data: publications,
    error,
    loading,
  } = usePublications({
    where: {
      from: [profile.id],
      publicationTypes: [PublicationType.Post],
    },
  });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  const selected = publications
    .filter(isPostPublication)
    .find((publication) => publication.stats.comments > 0);

  if (!selected) return <p>No publications with comments found</p>;

  return <CommentsOnPublication publication={selected} />;
}

export function UseHideCommentToggle() {
  return (
    <>
      <h1>
        <code>useHideCommentToggle</code>
      </h1>
      <RequireProfileSession message="Log in to view this example.">
        {({ profile }) => <AllProfilePublications profile={profile} />}
      </RequireProfileSession>
    </>
  );
}
