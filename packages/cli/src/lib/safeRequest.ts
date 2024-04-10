import { assertError } from '@lens-protocol/shared-kernel';

import { output } from './output.js';

/*
 * Safely execute a request and handle errors
 */
export async function safeRequest<T>(
  callback: () => Promise<T>,
  onError?: (error: Error) => void,
): Promise<T> {
  try {
    return await callback();
  } catch (error) {
    assertError(error);
    if (onError) {
      onError(error);
    }
    output.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
