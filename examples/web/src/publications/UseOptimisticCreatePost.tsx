import { MediaImageMimeType, image } from '@lens-protocol/metadata';
import { fileToUri, useOptimisticCreatePost } from '@lens-protocol/react-web';
import { toast } from 'react-hot-toast';

import { RequireProfileSession } from '../components/auth';
import { PublicationCard } from '../components/cards';
import { useIrysUploader } from '../hooks/useIrysUploader';

function PostComposer() {
  const uploader = useIrysUploader();
  const { data, execute, loading, error } = useOptimisticCreatePost(uploader);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const file = formData.get('image') as File;

    // create post metadata
    const metadata = image({
      image: {
        item: fileToUri(file),
        type: MediaImageMimeType.JPEG,
        altTag: formData.get('description') as string,
      },
    });

    // publish post
    const result = await execute({
      metadata,
    });

    // check for failure scenarios
    if (result.isFailure()) {
      toast.error(result.error.message);
      return;
    }

    toast.success(`Post broadcasted, waiting for completion...`);

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
        <label>
          Attach an image
          <input type="file" name="image" disabled={loading} accept="image/jpeg" />
        </label>

        <textarea
          name="description"
          minLength={1}
          required
          rows={3}
          placeholder="Give it a description."
          style={{ resize: 'none' }}
          disabled={loading}
        ></textarea>

        <button type="submit" disabled={loading}>
          Post
        </button>

        {!loading && error && <pre>{error.message}</pre>}
      </fieldset>

      {data && <PublicationCard publication={data} />}
    </form>
  );
}

export function UseOptimisticCreatePost() {
  return (
    <div>
      <h1>
        <code>useOptimisticCreatePost</code>
      </h1>

      <RequireProfileSession message="Log in to create a post.">
        <PostComposer />
      </RequireProfileSession>
    </div>
  );
}
