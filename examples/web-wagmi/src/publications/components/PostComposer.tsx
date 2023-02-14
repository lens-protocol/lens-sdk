import { ProfileFragment, useCreatePost, ContentFocus } from '@lens-protocol/react';

import { upload } from '../../upload';
import { never } from '../../utils';

export type PostComposerProps = {
  profile: ProfileFragment;
};

export function PostComposer({ profile }: PostComposerProps) {
  const { execute: create, error, isPending } = useCreatePost({ profile, upload });

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(event.currentTarget);
    const content = (formData.get('content') as string | null) ?? never();

    await create({
      profileId: profile.id,
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
