import {
  ConversationId,
  ConversationsEnabled,
  useConversation,
  useEnableConversations,
} from '@lens-protocol/react-web';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { LoginButton, WhenLoggedInWithProfile, WhenLoggedOut } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { ConversationCard } from './components/ConversationCard';
import { MessageComposer } from './components/MessageComposer';
import { MessagesCard } from './components/MessagesCard';

type UseConversationsInnerProps = {
  inbox: ConversationsEnabled;
  conversationId: ConversationId;
};

function UseConversationInner({ inbox, conversationId }: UseConversationsInnerProps) {
  const { data, loading, error } = useConversation({
    ...inbox,
    conversationId: conversationId,
  });

  return (
    <div>
      {loading && <Loading />}

      {error && <ErrorMessage error={error} />}

      {data && (
        <>
          <ConversationCard key={data.id} conversation={data} />
          <MessageComposer inbox={inbox} conversationId={conversationId} />
          <MessagesCard conversation={data} />
        </>
      )}
    </div>
  );
}

function EnableConversations() {
  const { conversationId } = useParams();
  const { execute: enableConversations, isPending, data: inbox, error } = useEnableConversations();

  useEffect(() => {
    if (!inbox && !isPending && conversationId) {
      void enableConversations();
    }
  }, [enableConversations, inbox, isPending, conversationId]);

  if (!conversationId) return <div>Specify conversationId</div>;

  return (
    <div>
      {isPending && <Loading />}

      {error && <ErrorMessage error={error} />}

      {inbox && <UseConversationInner inbox={inbox} conversationId={conversationId} />}
    </div>
  );
}

export function UseConversation() {
  return (
    <>
      <h1>
        <code>useConversations</code>
      </h1>
      <WhenLoggedInWithProfile>{() => <EnableConversations />}</WhenLoggedInWithProfile>
      <WhenLoggedOut>
        <div>
          <p>You must be logged in to use this example.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </>
  );
}
