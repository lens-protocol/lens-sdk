/* eslint-disable @typescript-eslint/unbound-method */
import { ProfileId, PublicationId } from '@lens-protocol/domain/entities';
import { Amount, ChainType, erc20, Erc20Amount, Kind } from '@lens-protocol/shared-kernel';
import { z } from 'zod';

import { profileId, publicationId } from '../../../../utils';

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

/**
 * The type annotation here to reduce the likelihood of incurring in the TS7056 error down the line:
 * ```
 * error TS7056: The inferred type of this node exceeds the maximum length the compiler will serialize. An explicit type annotation is needed.
 * ```
 */
export const Erc20AmountSchema: z.Schema<Erc20Amount> = z.any().refine(
  z
    .object({
      asset: Erc20Schema,
      value: z.string(),
    })
    .transform((value) => Amount.erc20(value.asset, value.value)).parse,
);

// see https://github.com/colinhacks/zod/issues/210#issuecomment-729775018
export const ProfileIdSchema: z.Schema<ProfileId> = z
  .any()
  .refine(z.string().transform(profileId).parse);

// see https://github.com/colinhacks/zod/issues/210#issuecomment-729775018
export const PublicationIdSchema: z.Schema<PublicationId> = z
  .any()
  .refine(z.string().transform(publicationId).parse);
