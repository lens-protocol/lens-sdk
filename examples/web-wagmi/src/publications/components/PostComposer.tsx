import {
  ProfileFieldsFragment,
  useCreatePost,
  ContentFocus,
  CollectPolicyType,
  ReferencePolicy,
} from '@lens-protocol/react';
import { useState } from 'react';

import { upload } from '../../upload';

export type PostComposerProps = {
  profile: ProfileFieldsFragment;
};

export function PostComposer({ profile }: PostComposerProps) {
  const [content, setContent] = useState<string>('');
  const { create, error, isPending } = useCreatePost({ profile, upload });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.length === 0) {
      return;
    }
    await create({
      profileId: profile.id,
      content,
      contentFocus: ContentFocus.TEXT,
      locale: 'en',
      collect: {
        type: CollectPolicyType.NO_COLLECT,
      },
      reference: ReferencePolicy.ANYBODY,
    });

    setContent('');
  };

  return (
    <form onSubmit={submit}>
      {error && <p>{error.message}</p>}

      <fieldset>
        <textarea
          rows={3}
          placeholder="What's happening?"
          style={{ resize: 'none' }}
          disabled={isPending}
          onChange={(event) => setContent(event.target.value)}
          value={content}
        ></textarea>

        <button type="submit" disabled={isPending}>
          Post
        </button>
      </fieldset>
    </form>
  );
}
