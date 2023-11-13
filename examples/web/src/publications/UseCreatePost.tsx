import { textOnly } from '@lens-protocol/metadata';
import { useCreatePost } from '@lens-protocol/react-web';
import { toast } from 'react-hot-toast';

import { RequireProfileSession } from '../components/auth';
import { uploadJson } from '../upload';

function PostComposer() {
  const { execute, loading, error } = useCreatePost();

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

  return (
    <form onSubmit={submit}>
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

export function UseCreatePost() {
  return (
    <div>
      <h1>
        <code>useCreatePost</code>
      </h1>

      <RequireProfileSession message="Log in to create a post.">
        <PostComposer />
      </RequireProfileSession>
    </div>
  );
}
