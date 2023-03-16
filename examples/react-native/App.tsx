import './shims';

import React from 'react';
import {LensConfig, LensProvider, staging} from '@lens-protocol/react';
import {View, StyleSheet, SafeAreaView} from 'react-native';

import {ExplorePublications} from './src/ExplorePublications';
import {mmkvStorageProvider} from './src/mmkvStorageProvider';
import {bindings} from './src/wallet';
import {LoginButton} from './src/LoginButton';

const lensConfig: LensConfig = {
  bindings: bindings(),
  environment: staging,
  storage: mmkvStorageProvider(),
};

export default function App() {
  return (
    <LensProvider config={lensConfig}>
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <LoginButton />
          <ExplorePublications />
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
