import { chains } from '@lens-chain/sdk/viem';
import type { Account, Chain, Transport, WalletClient } from 'viem';

/**
 * @internal
 */
export function isOnLensChain(
  client: WalletClient,
): client is WalletClient<Transport, chains.LensChain> {
  return client.chain?.id === chains.mainnet.id || client.chain?.id === chains.testnet.id;
}

/**
 * @internal
 */
export function hasHoistedAccount<T extends Chain>(
  client: WalletClient<Transport, T>,
): client is WalletClient<Transport, T, Account> {
  return client.account !== undefined;
}
