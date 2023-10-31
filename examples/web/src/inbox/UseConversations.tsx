import { Profile } from '@lens-protocol/react-web';
import { useClient } from '@xmtp/react-sdk';

import { UnauthenticatedFallback, WhenLoggedIn } from '../components/auth';
import { EnableConversationsButton } from './components/EnableConversationsButton';

type EnableConversationsProps = {
  profile: Profile;
};

function EnableConversations(_: EnableConversationsProps) {
  const { client } = useClient();

  if (!client) {
    return <EnableConversationsButton />;
  }

  return <div>Success!!</div>;
}

export function UseConversations() {
  return (
    <>
      <h1>
        <code>useConversations</code>
      </h1>
      <WhenLoggedIn>{({ profile }) => <EnableConversations profile={profile} />}</WhenLoggedIn>
      <UnauthenticatedFallback />
    </>
  );
}
