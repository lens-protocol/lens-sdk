import {
  PendingSigningRequestError,
  UserRejectedError,
  WalletConnectionError,
  useActiveWalletController,
  useInboxKeyStorage,
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

export type InitXmtpClientOptions = Partial<Omit<ClientOptions, 'env' | 'privateKeyOverride'>>;

export type UseXmtpClientResult = {
  client: Client | undefined;
  disconnect: () => void;
  error: PendingSigningRequestError | UserRejectedError | WalletConnectionError | Error | undefined;
  initialize: (options?: InitXmtpClientOptions) => Promise<Client | undefined>;
  isLoading: boolean;
};

const defaultOptions: InitXmtpClientOptions = {
  persistConversations: true,
};

export function useXmtpClient(): UseXmtpClientResult {
  const { client, disconnect, isLoading: clientIsLoading, initialize } = useClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<UseXmtpClientResult['error']>();

  const activeWalletController = useActiveWalletController();
  const storage = useInboxKeyStorage();

  const initializeWithLens = useCallback(
    async (options: InitXmtpClientOptions = defaultOptions) => {
      setIsLoading(true);
      setError(undefined);

      try {
        const existingKeys = await loadKeys(storage);
        const signer = new SignerAdapter(activeWalletController);

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
    [activeWalletController, initialize, storage],
  );

  return {
    client,
    disconnect,
    isLoading: isLoading || clientIsLoading,
    error,
    initialize: initializeWithLens,
  };
}
