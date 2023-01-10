import {
  CollectPolicyType,
  ContentFocus,
  ProfileFieldsFragment,
  ReferencePolicy,
  useCreateComment,
} from '@lens-protocol/react';
import { useState } from 'react';
import { upload } from '../../upload';

type CommentComposerProps = {
  activeProfile: ProfileFieldsFragment;
  publicationId: string;
};

export function CommentComposer({ activeProfile, publicationId }: CommentComposerProps) {
  const [content, setContent] = useState<string>('');

  const { create, error, isPending } = useCreateComment({ profile: activeProfile, upload });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (content.length === 0) {
      return;
    }
    await create({
      publicationId,
      content,
      profileId: activeProfile.id,
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
      <fieldset>
        <textarea
          rows={3}
          placeholder="Say gm...?"
          style={{ resize: 'none' }}
          disabled={isPending}
          onChange={(event) => setContent(event.target.value)}
          value={content}
        ></textarea>

        <button type="submit" disabled={isPending}>
          Comment
        </button>

        {error && <p>{error.message}</p>}
      </fieldset>
    </form>
  );
}
