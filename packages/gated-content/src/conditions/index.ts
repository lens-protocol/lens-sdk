import { Maybe } from '@lens-protocol/api-bindings';
import { InvariantError, isNonNullable, never } from '@lens-protocol/shared-kernel';

import { EnvironmentConfig } from '../environments';
import { transformCollectCondition } from './collect-condition';
import { transformEoaCondition } from './eoa-condition';
import { transformErc20Condition } from './erc20-condition';
import { transformFollowCondition } from './follow-condition';
import { transformNftCondition } from './nft-condition';
import { transformProfileCondition } from './profile-condition';
import {
  AccessCondition,
  AccessConditionType,
  CollectCondition,
  isAccessConditionType,
  LitAccessControlCondition,
  LitNestedAccessControlCondition,
} from './types';
import { insertObjectInBetweenArrayElements } from './utils';

type UnwrapMaybe<T extends Maybe<unknown>> = T extends Maybe<infer V> ? NonNullable<V> : never;

type KeyValuePairs<T> = {
  [K in keyof T]: T[K] extends null | undefined ? never : [K, UnwrapMaybe<T[K]>];
};

type Values<T> = T extends { [s: string]: infer V } ? V[] : never;

type Entry<T> = Values<KeyValuePairs<T>>[number];

function extractConditionEntry<T extends AccessCondition>(condition: T): Entry<T> {
  for (const key in condition) {
    if (isAccessConditionType(key) && isNonNullable(condition[key as keyof AccessCondition])) {
      return [key, condition[key] ?? never()];
    }
  }
  throw new InvariantError('Invalid access condition');
}

function flatten<T>(conditions: T[]): T[] {
  // boolean transform supports one level of nesting
  return conditions.reduce((acc, val) => {
    if (Array.isArray(val) && val.length === 1) {
      return acc.concat(val);
    } else {
      // handle nested conditions
      acc.push(val);
      return acc;
    }
  }, [] as T[]);
}

function transformSimpleCondition(
  [type, value]: Entry<AccessCondition>,
  env: EnvironmentConfig,
): LitNestedAccessControlCondition<LitAccessControlCondition> {
  switch (type) {
    case AccessConditionType.Eoa:
      return transformEoaCondition(value);
    case AccessConditionType.Token:
      return transformErc20Condition(value);
    case AccessConditionType.Nft:
      return transformNftCondition(value);
    case AccessConditionType.Profile:
      return transformProfileCondition(value, env);
    case AccessConditionType.Collect:
      return transformCollectCondition(value as CollectCondition, env);
    case AccessConditionType.Follow:
      return transformFollowCondition(value, env);
    default:
      throw new InvariantError(`Unknown access criteria type: ${String(type)}`);
  }
}

function transformCompoundCondition(
  entry: Entry<AccessCondition>,
  env: EnvironmentConfig,
): LitNestedAccessControlCondition<LitAccessControlCondition> {
  if (entry[0] === AccessConditionType.And || entry[0] === AccessConditionType.Or) {
    const flat = flatten(
      entry[1].criteria.map((criterion) =>
        transformCompoundCondition(extractConditionEntry(criterion), env),
      ),
    );
    return insertObjectInBetweenArrayElements(flat, { operator: entry[0] });
  }
  return transformSimpleCondition(entry, env);
}

export function transform(
  condition: AccessCondition,
  env: EnvironmentConfig,
): LitNestedAccessControlCondition<LitAccessControlCondition> {
  return transformCompoundCondition(extractConditionEntry(condition), env);
}
