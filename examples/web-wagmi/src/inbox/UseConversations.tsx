import {
  Conversation,
  ConversationParticipant,
  ProfileOwnedByMe,
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
  participant: ConversationParticipant;
};

function UseConversationsInner({ participant }: UseConversationsInnerProps) {
  const { data, loading, error } = useConversations(participant);

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

type EnableConversationsProps = {
  profile: ProfileOwnedByMe;
};

function EnableConversations({ profile }: EnableConversationsProps) {
  const {
    execute: enableConversations,
    isPending,
    data: participant,
    error,
  } = useEnableConversations({
    profileId: profile.id,
  });

  const onEnableClick = async () => {
    await enableConversations();
  };

  return (
    <div>
      {!participant && (
        <button onClick={onEnableClick} disabled={isPending}>
          Enable Inbox
        </button>
      )}

      {isPending && <Loading />}

      {error && <ErrorMessage error={error} />}

      {participant && <UseConversationsInner participant={participant} />}
    </div>
  );
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
