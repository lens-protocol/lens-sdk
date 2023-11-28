import './shims';

import { LensConfig, LensProvider, development } from '@lens-protocol/react-native';
import { storage } from '@lens-protocol/react-native/storage/mmkv';
import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import { LoginButton } from './LoginButton';
import { bindings } from './wallet';

const lensConfig: LensConfig = {
  bindings: bindings(),
  environment: development,
  storage: storage(),
};

export function App() {
  return (
    <LensProvider config={lensConfig}>
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <LoginButton />
        </View>
      </SafeAreaView>
    </LensProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 15,
  },
});
