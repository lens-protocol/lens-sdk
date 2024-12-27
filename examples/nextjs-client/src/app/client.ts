import { PublicClient, testnet } from '@lens-protocol/client';

export const client = PublicClient.create({
  environment: testnet,
});
