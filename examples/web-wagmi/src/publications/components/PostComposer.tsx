import { ContentFocus, ProfileOwnedByMe, useCreatePost } from '@lens-protocol/react-web';

import { upload } from '../../upload';
import { never } from '../../utils';

export type PostComposerProps = {
  publisher: ProfileOwnedByMe;
};

export function PostComposer({ publisher }: PostComposerProps) {
  const { execute: create, error, isPending } = useCreatePost({ publisher, upload });

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);
    const content = (formData.get('content') as string | null) ?? never();

    await create({
      content,
      contentFocus: ContentFocus.TEXT,
      locale: 'en',
    });

    form.reset();
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
          disabled={isPending}
        ></textarea>

        <button type="submit" disabled={isPending}>
          Post
        </button>

        {error && <pre>{error.message}</pre>}
      </fieldset>
    </form>
  );
}
