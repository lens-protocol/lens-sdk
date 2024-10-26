import type { ResultAsync } from 'neverthrow';

export type InferAsyncOkTypes<R> = R extends ResultAsync<infer T, unknown> ? T : never;

export type InferAsyncErrTypes<R> = R extends ResultAsync<unknown, infer E> ? E : never;
