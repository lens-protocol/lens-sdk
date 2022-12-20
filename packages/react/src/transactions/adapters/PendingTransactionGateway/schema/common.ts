import { Amount, ChainType, erc20, Kind } from '@lens-protocol/shared-kernel';
import { z } from 'zod';

const Erc20Schema = z
  .object({
    kind: z.literal(Kind.ERC20),
    name: z.string(),
    decimals: z.number(),
    symbol: z.string(),
    address: z.string(),
    chainType: z.nativeEnum(ChainType),
  })
  .transform((value) => erc20(value));

export const Erc20AmountSchema = z
  .object({
    asset: Erc20Schema,
    value: z.string(),
  })
  .transform((value) => Amount.erc20(value.asset, value.value));
