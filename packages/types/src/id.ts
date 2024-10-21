import type { Tagged } from 'type-fest';

/**
 * An identifier.
 */
export type ID = Tagged<string, 'ID'>;

/**
 * A Universally Unique Identifier.
 */
export type UUID = Tagged<`${string}-${string}-${string}-${string}-${string}`, 'UUID'>;

/**
 * A Lens Post ID.
 */
export type PostId = Tagged<string, 'PostId'>;

/**
 * A Lens v2 Profile ID.
 */
export type LegacyProfileId = Tagged<string, 'LegacyProfileId'>;

/**
 * A Lens Username (e.g., `lens/wagmi`, `lens/brainjammer`)
 */
export type UsernameValue = Tagged<`${string}/${string}`, 'UsernameValue'>;
