import {
  LensProvider as LensProviderBase,
  LensProviderProps as LensProviderBaseProps,
} from '@lens-protocol/react';
import type { LensConfig as LensConfigBase } from '@lens-protocol/react';
import { Overwrite, Prettify } from '@lens-protocol/shared-kernel';
import { useState } from 'react';

import { localStorage } from './storage';

export type LensConfig = Omit<LensConfigBase, 'storage'>;

export type LensProviderProps = Prettify<Overwrite<LensProviderBaseProps, { config: LensConfig }>>;

const storage = localStorage();

export function LensProvider({ config, ...props }: LensProviderProps) {
  const [resolvedConfig] = useState<LensConfigBase>(() => ({
    ...config,
    storage,
  }));

  return <LensProviderBase config={resolvedConfig} {...props} />;
}
