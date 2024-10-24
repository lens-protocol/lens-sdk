import type { Tagged } from 'type-fest';

/**
 * A JWT in compact form.
 */
export type CompactJwt = `${string}.${string}.${string}`;
export function compactJwt<T extends string = CompactJwt>(value: string): T {
  return value as T;
}

/**
 * The Access Token JWT.
 */
export type AccessToken = Tagged<CompactJwt, 'AccessToken'>;
export const accessToken = compactJwt<AccessToken>;

/**
 * The Refresh Token JWT.
 */
export type RefreshToken = Tagged<CompactJwt, 'RefreshToken'>;
export const refreshToken = compactJwt<RefreshToken>;

/**
 * The ID Token JWT.
 */
export type IdToken = Tagged<CompactJwt, 'IdToken'>;
export const idToken = compactJwt<IdToken>;
