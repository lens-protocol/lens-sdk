import './shims';

import { config } from '@gluestack-ui/config';
import { Box, GluestackUIProvider, SafeAreaView } from '@gluestack-ui/themed';
import { LensConfig, LensProvider } from '@lens-protocol/react-native';
import { storage } from '@lens-protocol/react-native/storage/mmkv';
import { useWalletConnectModal, IProvider } from '@walletconnect/modal-react-native';
import React, { useMemo } from 'react';
import { createWalletClient, custom, WalletClient } from 'viem';

import { ConnectButton } from './components/ConnectButton';
import { Main } from './components/Main';
import { WalletConnectModal } from './components/WalletConnectModal';
import { getLensEnvironment, getViemChain } from './utils/environment';
import { bindings } from './utils/wallet';

type RequestArguments = Parameters<IProvider['request']>[0];

export function App() {
  const { provider } = useWalletConnectModal();

  const walletClient: WalletClient = useMemo(
    () =>
      createWalletClient({
        chain: getViemChain(),
        transport: custom({
          async request({ method, params }: RequestArguments) {
            return provider?.request({ method, params });
          },
        }),
      }),
    [provider],
  );

  const lensConfig: LensConfig = useMemo(
    () => ({
      bindings: bindings(walletClient),
      environment: getLensEnvironment(),
      storage: storage(),
    }),
    [walletClient],
  );

  return (
    <GluestackUIProvider config={config}>
      <LensProvider config={lensConfig}>
        <SafeAreaView flex={1} backgroundColor="primary0">
          <Box flex={1} padding={15}>
            <Main />
            <ConnectButton />
          </Box>
        </SafeAreaView>
      </LensProvider>
      <WalletConnectModal />
    </GluestackUIProvider>
  );
}
