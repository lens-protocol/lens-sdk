import './shims';

import {IBindings, LensConfig, LensProvider, sources, staging} from '@lens-protocol/react';

import {ExplorePublications} from './src/ExplorePublications';
import {mmkvStorageProvider} from './src/mmkvStorageProvider';

export function bindings(): IBindings {
  return {
    getProvider: async ({}) => {
      throw new Error('NOT SUPPORTED');
    },
    getSigner: async ({}) => {
      throw new Error('NOT SUPPORTED');
    },
  };
}

const lensConfig: LensConfig = {
  bindings: bindings(),
  environment: staging,
  sources: [sources.lenster, sources.orb, 'any-other-app-id'],
  storage: mmkvStorageProvider(),
};

export default function App() {
  return (
    <LensProvider config={lensConfig}>
      <ExplorePublications />
    </LensProvider>
  );
}
