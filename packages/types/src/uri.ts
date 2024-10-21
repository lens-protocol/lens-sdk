import type { Tagged } from 'type-fest';

/**
 * A Uniform Resource Identifier is a string that refers to a resource.
 */
export type URI = Tagged<string, 'URI'>;

/**
 * A Uniform Resource Locator identifies a resource on the internet.
 */
export type URL = Tagged<string, 'URL'>;
