import { ProfileSession } from '@lens-protocol/react-web';
import { useEnhanceConversation, useXmtpClient } from '@lens-protocol/react-web/inbox';
import { CachedConversation, useConversations } from '@xmtp/react-sdk';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { RequireProfileSession } from '../components/auth';
import { Loading } from '../components/loading/Loading';
import { ConversationCard } from './components/ConversationCard';
import { EnableConversationsButton } from './components/EnableConversationsButton';
import { MessageComposer } from './components/MessageComposer';
import { MessagesCard } from './components/MessagesCard';

type UseConversationsInnerProps = {
  conversation: CachedConversation;
  session: ProfileSession;
};

function UseConversationInner({ conversation, session }: UseConversationsInnerProps) {
  const { data: enhancedConversation, loading } = useEnhanceConversation({
    conversation,
    profile: session.profile,
  });

  if (loading) return <Loading />;

  if (enhancedConversation) {
    return (
      <div>
        <ConversationCard conversation={enhancedConversation} />
        <MessageComposer conversation={enhancedConversation} />
        <MessagesCard conversation={enhancedConversation} walletAddress={session.address} />
      </div>
    );
  }

  return <div>Conversation not found</div>;
}

type EnableConversationsProps = {
  session: ProfileSession;
  conversationId: string;
};

function EnableConversations({ session, conversationId }: EnableConversationsProps) {
  const { client } = useXmtpClient();
  const { conversations, error, isLoading } = useConversations();

  const requestedConversation = useMemo(
    () => conversations?.find((c) => c.topic === conversationId),
    [conversations, conversationId],
  );

  if (!client) {
    return <EnableConversationsButton />;
  }

  if (isLoading) return <Loading />;

  if (error) {
    return <div>An error occurred while fetching conversations</div>;
  }

  if (!requestedConversation) return null;

  return <UseConversationInner conversation={requestedConversation} session={session} />;
}

export function UseConversation() {
  const { conversationId } = useParams();

  if (!conversationId) {
    return <div>ConversationId not provided</div>;
  }

  return (
    <>
      <h1>
        <code>useConversation</code>
      </h1>
      <RequireProfileSession message="Log in to view this example.">
        {(session) => <EnableConversations session={session} conversationId={conversationId} />}
      </RequireProfileSession>
    </>
  );
}
