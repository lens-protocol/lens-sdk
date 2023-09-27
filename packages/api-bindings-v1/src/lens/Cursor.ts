import { Brand } from '@lens-protocol/shared-kernel';

export type Cursor = Brand<string, 'Cursor'>;

export function isCursor(value: unknown): value is Cursor {
  return typeof value === 'string';
}
