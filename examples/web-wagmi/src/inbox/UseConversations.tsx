import {
  OverviewConversation,
  ProfileOwnedByMe,
  WalletData,
  useConversations,
} from '@lens-protocol/react-web';
import { useEffect } from 'react';

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
  wallet: WalletData;
  profile: ProfileOwnedByMe;
};

function UseConversationsInner({ profile, wallet }: UseConversationsInnerProps) {
  const { data, loading, error } = useConversations({
    profileId: profile.id,
    address: wallet.address,
  });

  useEffect(() => {
    async function run() {
      console.log('data', profile, await wallet.signerFactory.bindings.getSigner({}));
    }
    void run();
  }, [profile, wallet]);

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

export function UseConversations() {
  return (
    <>
      <h1>
        <code>useConversations</code>
      </h1>
      <WhenLoggedInWithProfile>
        {({ profile, wallet }) => <UseConversationsInner profile={profile} wallet={wallet} />}
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
