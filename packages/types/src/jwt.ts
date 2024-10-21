import type { Tagged } from 'type-fest';

/**
 * A JWT in compact form.
 */
export type CompactJwt = `${string}.${string}.${string}`;

/**
 * The Access Token JWT.
 */
export type AccessToken = Tagged<string, 'AccessToken'>;

/**
 * The Refresh Token JWT.
 */
export type RefreshToken = Tagged<string, 'RefreshToken'>;

/**
 * The ID Token JWT.
 */
export type IdToken = Tagged<string, 'IdToken'>;
