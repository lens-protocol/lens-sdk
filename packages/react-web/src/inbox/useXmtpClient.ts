import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
  useSharedDependencies,
} from '@lens-protocol/react';
import { assertError } from '@lens-protocol/shared-kernel';
import { IStorage } from '@lens-protocol/storage';
import { Client, ClientOptions, useClient } from '@xmtp/react-sdk';
import { useCallback, useState } from 'react';

import { SignerAdapter } from './adapters/SignerAdapter';

async function storeKeys(storage: IStorage<string>, keys: Uint8Array) {
  await storage.set(Uint8Array.from(keys).toString());
}

async function loadKeys(storage: IStorage<string>): Promise<Uint8Array | null> {
  const val = await storage.get();
  return val ? Uint8Array.from(val.split(',').map((c) => parseInt(c))) : null;
}

/**
 * @experimental
 */
export type InitXmtpClientOptions = Partial<Omit<ClientOptions, 'env' | 'privateKeyOverride'>>;

/**
 * @experimental
 */
export type UseXmtpClientResult = {
  client: Client | undefined;
  disconnect: () => Promise<void>;
  error: PendingSigningRequestError | UserRejectedError | WalletConnectionError | Error | undefined;
  initialize: (options?: InitXmtpClientOptions) => Promise<Client | undefined>;
  isLoading: boolean;
};

const defaultOptions: InitXmtpClientOptions = {
  persistConversations: true,
};

/**
 * Initialize XMTP client using the same Signer as the one provided with `LensConfig`.
 * Store XMTP user's decryption key in storage to improve UX.
 * Be aware that XMTP user's key must be stored safely.
 *
 * You MUST be authenticated via `useLogin` to use this hook.
 *
 * @example
 * ```tsx
 * const { client, disconnect, isLoading, error, initialize } = useXmtpClient();
 *
 * const handleConnect = async () => {
 *   await initialize();
 * };
 *
 * if (isLoading) return 'Loading...';
 * if (error) return 'Error';
 *
 * if (!client) {
 *   return (
 *     <button type="button" onClick={handleConnect}>
 *       Connect to XMTP
 *     </button>
 *   );
 * }
 * ```
 * @category Inbox
 * @group Hooks
 * @experimental
 */
export function useXmtpClient(): UseXmtpClientResult {
  const { client, disconnect, isLoading: clientIsLoading, initialize } = useClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<UseXmtpClientResult['error']>();

  const { activeWallet, inboxKeyStorage: storage } = useSharedDependencies();

  const initializeWithLens = useCallback(
    async (options: InitXmtpClientOptions = defaultOptions) => {
      setIsLoading(true);
      setError(undefined);

      try {
        const existingKeys = await loadKeys(storage);
        const signer = new SignerAdapter(activeWallet);

        if (existingKeys) {
          const newClient = await initialize({
            keys: existingKeys,
            signer,
            options,
          });

          return newClient;
        }

        const newClient = await initialize({
          signer,
          options,
        });

        const newKeys = await Client.getKeys(signer);
        await storeKeys(storage, newKeys);

        return newClient;
      } catch (e) {
        assertError(e);
        setError(e);

        return undefined;
      } finally {
        setIsLoading(false);
      }
    },
    [activeWallet, initialize, storage],
  );

  return {
    client,
    disconnect,
    isLoading: isLoading || clientIsLoading,
    error,
    initialize: initializeWithLens,
  };
}
