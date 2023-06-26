import { Profile, ProfileOwnedByMe } from '@lens-protocol/react-web';
import { useClient } from '@xmtp/react-sdk';
import { useState } from 'react';

import { LoginButton, WhenLoggedInWithProfile, WhenLoggedOut } from '../components/auth';
import { ProfileSelector } from '../profiles/components/ProfileSelector';
import { ConversationComposer } from './components/ConversationComposer';
import { EnableConversationsButton } from './components/EnableConversationsButton';

type UseCreateConversationInnerProps = {
  profile: ProfileOwnedByMe;
};

function UseCreateConversationInner({ profile }: UseCreateConversationInnerProps) {
  const [peerProfile, setPeerProfile] = useState<Profile | null>(null);

  return (
    <>
      <p>Select a profile to start a conversation with:</p>
      <ProfileSelector onProfileSelected={(p) => setPeerProfile(p)} />
      {peerProfile && <ConversationComposer ownedProfile={profile} peerProfile={peerProfile} />}
    </>
  );
}

type EnableConversationsProps = {
  profile: ProfileOwnedByMe;
};

function EnableConversations({ profile }: EnableConversationsProps) {
  const { client } = useClient();

  if (!client) {
    return <EnableConversationsButton />;
  }

  return <UseCreateConversationInner profile={profile} />;
}

export function UseCreateConversation() {
  return (
    <>
      <h1>
        <code>useCreateConversation</code>
      </h1>
      <WhenLoggedInWithProfile>
        {({ profile }) => <EnableConversations profile={profile} />}
      </WhenLoggedInWithProfile>
      <WhenLoggedOut>
        <div>
          <p>You must be logged in to use this example.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </>
  );
}
