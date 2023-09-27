import { DeepOmit, omitDeep } from '@lens-protocol/shared-kernel';

export function omitTypename(target: unknown) {
  return omitDeep(target, '__typename');
}

export type OmitTypename<T> = Omit<T, '__typename'>;

export type DeepOmitTypename<T> = DeepOmit<T, '__typename'>;
