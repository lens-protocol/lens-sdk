import { CachedConversation, useSendMessage } from '@xmtp/react-sdk';

import { never } from '../../utils';

type MessageComposerProps = {
  conversation: CachedConversation;
};

export function MessageComposer({ conversation }: MessageComposerProps) {
  const { sendMessage, isLoading, error } = useSendMessage();

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);
    const content = (formData.get('content') as string | null) ?? never();

    await sendMessage(conversation, content);

    if (!error) {
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
          disabled={isLoading}
        ></textarea>

        <button type="submit" disabled={isLoading}>
          Send Message
        </button>

        {!!error && <div>Something went wrong</div>}
      </fieldset>
    </form>
  );
}
