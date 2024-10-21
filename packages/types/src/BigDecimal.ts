import type { Tagged } from 'type-fest';

/**
 * A string representation of an high precision decimal number (e.g., "0.1", "1000.42")
 */
export type BigDecimal = Tagged<string, 'BigDecimal'>;
