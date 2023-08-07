import { ProfileOwnedByMe, useEnhanceConversations } from '@lens-protocol/react-web';
import { useClient, useConversations } from '@xmtp/react-sdk';
import { Link } from 'react-router-dom';

import { LoginButton, WhenLoggedInWithProfile, WhenLoggedOut } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { ConversationCard } from './components/ConversationCard';
import { EnableConversationsButton } from './components/EnableConversationsButton';

type UseConversationsInnerProps = {
  profile: ProfileOwnedByMe;
};

function UseConversationsInner({ profile }: UseConversationsInnerProps) {
  const {
    data: conversations,
    error,
    loading,
  } = useEnhanceConversations(useConversations(), { profile });

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
  profile: ProfileOwnedByMe;
};

function EnableConversations({ profile }: EnableConversationsProps) {
  const { client } = useClient();

  if (!client) {
    return <EnableConversationsButton />;
  }

  return <UseConversationsInner profile={profile} />;
}

export function UseConversations() {
  return (
    <>
      <h1>
        <code>useConversations</code>
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
