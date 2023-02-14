import {
  CollectPolicyType,
  ContentFocus,
  ProfileFragment,
  useCreateComment,
} from '@lens-protocol/react';

import { upload } from '../../upload';
import { never } from '../../utils';

type CommentComposerProps = {
  activeProfile: ProfileFragment;
  publicationId: string;
};

export function CommentComposer({ activeProfile, publicationId }: CommentComposerProps) {
  const {
    execute: create,
    error,
    isPending,
  } = useCreateComment({ profile: activeProfile, upload });

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(event.currentTarget);
    const content = (formData.get('content') as string | null) ?? never();

    await create({
      publicationId,
      content,
      profileId: activeProfile.id,
      contentFocus: ContentFocus.TEXT,
      locale: 'en',
      collect: {
        type: CollectPolicyType.NO_COLLECT,
      },
    });

    form.reset();
  };

  return (
    <form onSubmit={submit}>
      <fieldset>
        <textarea
          name="content"
          rows={3}
          required
          placeholder="Say gm...?"
          style={{ resize: 'none' }}
          disabled={isPending}
        ></textarea>

        <button type="submit" disabled={isPending}>
          Comment
        </button>

        {error && <pre>{error.message}</pre>}
      </fieldset>
    </form>
  );
}
