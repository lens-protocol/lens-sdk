import { PublicClient, mainnet } from '@lens-protocol/react';

export const client = PublicClient.create({
  environment: mainnet,
  storage: window.localStorage,
});
