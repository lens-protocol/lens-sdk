import './shims';

import {LensConfig, LensProvider, sources, staging} from '@lens-protocol/react';

import {ExplorePublications} from './src/ExplorePublications';
import {mmkvStorageProvider} from './src/mmkvStorageProvider';
import {bindings} from './src/wallet';
import {LoginButton} from './src/LoginButton';
import {SafeAreaView, StyleSheet} from 'react-native';

const lensConfig: LensConfig = {
  bindings: bindings(),
  environment: staging,
  sources: [sources.lenster, sources.orb, 'any-other-app-id'],
  storage: mmkvStorageProvider(),
};

export default function App() {
  return (
    <LensProvider config={lensConfig}>
      <SafeAreaView style={styles.wrapper}>
        <LoginButton />
        <ExplorePublications />
      </SafeAreaView>
    </LensProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 15,
  },
});
