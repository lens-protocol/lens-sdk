import {
  ConversationId,
  ConversationsEnabled,
  Markdown,
  useSendMessage,
} from '@lens-protocol/react-web';

import { never } from '../../utils';

type MessageComposerProps = {
  inbox: ConversationsEnabled;
  conversationId: ConversationId;
};

export function MessageComposer({ inbox, conversationId }: MessageComposerProps) {
  const { execute: send, error, isPending } = useSendMessage(inbox);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);
    const content = (formData.get('content') as string | null) ?? never();

    const result = await send({
      conversationId,
      content: content as Markdown,
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
          Send Message
        </button>

        {error && <pre>{error.message}</pre>}
      </fieldset>
    </form>
  );
}
