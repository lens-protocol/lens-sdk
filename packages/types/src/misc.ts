import type { Tagged } from 'type-fest';
import { identity } from './identity';

/**
 * A void value.
 */
export type Void = Tagged<undefined, 'Void'>;

/**
 * An opaque pagination cursor.
 */
export type Cursor = Tagged<string, 'Cursor'>;

/**
 * A DateTime string in ISO 8601 format.
 */
export type DateTime = Tagged<string, 'DateTime'>;
export const dateTime = identity<DateTime>;

/**
 * Beautify the  readout of all of the members of that intersection.
 *
 * @see https://twitter.com/mattpocockuk/status/1622730173446557697
 *
 * @internal
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
