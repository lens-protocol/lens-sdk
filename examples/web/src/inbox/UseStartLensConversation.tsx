import { Profile } from '@lens-protocol/react-web';
import { useState } from 'react';

import { RequireProfileSession } from '../components/auth';
import { ConversationComposer } from './components/ConversationComposer';
import { EnableConversations } from './components/EnableConversations';
import { ProfileSelector } from './components/ProfileSelector';

function UseStartLensConversationInner() {
  const [peerProfile, setPeerProfile] = useState<Profile | null>(null);

  return (
    <>
      <p>Select a profile to start a conversation with:</p>
      <ProfileSelector onProfileSelected={(p) => setPeerProfile(p)} />
      {peerProfile && <ConversationComposer peerProfile={peerProfile} />}
    </>
  );
}

export function UseStartLensConversation() {
  return (
    <>
      <h1>
        <code>useStartLensConversation</code>
      </h1>
      <RequireProfileSession message="Log in to view this example.">
        <EnableConversations>
          <UseStartLensConversationInner />
        </EnableConversations>
      </RequireProfileSession>
    </>
  );
}
