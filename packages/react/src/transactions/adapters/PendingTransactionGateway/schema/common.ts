/* eslint-disable @typescript-eslint/unbound-method */
import { ProfileId, PublicationId } from '@lens-protocol/domain/entities';
import {
  Amount,
  ChainType,
  Erc20,
  erc20,
  Erc20Amount,
  Kind,
  UnknownObject,
} from '@lens-protocol/shared-kernel';
import { z } from 'zod';

import { profileId, publicationId } from '../../../../utils';

const Erc20Schema: z.Schema<Erc20, z.ZodTypeDef, UnknownObject> = z
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
export const Erc20AmountSchema: z.Schema<Erc20Amount, z.ZodTypeDef, UnknownObject> = z
  .object({
    asset: Erc20Schema,
    value: z.string(),
  })
  .transform((value) => Amount.erc20(value.asset, value.value));

export const ProfileIdSchema: z.Schema<ProfileId, z.ZodTypeDef, string> = z
  .string()
  .transform(profileId);

export const PublicationIdSchema: z.Schema<PublicationId, z.ZodTypeDef, string> = z
  .string()
  .transform(publicationId);
