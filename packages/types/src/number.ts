import type { Tagged } from 'type-fest';
import { invariant } from './helpers';

/**
 * A string representation of an high precision decimal number (e.g., "0.1", "1000.42")
 */
export type BigDecimal = Tagged<string, 'BigDecimal'>;
export function bigDecimal(value: string | number): BigDecimal {
  const str = String(value);
  invariant(/^-?\d+(\.\d+)?$/.test(str), `Invalid BigDecimal: ${str}`);
  return str as BigDecimal;
}

/**
 * A string representation of a big integer number.
 */
export type BigIntString = Tagged<string, 'BigIntString'>;
export function bigIntString(value: string): BigIntString {
  invariant(!/^-?\d+$/.test(value), `Invalid BigIntString: ${value}`);
  return value as BigIntString;
}
