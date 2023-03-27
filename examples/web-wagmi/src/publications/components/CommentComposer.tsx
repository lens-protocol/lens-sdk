import {
  CollectPolicyType,
  ContentFocus,
  ProfileOwnedByMe,
  PublicationId,
  useCreateComment,
} from '@lens-protocol/react-web';

import { upload } from '../../upload';
import { never } from '../../utils';

type CommentComposerProps = {
  publisher: ProfileOwnedByMe;
  publicationId: PublicationId;
};

export function CommentComposer({ publisher, publicationId }: CommentComposerProps) {
  const { execute: create, error, isPending } = useCreateComment({ publisher, upload });

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);
    const content = (formData.get('content') as string | null) ?? never();

    await create({
      publicationId,
      content,
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
