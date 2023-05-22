import { ConversationData, ProfileId, useProfile } from '@lens-protocol/react-web';
import { ReactNode } from 'react';

import { Loading } from '../../components/loading/Loading';
import { ProfilePicture } from '../../profiles/components/ProfilePicture';

type PeerProfileProps = {
  profileId: ProfileId;
};

function PeerProfile({ profileId }: PeerProfileProps) {
  const { data: profile, loading } = useProfile({ profileId });

  return (
    <div>
      {loading && <Loading />}

      {profile && <ProfilePicture picture={profile.picture} />}
    </div>
  );
}

type ConversationCardProps = {
  children?: ReactNode;
  conversation: ConversationData;
};

export function ConversationCard({ conversation, children }: ConversationCardProps) {
  return (
    <article>
      <p>ID: {conversation.id}</p>
      <div>
        {conversation.peer.profileId && <PeerProfile profileId={conversation.peer.profileId} />}
        <p>{conversation.peer.address}</p>
      </div>
      {children && <p>{children}</p>}
    </article>
  );
}
