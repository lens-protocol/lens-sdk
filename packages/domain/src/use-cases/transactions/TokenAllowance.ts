import { Amount, Erc20, EvmAddress } from '@lens-protocol/shared-kernel';

import { TransactionKind } from '../../entities';
import { PaidTransaction } from './PaidTransaction';

/**
 * Token allowance limit.
 */
export enum TokenAllowanceLimit {
  /**
   * The allowance will be set to the exact amount specified in the request.
   */
  EXACT,
  /**
   * The allowance will be set to the maximum value possible, virtually infinite.
   */
  INFINITE,
}

export type TokenAllowanceRequest = {
  amount: Amount<Erc20>;
  spender: EvmAddress;
  limit: TokenAllowanceLimit;
  kind: TransactionKind.APPROVE_MODULE;
};

export class TokenAllowance extends PaidTransaction<TokenAllowanceRequest> {}
