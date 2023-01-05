/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any */
import isObjectLike from 'lodash/isObjectLike.js';

import { Primitive, UnknownObject } from './ts-helpers/types';

function isPrimitive(value: any): value is Primitive {
  return !isObjectLike(value);
}

export type DeepOmit<T, Filter extends string> = T extends Primitive
  ? T
  : T extends Array<infer ItemType>
  ? ItemType extends UnknownObject
    ? Array<DeepOmit<ItemType, Filter>>
    : T
  : T extends UnknownObject
  ? {
      [K in keyof T as Exclude<K, Filter>]: DeepOmit<T[K], Filter>;
    }
  : never;

export function omitDeep<TData, TKey extends string>(
  target: TData,
  omitKey: TKey,
): DeepOmit<TData, TKey>;
export function omitDeep(target: any, omitKey: string): any {
  if (isPrimitive(target)) {
    return target;
  }
  if (Array.isArray(target)) {
    return target.map((item) => {
      return omitDeep(item, omitKey);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.keys(target).reduce((acc, key) => {
    if (key === omitKey) {
      return acc;
    }

    const value = omitDeep(target[key], omitKey);

    acc[key] = value;
    return acc;
  }, {} as any);
}
