import { omitDeep } from '@lens-protocol/shared-kernel';

export function omitTypename(target: unknown) {
  return omitDeep(target, '__typename');
}
