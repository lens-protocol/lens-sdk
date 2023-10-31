import { useXmtpClient } from '@lens-protocol/react-web/inbox';

import { ErrorMessage } from '../../components/error/ErrorMessage';
import { Loading } from '../../components/loading/Loading';

export function EnableConversationsButton() {
  const { client, error, isLoading, initialize } = useXmtpClient();

  const handleConnect = async () => {
    await initialize();
  };

  if (isLoading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  if (!client) {
    return (
      <button type="button" onClick={handleConnect}>
        Connect to XMTP
      </button>
    );
  }

  return null;
}
