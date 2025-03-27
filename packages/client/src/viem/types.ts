import { chains } from '@lens-chain/sdk/viem';
import type { Account, Chain, Transport, WalletClient } from 'viem';

/**
 * @internal
 */
export function isOnLensChain<T extends Transport = Transport>(
  client: WalletClient<T>,
): client is WalletClient<T, chains.LensChain> {
  return client.chain?.id === chains.mainnet.id || client.chain?.id === chains.testnet.id;
}

/**
 * @internal
 */
export function hasHoistedAccount<TChain extends Chain | undefined = undefined>(
  client: WalletClient<Transport, TChain>,
): client is WalletClient<Transport, TChain, Account> {
  return client.account !== undefined;
}
