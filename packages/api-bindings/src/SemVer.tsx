import { Brand } from '@lens-protocol/shared-kernel';

export type SemVer = Brand<string, 'SemVer'>;

export function semVer(value: string): SemVer {
  // for now just asserts the type, in future it will enforce a format
  return value as SemVer;
}
