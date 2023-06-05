import { TransactionKind } from '@lens-protocol/domain/entities';
import { TokenAllowanceLimit } from '@lens-protocol/domain/use-cases/wallets';
import { z } from 'zod';

import { Erc20AmountSchema } from './common';

export function tokenAllowanceRequestSchema<TAmountSchema extends Erc20AmountSchema>(
  amountSchema: TAmountSchema,
) {
  return z.object({
    amount: amountSchema,
    spender: z.string(),
    limit: z.nativeEnum(TokenAllowanceLimit),
    kind: z.literal(TransactionKind.APPROVE_MODULE),
  });
}
