import {
  FieldFunctionOptions,
  FieldPolicy,
  TypePolicy as UnpatchedTypePolicy,
} from "@apollo/client";
import { Overwrite } from "@lens-protocol/shared-kernel";

type TypedFieldFunctionOptions<TAll> = Overwrite<
  FieldFunctionOptions,
  {
    readField: <T extends keyof NO, O = TAll, NO = NonNullable<O>>(
      fieldName: T,
      from?: O
    ) => Readonly<NO[T]> | undefined;
  }
>;

type TypedFieldReadFunction<TExisting, TAll> = (
  existing: Readonly<TExisting> | undefined,
  options: TypedFieldFunctionOptions<TAll>
) => TExisting | undefined;

export type TypePolicy<T> = Overwrite<
  UnpatchedTypePolicy,
  {
    fields?: Partial<{
      [key in keyof T]: FieldPolicy<T[key]> | TypedFieldReadFunction<T[key], T>;
    }>;
  }
>;
