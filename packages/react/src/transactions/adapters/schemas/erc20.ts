import { TransactionKind } from '@lens-protocol/domain/entities';
import {
  TokenAllowanceLimit,
  TokenAllowanceRequest,
} from '@lens-protocol/domain/use-cases/transactions';
import { UnknownObject } from '@lens-protocol/shared-kernel';
import { z } from 'zod';

import { Erc20AmountSchema } from './common';

export const TokenAllowanceRequestSchema: z.ZodType<
  TokenAllowanceRequest,
  z.ZodTypeDef,
  UnknownObject
> = z.object({
  amount: Erc20AmountSchema,
  spender: z.string(),
  limit: z.nativeEnum(TokenAllowanceLimit),
  kind: z.literal(TransactionKind.APPROVE_MODULE),
});
