import type { Tagged } from 'type-fest';
import { tag } from './tag';

/**
 * A Uniform Resource Identifier.
 *
 * It could be a URL pointing to a specific resource,
 * an IPFS URI (e.g. ipfs://Qm...), or an Arweave URI (e.g. ar://Qm...).
 */
export type URI = Tagged<string, 'URI'>;
export const uri = tag<URI>;

/**
 * A Uniform Resource Locator.
 *
 * A URL is a specific type of URI that, in addition to identifying a web resource,
 * specifies the means of acting upon or obtaining the representation of the resource,
 * i.e. specifying both its primary access mechanism and network location.
 */
export type URL = Tagged<string, 'URL'>;
export const url = tag<URL>;
