import { Profile } from '@lens-protocol/react-web';
import { useStartLensConversation } from '@lens-protocol/react-web/inbox';

import { never } from '../../utils';
import { formatProfileIdentifier } from '../../utils/formatProfileIdentifier';

type ConversationComposerProps = {
  peerProfile: Profile;
};

export function ConversationComposer({ peerProfile }: ConversationComposerProps) {
  const { startConversation, isLoading, error } = useStartLensConversation({
    peerProfile,
  });

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);
    const content = (formData.get('content') as string | null) ?? never();

    const newConversation = await startConversation(peerProfile.ownedBy.address, content);

    if (newConversation) {
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
          {`Send a first message to ${formatProfileIdentifier(peerProfile)}`}
        </button>

        {!!error && <div>Something went wrong</div>}
      </fieldset>
    </form>
  );
}
