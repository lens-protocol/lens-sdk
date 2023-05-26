import {
  ConversationParticipant,
  OverviewConversation,
  ProfileOwnedByMe,
  WalletData,
  useConversations,
  useEnableConversations,
} from '@lens-protocol/react-web';

import { LoginButton, WhenLoggedInWithProfile, WhenLoggedOut } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';

type ConversationItemProps = {
  conversation: OverviewConversation;
};

function ConversationItem({ conversation }: ConversationItemProps) {
  return (
    <div>
      <p>{conversation.id}</p>
      <p>{conversation.lastMessage?.content}</p>
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
  wallet: WalletData;
  profile: ProfileOwnedByMe;
};

function EnableConversations({ profile, wallet }: EnableConversationsProps) {
  const {
    data: participant,
    loading,
    error,
  } = useEnableConversations({
    profileId: profile.id,
    address: wallet.address,
  });

  return (
    <div>
      {loading && <Loading />}

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
        {({ profile, wallet }) => <EnableConversations profile={profile} wallet={wallet} />}
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
