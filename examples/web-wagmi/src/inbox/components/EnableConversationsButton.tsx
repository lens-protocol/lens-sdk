import { useClient } from '@xmtp/react-sdk';
import { useCallback } from 'react';
import { useWalletClient } from 'wagmi';

import { signerFromWalletClient } from '../../utils';

export function EnableConversationsButton() {
  const { data: walletClient } = useWalletClient();
  const { client, error, isLoading, initialize } = useClient();

  const handleConnect = useCallback(async () => {
    if (!walletClient) return;
    const signer = await signerFromWalletClient({ walletClient });
    await initialize({ signer });
  }, [initialize, walletClient]);

  if (error) {
    return <div>An error occurred while initializing the client</div>;
  }

  if (isLoading) {
    return <div>Awaiting signature...</div>;
  }

  if (!client) {
    return (
      <button type="button" onClick={handleConnect}>
        Connect to XMTP
      </button>
    );
  }

  return null;
}
