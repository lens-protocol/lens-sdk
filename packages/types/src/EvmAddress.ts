import type {Tagged} from 'type-fest';
import type {HexString} from './HexString';

/**
 * An EVM address.
 */
export type EvmAddress = Tagged<HexString, 'EvmAddress'>;
