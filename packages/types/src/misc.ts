import type { Tagged } from 'type-fest';

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
