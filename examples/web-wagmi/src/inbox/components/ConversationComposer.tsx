import { Profile, ProfileOwnedByMe } from '@lens-protocol/react-web';
import { useStartConversation } from '@xmtp/react-sdk';

import { never } from '../../utils';
import { buildConversationId } from '../helpers';

type ConversationComposerProps = {
  ownedProfile: ProfileOwnedByMe;
  peerProfile: Profile;
};

export function ConversationComposer({ ownedProfile, peerProfile }: ConversationComposerProps) {
  const { startConversation, isLoading, error } = useStartConversation({
    conversationId: buildConversationId(ownedProfile.id, peerProfile.id),
    metadata: {},
  });

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);
    const content = (formData.get('content') as string | null) ?? never();

    await startConversation(peerProfile.ownedBy, content);

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
          {`Send a first message to @${peerProfile.handle}`}
        </button>

        {!!error && <div>Something went wrong</div>}
      </fieldset>
    </form>
  );
}
