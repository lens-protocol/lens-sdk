import { ProfileOwnedByMe, useEnhanceConversation } from '@lens-protocol/react-web';
import { Conversation, useClient, useConversations } from '@xmtp/react-sdk';
import { useParams } from 'react-router-dom';

import { LoginButton, WhenLoggedInWithProfile, WhenLoggedOut } from '../components/auth';
import { Loading } from '../components/loading/Loading';
import { ConversationCard } from './components/ConversationCard';
import { EnableConversationsButton } from './components/EnableConversationsButton';
import { MessageComposer } from './components/MessageComposer';
import { MessagesCard } from './components/MessagesCard';

type UseConversationsInnerProps = {
  conversation: Conversation;
  profile: ProfileOwnedByMe;
};

function UseConversationInner({ conversation, profile }: UseConversationsInnerProps) {
  const { data: enhancedConversation, loading } = useEnhanceConversation({ conversation, profile });

  if (loading) return <Loading />;

  if (enhancedConversation) {
    return (
      <div>
        <ConversationCard conversation={enhancedConversation} />
        <MessageComposer conversation={enhancedConversation} />
        <MessagesCard conversation={enhancedConversation} />
      </div>
    );
  }

  return <div>Conversation not found</div>;
}

type EnableConversationsProps = {
  profile: ProfileOwnedByMe;
  conversationId: string;
};

function EnableConversations({ profile, conversationId }: EnableConversationsProps) {
  const { client } = useClient();
  const { conversations, error, isLoading } = useConversations();

  if (!client) {
    return <EnableConversationsButton />;
  }

  if (error) {
    return <div>An error occurred while fetching conversations</div>;
  }

  const requestedConversation = conversations?.find((c) => c.topic === conversationId);

  return (
    <div>
      {isLoading && <Loading />}

      {requestedConversation && (
        <UseConversationInner conversation={requestedConversation} profile={profile} />
      )}
    </div>
  );
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
      <WhenLoggedInWithProfile>
        {({ profile }) => <EnableConversations profile={profile} conversationId={conversationId} />}
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
