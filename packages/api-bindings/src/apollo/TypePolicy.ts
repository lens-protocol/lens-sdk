import {
  FieldFunctionOptions as UnpatchedFieldFunctionOptions,
  FieldPolicy as UnpatchedFieldPolicy,
  TypePolicy as UnpatchedTypePolicy,
} from '@apollo/client';
import { Overwrite } from '@lens-protocol/shared-kernel';

type FieldFunctionOptions<TAll> = Overwrite<
  UnpatchedFieldFunctionOptions,
  {
    readField: <T extends keyof NO, O = TAll, NO = NonNullable<O>>(
      fieldName: T,
      from?: O,
    ) => Readonly<NO[T]> | undefined;
  }
>;

export type FieldReadFunction<TExisting, TAll> = (
  existing: Readonly<TExisting> | undefined,
  options: FieldFunctionOptions<TAll>,
) => TExisting | undefined;

export type FieldPolicy<TExisting, TAll> = Overwrite<
  UnpatchedFieldPolicy<TExisting>,
  { read?: FieldReadFunction<TExisting, TAll> }
>;

type FieldPolicies<T> = Partial<{
  [key in keyof T]: FieldPolicy<T[key], T> | FieldReadFunction<T[key], T>;
}>;

export type TypePolicy<T> = Overwrite<
  UnpatchedTypePolicy,
  {
    fields?: FieldPolicies<T>;
  }
>;
