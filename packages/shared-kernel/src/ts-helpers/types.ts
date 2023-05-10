// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any[]) => any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructable = new (...args: any[]) => any;

/**
 * Specifies an object with unknown keys
 *
 * Useful when you don't care about exact props passed to the component.
 * @privateRemarks Don't use `{}` as a type. `{}` actually means "any non-nullish value".
 * @internal
 */
export type UnknownObject = Record<string, unknown>;

/**
 * Forces deeply all properties to be marked as partial (undefined)
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer Z>
    ? ReadonlyArray<DeepPartial<Z>>
    : DeepPartial<T[P]>;
};

/**
 * Overwrites properties from T1 with one from T2
 * @internal
 * @example
 * ```ts
 * Overwrite<{ foo: boolean, bar: string }, { foo: number }> // { foo: number, bar: string }
 * ```
 */
export type Overwrite<T1, T2> = DistributiveOmit<T1, keyof T2> & T2;

/**
 * Change the type of exclusive properties from T in U to `never` and `undefined`
 * @internal
 * @example
 * ```ts
 * Without<{ foo: boolean, bar: string }, { foo: boolean }> // { bar?: never }
 * ```
 */
export type Without<T, U> = {
  [P in Exclude<keyof T, keyof U>]?: never;
};

/**
 * Makes union exclusive. Useful in situations when only single prop can be provided at the same time
 * @internal
 * @example
 * ```ts
 * XOR<{ foo: boolean}, { bar: number }> // { foo: boolean, bar?: never } | { foo?: never, bar: number }
 * ```
 */
export type XOR<T extends UnknownObject, U extends UnknownObject> =
  | (Without<T, U> & U)
  | (Without<U, T> & T);

/**
 * Ask TS to re-check that A1 extends A2. And if it fails, A2 will be enforced anyway.
 * @internal
 */
export type Cast<A, B> = A extends B ? A : B;

/**
 * Prevent type widening on generic parameters
 * @internal
 */
export type Narrow<A> = Cast<
  A,
  [] | (A extends Primitive ? A : never) | { [K in keyof A]: Narrow<A[K]> }
>;

/**
 * Extracts simple JSON paths from a nested type.
 * It does not support square brackets notation (yet).
 */
export type Gettify<T, P extends keyof T = keyof T> = P extends string | number
  ? T[P] extends UnknownObject
    ? `${P}.${Gettify<T[P]>}`
    : P
  : never;

/**
 * Primitive types
 * @internal
 */
export type Primitive = string | number | boolean | bigint | symbol | undefined | null;

/**
 * Omits properties from an union type, preserving the union.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

/**
 * Distributes TAdd over a union TUnion.
 * @internal
 */
export type Distribute<TUnion, TAdd> = TUnion extends unknown ? TUnion & TAdd : never;

/**
 * Declares a non empty array of the specified type.
 */
export type NonEmptyArray<T> = Overwrite<
  [T, ...T[]],
  {
    map<U>(
      callbackfn: (value: T, index: number, array: T[]) => U,
      thisArg?: unknown,
    ): NonEmptyArray<U>;
  }
>;

/**
 * Declares an array of at least two elements of the specified type.
 * @internal
 */
export type TwoAtLeastArray<T> = Overwrite<
  [T, T, ...T[]],
  {
    map<U>(
      callbackfn: (value: T, index: number, array: T[]) => U,
      thisArg?: unknown,
    ): TwoAtLeastArray<U>;
  }
>;

/**
 * Beautify the  readout of all of the members of that intersection.
 *
 * As seen on tv: https://twitter.com/mattpocockuk/status/1622730173446557697
 *
 * @internal
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

declare const brand: unique symbol;

/**
 * Branding function
 *
 * @internal
 */
export type Brand<T, TBrand> = T & { [brand]: TBrand };
