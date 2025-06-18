import { InvariantError } from '@lens-chain/storage-client';
import type {
  AnyAccountBalance,
  Erc20Amount,
  NativeAmount,
} from '@lens-protocol/graphql';
import { type EvmAddress, err, ok, type Result } from '@lens-protocol/types';
import { UnexpectedError } from '../errors';

/**
 * Given a list of account balances, find the native amount.
 *
 * @experimental This function is subject to change.
 * @param balances - A list of account balances as returned by the {@link fetchAccountBalances} action.
 * @returns The native amount.
 */
export function findNativeAmount(
  balances: AnyAccountBalance[],
): Result<NativeAmount, InvariantError | UnexpectedError> {
  for (const entry of balances) {
    switch (entry.__typename) {
      case 'NativeBalanceError':
        return err(new UnexpectedError(entry.reason));
      case 'NativeAmount':
        return ok(entry);
    }
  }
  return err(new InvariantError('No native balance found'));
}

/**
 * Given a list of account balances, find the ERC20 entry for a given token.
 *
 * @experimental This function is subject to change.
 * @param token - The token address.
 * @param balances - A list of account balances as returned by the {@link fetchAccountBalances} action.
 * @returns The ERC20 amount.
 */
export function findErc20Amount(
  token: EvmAddress,
  balances: AnyAccountBalance[],
): Result<Erc20Amount, InvariantError | UnexpectedError> {
  for (const entry of balances) {
    switch (entry.__typename) {
      case 'Erc20BalanceError':
        if (entry.token === token) {
          return err(new UnexpectedError(entry.reason));
        }
        break;
      case 'Erc20Amount':
        if (entry.asset.contract.address === token) {
          return ok(entry);
        }
        break;
    }
  }
  return err(new InvariantError(`No balance found for token ${token}`));
}
