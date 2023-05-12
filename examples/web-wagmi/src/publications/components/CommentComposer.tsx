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
  const { execute: comment, error, isPending } = useCreateComment({ publisher, upload });

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);
    const content = (formData.get('content') as string | null) ?? never();

    const result = await comment({
      publicationId,
      content,
      contentFocus: ContentFocus.TEXT_ONLY,
      locale: 'en',
      collect: {
        type: CollectPolicyType.NO_COLLECT,
      },
    });

    if (result.isSuccess()) {
      form.reset();
    }
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
