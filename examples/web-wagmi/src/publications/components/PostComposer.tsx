import {
  BroadcastingError,
  ContentFocus,
  ProfileOwnedByMe,
  supportsSelfFundedRetry,
  useCreatePost,
} from '@lens-protocol/react-web';

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

    let result = await create({
      content,
      contentFocus: ContentFocus.TEXT,
      locale: 'en',
    });

    if (result.isFailure()) {
      if (result.error instanceof BroadcastingError && supportsSelfFundedRetry(result.error)) {
        const retry = window.confirm(
          'We cannot cover the transaction costs at this time. Do you want to retry with your own MATIC?',
        );

        if (retry) {
          result = await result.error.retrySelfFunded();
        }
      }
    }

    if (result.isSuccess()) {
      form.reset();
    }
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
