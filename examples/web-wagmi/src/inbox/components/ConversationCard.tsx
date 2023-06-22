import { ProfileId, useProfile } from '@lens-protocol/react-web';
import { Conversation } from '@xmtp/react-sdk';
import { ReactNode } from 'react';

import { Loading } from '../../components/loading/Loading';
import { ProfilePicture } from '../../profiles/components/ProfilePicture';
import { extractPeerProfileId } from '../helpers';

type PeerProfileProps = {
  profileId: ProfileId;
};

function PeerProfile({ profileId }: PeerProfileProps) {
  const { data: profile, loading } = useProfile({ profileId: profileId });

  return (
    <div>
      {loading && <Loading />}

      {profile && (
        <>
          <ProfilePicture picture={profile.picture} />
          <div>{`${profile.id} (${profile.handle})`}</div>
        </>
      )}
    </div>
  );
}

type ConversationCardProps = {
  children?: ReactNode;
  conversation: Conversation;
  profileId: ProfileId;
};

export function ConversationCard({ conversation, profileId, children }: ConversationCardProps) {
  const peerProfileId = extractPeerProfileId(conversation.context?.conversationId, profileId);

  return (
    <article>
      <p>Conversation with:</p>
      <div>
        {peerProfileId && <PeerProfile profileId={peerProfileId} />}
        {!peerProfileId && <p>Address: {conversation.peerAddress}</p>}
      </div>
      {children && <p>{children}</p>}
    </article>
  );
}
