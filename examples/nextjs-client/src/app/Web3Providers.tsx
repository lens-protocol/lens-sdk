'use client';

import { LensProvider } from '@lens-protocol/react';
import { client } from './client';

export function Web3Providers({ children }: { children: React.ReactNode }) {
  return <LensProvider client={client}>{children}</LensProvider>;
}
