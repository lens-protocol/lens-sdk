import { TransactionKind } from '@lens-protocol/domain/entities';
import { TokenAllowanceLimit } from '@lens-protocol/domain/use-cases/wallets';
import { z } from 'zod';

import { Erc20AmountSchema } from './common';

export const TokenAllowanceRequestSchema = z.object({
  amount: Erc20AmountSchema,
  spender: z.string(),
  limit: z.nativeEnum(TokenAllowanceLimit),
  kind: z.literal(TransactionKind.APPROVE_MODULE),
});
