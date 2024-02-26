import { ProfileId, PublicationId } from '@lens-protocol/domain/entities';
import {
  Amount,
  BigDecimal,
  ChainType,
  Data,
  Erc20,
  erc20,
  Erc20Amount,
  EvmAddress,
  Kind,
  URI,
} from '@lens-protocol/shared-kernel';
import { z } from 'zod';

import { data, profileId, publicationId, uri } from '../../../utils';

export const UriSchema: z.ZodType<URI, z.ZodTypeDef, string> = z
  .string()
  .min(6)
  .url()
  .transform(uri);

export const EvmAddressSchema: z.ZodType<EvmAddress, z.ZodTypeDef, string> = z
  .string()
  .min(42)
  .transform((value) => value);

export const DataSchema: z.ZodType<Data, z.ZodTypeDef, string> = z.string().transform(data);

export const ProfileIdSchema: z.ZodType<ProfileId, z.ZodTypeDef, string> = z
  .string()
  .transform(profileId);

export const PublicationIdSchema: z.ZodType<PublicationId, z.ZodTypeDef, string> = z
  .string()
  .transform(publicationId);

const SerializedErc20Schema = z.object({
  kind: z.literal(Kind.ERC20),
  name: z.string(),
  decimals: z.number(),
  symbol: z.string(),
  address: z.string(),
  chainType: z.nativeEnum(ChainType),
});

const SerializedErc20AmountSchema = z.object({
  asset: SerializedErc20Schema,
  value: z.string(),
});
// Checky workaround to private constructor
const AmountCtor = Amount.ether(0).constructor as new (
  asset: Erc20,
  value: BigDecimal,
) => Erc20Amount;

export const Erc20AmountSchema = z
  .union([SerializedErc20AmountSchema, z.instanceof(AmountCtor)])
  .superRefine((val, ctx) => {
    if (val instanceof AmountCtor) {
      return z.NEVER;
    }

    const result = SerializedErc20AmountSchema.safeParse(val);

    if (!result.success) {
      result.error.issues.forEach((issue) => ctx.addIssue(issue));
    }

    return z.NEVER;
  })
  .transform((value) =>
    value instanceof AmountCtor ? value : Amount.erc20(erc20(value.asset), value.value),
  );

export type Erc20AmountSchema = z.ZodType<Erc20Amount, z.ZodTypeDef, object>;
