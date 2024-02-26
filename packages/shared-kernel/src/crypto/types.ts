/**
 * An EVM address
 */

import { Brand } from '../ts-helpers/types';

// TODO brand and enforce correct patterns
export type EvmAddress = string;

/**
 * An encoded data payload.
 */
export type Data = Brand<string, 'Data'>;

/**
 * A Uniform Resource Locator.
 *
 * A URL is a specific type of URI that, in addition to identifying a web resource,
 * specifies the means of acting upon or obtaining the representation of the resource,
 * i.e. specifying both its primary access mechanism and network location.
 */
export type URL = Brand<string, 'URL'>;

/**
 * A Uniform Resource Identifier.
 *
 * It could be a URL pointing to a specific resource,
 * an IPFS URI (e.g. ipfs://Qm...), or an Arweave URI (e.g. ar://Qm...).
 */
export type URI = Brand<string, 'URI'>;
