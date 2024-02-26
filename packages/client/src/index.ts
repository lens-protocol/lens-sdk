/**
 * The primary entry point of the `@lens-protocol/client` package.
 *
 * See {@link Gated} for token-gated support.
 *
 * @module Core
 */

export * from './LensClient';
export * from './authentication';
export * from './environments';
export * from './errors';
export * from './graphql';
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
export type { PaginatedQueryData, PaginatedResult } from './helpers/buildPaginatedQueryResult';
export type { AppId, QueryParams } from './queryParams';
export type { TypedData, TypedDataResponse } from './types';
