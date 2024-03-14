import { textOnly } from '@lens-protocol/metadata';
import {
  AnyPublication,
  Comment,
  LimitType,
  publicationId,
  useCreateComment,
  usePublication,
  usePublications,
} from '@lens-protocol/react-web';
import { toast } from 'react-hot-toast';

import { RequireProfileSession } from '../components/auth';
import { CommentCard, PublicationCard } from '../components/cards';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useIrysUploadHandler } from '../hooks/useIrysUploader';
import { never } from '../utils';

type CommentComposerProps = {
  commentOn: AnyPublication;
};

function CommentComposer({ commentOn }: CommentComposerProps) {
  const uploadMetadata = useIrysUploadHandler();
  const { execute, loading, error } = useCreateComment();
  const { data: comments, prev: refresh } = usePublications({
    where: { commentOn: { id: commentOn.id } },
    limit: LimitType.Ten,
  });

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // create post metadata
    const metadata = textOnly({
      content: formData.get('content') as string,
    });

    // publish post
    const result = await execute({
      commentOn: commentOn?.id ?? never('publication is not loaded'),
      metadata: await uploadMetadata(metadata),
      sponsored: formData.get('sponsored') === 'on',
    });

    // check for failure scenarios
    if (result.isFailure()) {
      toast.error(result.error.message);
      return;
    }

    toast.success(`Comment broadcasted, waiting for completion...`);

    // wait for full completion
    const completion = await result.value.waitForCompletion();

    // check for late failures
    if (completion.isFailure()) {
      toast.error(completion.error.message);
      return;
    }

    await refresh();

    // comment was created
    const comment = completion.value;
    toast.success(`Comment ID: ${comment.id}`);
  };

  return (
    <>
      <form onSubmit={submit}>
        <fieldset>
          <legend>Leave a comment</legend>
          <textarea
            name="content"
            minLength={1}
            required
            rows={3}
            style={{ resize: 'none' }}
            disabled={loading}
          ></textarea>

          <label>
            <input
              type="checkbox"
              name="sponsored"
              disabled={loading}
              value="on"
              defaultChecked={true}
            />
            sponsored
          </label>

          <button type="submit" disabled={loading}>
            Post
          </button>

          {!loading && error && <pre>{error.message}</pre>}
        </fieldset>
      </form>

      {comments?.map((comment) => (
        <CommentCard key={comment.id} comment={comment as Comment} />
      ))}
    </>
  );
}

export function UseCreateComment() {
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
        <code>useCreateComment</code>
      </h1>

      <PublicationCard publication={publication} />

      <RequireProfileSession message="Log in to create a comment.">
        <CommentComposer commentOn={publication} />
      </RequireProfileSession>
    </div>
  );
}
