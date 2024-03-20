import './shims';

import { config } from '@gluestack-ui/config';
import { Box, GluestackUIProvider, SafeAreaView } from '@gluestack-ui/themed';
import { LensConfig, LensProvider, development } from '@lens-protocol/react-native';
import { storage } from '@lens-protocol/react-native/storage/mmkv';
import React from 'react';

import { Main } from './Main';
import { bindings } from './wallet';

const lensConfig: LensConfig = {
  bindings: bindings(),
  environment: development,
  storage: storage(),
};

export function App() {
  return (
    <GluestackUIProvider config={config}>
      <LensProvider config={lensConfig}>
        <SafeAreaView flex={1} backgroundColor="primary0">
          <Box flex={1} padding={15}>
            <Main />
          </Box>
        </SafeAreaView>
      </LensProvider>
    </GluestackUIProvider>
  );
}
