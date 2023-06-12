import {
  Conversation,
  ConversationsEnabled,
  useConversations,
  useEnableConversations,
} from '@lens-protocol/react-web';

import { LoginButton, WhenLoggedInWithProfile, WhenLoggedOut } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';

type ConversationItemProps = {
  conversation: Conversation;
};

function ConversationItem({ conversation }: ConversationItemProps) {
  return (
    <div>
      <p>ID: {conversation.id}</p>
      <p>Peer Address: {conversation.peer.address}</p>
      <p>Peer profile Id: {conversation.peer.profileId || 'no profile id'}</p>
    </div>
  );
}

type UseConversationsInnerProps = {
  inbox: ConversationsEnabled;
};

function UseConversationsInner({ inbox }: UseConversationsInnerProps) {
  const { data, loading, error } = useConversations(inbox);

  return (
    <div>
      {data?.length === 0 && <p>No items</p>}

      {loading && <Loading />}

      {error && <ErrorMessage error={error} />}

      {data?.map((conversation) => (
        <ConversationItem key={conversation.id} conversation={conversation} />
      ))}
    </div>
  );
}

function EnableConversations() {
  const { execute: enableConversations, isPending, data: inbox, error } = useEnableConversations();

  const onEnableClick = async () => {
    await enableConversations();
  };

  return (
    <div>
      {!inbox && (
        <button onClick={onEnableClick} disabled={isPending}>
          Enable Inbox
        </button>
      )}

      {isPending && <Loading />}

      {error && <ErrorMessage error={error} />}

      {inbox && <UseConversationsInner inbox={inbox} />}
    </div>
  );
}

export function UseConversations() {
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
