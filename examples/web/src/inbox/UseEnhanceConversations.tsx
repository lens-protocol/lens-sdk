import { useEnhanceConversations } from '@lens-protocol/react-web/inbox';
import { useConversations } from '@xmtp/react-sdk';
import { Link } from 'react-router-dom';

import { RequireProfileSession } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { ConversationCard } from './components/ConversationCard';
import { EnableConversations } from './components/EnableConversations';

function UseEnhanceConversationsInner() {
  const { conversations, error, isLoading } = useEnhanceConversations(useConversations());

  if (error) return <ErrorMessage error={error} />;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {conversations?.length === 0 && <p>No items</p>}

      {conversations?.map((conversation) => (
        <ConversationCard key={conversation.topic} conversation={conversation}>
          <Link to={`/inbox/useEnhanceConversation/${encodeURIComponent(conversation.topic)}`}>
            Show details
          </Link>
        </ConversationCard>
      ))}
    </div>
  );
}

export function UseEnhanceConversations() {
  return (
    <>
      <h1>
        <code>useEnhanceConversations</code>
      </h1>
      <RequireProfileSession message="Log in to view this example.">
        <EnableConversations>
          <UseEnhanceConversationsInner />
        </EnableConversations>
      </RequireProfileSession>
    </>
  );
}
