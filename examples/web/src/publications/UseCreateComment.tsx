import { textOnly } from '@lens-protocol/metadata';
import { publicationId, useCreateComment, usePublication } from '@lens-protocol/react-web';
import { toast } from 'react-hot-toast';

import { RequireProfileSession } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { uploadJson } from '../upload';
import { never } from '../utils';
import { PublicationCard } from './components/PublicationCard';

function CommentComposer() {
  const {
    data: publication,
    error: publicationError,
    loading: publicationLoading,
  } = usePublication({ forId: publicationId('0x04-0x0b') });

  const { execute, loading, error } = useCreateComment();

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
      commentOn: publication?.id ?? never('publication is not loaded'),
      metadata: await uploadJson(metadata),
    });

    // check for failure scenarios
    if (result.isFailure()) {
      toast.error(result.error.message);
      return;
    }

    // wait for full completion
    const completion = await result.value.waitForCompletion();

    // check for late failures
    if (completion.isFailure()) {
      toast.error(completion.error.message);
      return;
    }

    // post was created
    const post = completion.value;
    toast.success(`Post ID: ${post.id}`);
  };

  if (publicationLoading) return <Loading />;

  if (publicationError) return <ErrorMessage error={publicationError} />;

  return (
    <form onSubmit={submit}>
      <PublicationCard publication={publication} />

      <fieldset>
        <textarea
          name="content"
          minLength={1}
          required
          rows={3}
          placeholder="What's happening?"
          style={{ resize: 'none' }}
          disabled={loading}
        ></textarea>

        <button type="submit" disabled={loading}>
          Post
        </button>

        {!loading && error && <pre>{error.message}</pre>}
      </fieldset>
    </form>
  );
}

export function UseCreateComment() {
  return (
    <div>
      <h1>
        <code>useCreateComment</code>
      </h1>

      <RequireProfileSession message="Log in to create a comment.">
        <CommentComposer />
      </RequireProfileSession>
    </div>
  );
}
