import type { Tagged } from 'type-fest';
import { tag } from './tag';

/**
 * An identifier.
 */
export type ID = Tagged<string, 'ID'>;

/**
 * A Universally Unique Identifier.
 */
export type UUID = Tagged<`${string}-${string}-${string}-${string}-${string}`, 'UUID'>;
export const uuid = tag<UUID>;

/**
 * A Lens Post ID.
 */
export type PostId = Tagged<string, 'PostId'>;
export const postId = tag<PostId>;

/**
 * A Lens Post ID.
 */
export type RuleId = Tagged<string, 'RuleId'>;
export const ruleId = tag<RuleId>;

/**
 * A Sponsorship Grant ID.
 */
export type GrantId = Tagged<string, 'GrantId'>;
export const grantId = tag<GrantId>;

/**
 * A Lens v2 Profile ID.
 */
export type LegacyProfileId = Tagged<string, 'LegacyProfileId'>;

/**
 * A Lens Username (e.g., `lens/wagmi`, `lens/brainjammer`)
 */
export type UsernameValue = Tagged<`${string}/${string}`, 'UsernameValue'>;
