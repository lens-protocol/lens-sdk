import { Profile, ProfileOwnedByMe, useStartLensConversation } from '@lens-protocol/react-web';

import { never } from '../../utils';

type ConversationComposerProps = {
  ownedProfile: ProfileOwnedByMe;
  peerProfile: Profile;
};

export function ConversationComposer({ ownedProfile, peerProfile }: ConversationComposerProps) {
  const { startConversation, isLoading, error } = useStartLensConversation({
    ownedProfile,
    peerProfile,
  });

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);
    const content = (formData.get('content') as string | null) ?? never();

    const newConversation = await startConversation(peerProfile.ownedBy, content);

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
          {`Send a first message to @${peerProfile.handle}`}
        </button>

        {!!error && <div>Something went wrong</div>}
      </fieldset>
    </form>
  );
}
