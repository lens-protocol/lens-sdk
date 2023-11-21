import { AppId } from '@lens-protocol/domain/entities';

import { appId } from './utils';

export const sources: Record<string, AppId> = {
  lenster: appId('lenster'),
  orb: appId('orb'),
} as const;
