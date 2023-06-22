import { Web3Provider, JsonRpcSigner } from '@ethersproject/providers';
import { Amount, Asset } from '@lens-protocol/react-web';
import { WalletClient } from 'wagmi';

export function never(message = 'Unexpected call to never()'): never {
  throw new Error(message);
}

export function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

export function formatAmount(amount: Amount<Asset>) {
  return `${amount.toSignificantDigits()} ${amount.asset.symbol}`;
}

export async function signerFromWalletClient({
  walletClient,
  chainId,
}: {
  walletClient: WalletClient;
  chainId?: number;
}): Promise<JsonRpcSigner> {
  const { account, chain, transport } = walletClient;

  const network = chain
    ? {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
      }
    : chainId;
  const provider = new Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
  return signer;
}
