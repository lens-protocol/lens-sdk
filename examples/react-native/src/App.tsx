import './shims';

import { config } from '@gluestack-ui/config';
import { Box, GluestackUIProvider, SafeAreaView } from '@gluestack-ui/themed';
import { LensConfig, LensProvider } from '@lens-protocol/react-native';
import { storage } from '@lens-protocol/react-native/storage/mmkv';
import { IProvider, useWalletConnectModal } from '@walletconnect/modal-react-native';
import React, { useEffect, useRef } from 'react';

import { ConnectButton } from './components/ConnectButton';
import { Main } from './components/Main';
import { WalletConnectModal } from './components/WalletConnectModal';
import { Deferred } from './utils/Deferred';
import { bindings } from './utils/bindings';
import { getLensEnvironment } from './utils/environment';

export function App() {
  const { provider } = useWalletConnectModal();

  const deferred = useRef(new Deferred<IProvider>());

  useEffect(() => {
    if (provider) {
      deferred.current.resolve(provider);
    }
  }, [provider]);

  const lensConfig: LensConfig = {
    bindings: bindings(deferred.current.promise),
    environment: getLensEnvironment(),
    storage: storage(),
    origin: 'https://nativelens.com',
  };

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
