import type { Tagged } from 'type-fest';
import { identity } from './identity';

/**
 * An identifier.
 */
export type ID = Tagged<string, 'ID'>;

/**
 * A Universally Unique Identifier.
 */
export type UUID = Tagged<`${string}-${string}-${string}-${string}-${string}`, 'UUID'>;
export const uuid = identity<UUID>;

/**
 * A Lens Post ID.
 */
export type PostId = Tagged<string, 'PostId'>;
export const postId = identity<PostId>;

/**
 * A Lens Post ID.
 */
export type RuleId = Tagged<string, 'RuleId'>;
export const ruleId = identity<RuleId>;

/**
 * A Lens v2 Profile ID.
 */
export type LegacyProfileId = Tagged<string, 'LegacyProfileId'>;

/**
 * A Lens Username (e.g., `lens/wagmi`, `lens/brainjammer`)
 */
export type UsernameValue = Tagged<`${string}/${string}`, 'UsernameValue'>;
