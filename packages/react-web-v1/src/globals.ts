/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { maybe, never } from '@lens-protocol/shared-kernel';

const safeGlobal = (maybe(() => globalThis) ??
  maybe(() => window) ??
  maybe(() => self) ??
  maybe(() => global) ??
  never('Cannot resolve a global object.')) as typeof globalThis & Window;

export const window = maybe(() => safeGlobal.window) ?? null;
