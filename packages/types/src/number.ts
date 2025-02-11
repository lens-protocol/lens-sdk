import type { Tagged } from 'type-fest';
import { invariant } from './helpers';

/**
 * A string representation of an high precision decimal number (e.g., "0.1", "1000.42")
 */
export type BigDecimal = Tagged<string, 'BigDecimal'>;
export function bigDecimal(value: string): BigDecimal {
  invariant(!/^-?\d+(\.\d+)?$/.test(value), `Invalid BigDecimal: ${value}`);
  return value as BigDecimal;
}

/**
 * A string representation of a big integer number.
 */
export type BigIntString = Tagged<string, 'BigIntString'>;
