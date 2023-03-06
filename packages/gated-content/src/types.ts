import { Maybe } from '@lens-protocol/api-bindings';
import { UnknownObject } from '@lens-protocol/shared-kernel';

type UnwrapMaybe<T extends Maybe<unknown>> = T extends Maybe<infer V> ? NonNullable<V> : never;

type KeyValuePairs<T> = {
  [K in keyof T]: T[K] extends null | undefined ? never : [K, UnwrapMaybe<T[K]>];
};

type Values<T> = T extends { [s: string]: infer V } ? V[] : never;

export type Entries<T> = Values<KeyValuePairs<T>>;

export type Entry<T> = Values<KeyValuePairs<T>>[number];

export type ExtractFields<T extends UnknownObject, F extends string> = Pick<T, Extract<keyof T, F>>;
