import {
  CollectPolicyType,
  ContentFocus,
  ProfileFieldsFragment,
  ReferencePolicy,
  useCreatePost,
} from '@lens-protocol/react';
import { useState } from 'react';

import { upload } from '../../upload';

type CreatePostProps = {
  activeProfile: ProfileFieldsFragment;
};

export function CreatePost({ activeProfile }: CreatePostProps) {
  const [content, setContent] = useState<string>('');
  const { create, error, isPending } = useCreatePost({ profile: activeProfile, upload });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.length === 0) {
      return;
    }
    await create({
      profileId: activeProfile.id,
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
    </form>
  );
}
