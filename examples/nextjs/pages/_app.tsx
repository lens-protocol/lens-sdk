import 'example-shared';
import { LensConfig, LensProvider, sources, development, appId } from '@lens-protocol/react-web';
import type { AppProps } from 'next/app';
import React from 'react';

import { bindings } from '../domain/wallet';

const lensConfig: LensConfig = {
  bindings: bindings(),
  environment: development,
  sources: [sources.lenster, sources.orb, appId('any-other-app-id')],
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LensProvider config={lensConfig}>
      <Component {...pageProps} />
    </LensProvider>
  );
}
