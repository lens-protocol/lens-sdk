import { PublicClient, testnet } from '@lens-protocol/react';

export const client = PublicClient.create({
  environment: testnet,
  storage: window.localStorage,
});
