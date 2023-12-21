/**
 * @module Core
 *
 * @example
 * Development example:
 * ```ts
 * import { LensClient, development } from '@lens-protocol/client';
 *
 * const client = new LensClient({
 *   environment: development
 * });
 * ```
 *
 * @example
 * Production example:
 * ```ts
 * import { LensClient, production } from '@lens-protocol/client';
 *
 * const client = new LensClient({
 *   environment: production
 * });
 * ```
 *
 * @example
 * Use [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) to persist authentication state:
 * ```ts
 * const client = new LensClient({
 *   environment: production,
 *
 *   storage: window.localStorage,
 * });
 * ```
 */

export * from './LensClient';
export * from './environments';
export * from './errors';
export * from './graphql';
export * from './authentication';
export * from './submodules';

// types
export type {
  Cast,
  EvmAddress,
  Failure,
  IEquatableError,
  InvariantError,
  Narrow,
  Prettify,
  Primitive,
  PromiseResult,
  Result,
  Success,
} from '@lens-protocol/shared-kernel';
export type { IStorageProvider, InMemoryStorageProvider } from '@lens-protocol/storage';
export type { TypedData, TypedDataResponse } from './types';
export type { LensContext, MediaTransformsConfig } from './context';
export type { PaginatedResult, PaginatedQueryData } from './helpers/buildPaginatedQueryResult';
