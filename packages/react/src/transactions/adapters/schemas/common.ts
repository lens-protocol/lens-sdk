/* eslint-disable @typescript-eslint/unbound-method */
import { ProfileId, PublicationId, Signature } from '@lens-protocol/domain/entities';
import {
  Amount,
  BigDecimal,
  ChainType,
  Erc20,
  erc20,
  Erc20Amount,
  Kind,
  UnknownObject,
} from '@lens-protocol/shared-kernel';
import { z } from 'zod';

import { profileId, publicationId } from '../../../utils';

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
export const SerializedErc20AmountSchema: z.Schema<Erc20Amount, z.ZodTypeDef, UnknownObject> = z
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

// Checky workaround to private constructor
const AmountCtor = Amount.ether(0).constructor as new (
  asset: Erc20,
  value: BigDecimal,
) => Erc20Amount;

export const Erc20AmountInstanceSchema: z.Schema<Erc20Amount, z.ZodTypeDef, Erc20Amount> =
  z.instanceof(AmountCtor, 'value not instance of Amount<Erc20>');

export type Erc20AmountSchema = z.Schema<Erc20Amount, z.ZodTypeDef, unknown>;

export const SignatureSchema: z.Schema<Signature, z.ZodTypeDef, string> = z
  .string()
  .transform((value) => value as Signature);
