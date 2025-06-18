import type { AnyVariables, StandardData } from '@lens-protocol/graphql';
import { invariant } from '@lens-protocol/types';
import { useMemo } from 'react';
import { type TypedDocumentNode, useQuery } from 'urql';
import { ReadResult, type SuspendableResult } from './results';

/**
 * @internal
 */
export type Suspendable = { suspense: true };

/**
 * @internal
 */
export type UseSuspendableQueryArgs<Value, Variables extends AnyVariables> = {
  document: TypedDocumentNode<StandardData<Value>, Variables>;
  variables: Variables;
  suspense: boolean;
};

/**
 * @internal
 */
export function useSuspendableQuery<Value, Variables extends AnyVariables>({
  document,
  variables,
  suspense,
}: UseSuspendableQueryArgs<Value, Variables>): SuspendableResult<Value> {
  const [{ data, fetching, error }] = useQuery({
    query: document,
    variables,
    context: useMemo(() => ({ suspense }), [suspense]),
  });

  if (fetching) {
    return ReadResult.Initial();
  }

  if (error) {
    // biome-ignore lint/suspicious/noExplicitAny: temporary workaround
    return ReadResult.Failure(error) as any;
  }

  invariant(data, 'No data returned');

  return ReadResult.Success(data.value);
}
