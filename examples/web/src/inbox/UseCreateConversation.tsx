import { Profile } from '@lens-protocol/react-web';
import { useXmtpClient } from '@lens-protocol/react-web/inbox';
import { useState } from 'react';

import { RequireProfileSession } from '../components/auth';
import { ConversationComposer } from './components/ConversationComposer';
import { EnableConversationsButton } from './components/EnableConversationsButton';
import { ProfileSelector } from './components/ProfileSelector';

type UseCreateConversationInnerProps = {
  profile: Profile;
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
  profile: Profile;
};

function EnableConversations({ profile }: EnableConversationsProps) {
  const { client } = useXmtpClient();

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
      <RequireProfileSession message="Log in to view this example.">
        {({ profile }) => <EnableConversations profile={profile} />}
      </RequireProfileSession>
    </>
  );
}
