import { Profile, ProfileSession } from '@lens-protocol/react-web';
import { useEnhanceConversations, useXmtpClient } from '@lens-protocol/react-web/inbox';
import { useConversations } from '@xmtp/react-sdk';
import { Link } from 'react-router-dom';

import { RequireProfileSession } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { ConversationCard } from './components/ConversationCard';
import { EnableConversationsButton } from './components/EnableConversationsButton';

type UseConversationsInnerProps = {
  profile: Profile;
};

function UseConversationsInner({ profile }: UseConversationsInnerProps) {
  const {
    data: conversations,
    error,
    loading,
  } = useEnhanceConversations(useConversations(), {
    profile,
  });

  if (error) return <ErrorMessage error={error} />;

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {conversations?.length === 0 && <p>No items</p>}

      {conversations?.map((conversation) => (
        <ConversationCard key={conversation.topic} conversation={conversation}>
          <Link to={`/inbox/useConversations/${encodeURIComponent(conversation.topic)}`}>
            Show details
          </Link>
        </ConversationCard>
      ))}
    </div>
  );
}

type EnableConversationsProps = {
  session: ProfileSession;
};

function EnableConversations({ session }: EnableConversationsProps) {
  const { client } = useXmtpClient();

  if (!client) {
    return <EnableConversationsButton />;
  }

  return <UseConversationsInner profile={session.profile} />;
}

export function UseConversations() {
  return (
    <>
      <h1>
        <code>useConversations</code>
      </h1>
      <RequireProfileSession message="Log in to view this example.">
        {(session) => <EnableConversations session={session} />}
      </RequireProfileSession>
    </>
  );
}
