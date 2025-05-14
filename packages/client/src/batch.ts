import type { StandardData } from '@lens-protocol/graphql';
import type { AnyVariables } from '@lens-protocol/graphql';
import { Deferred, ResultAsync, invariant, never } from '@lens-protocol/types';
import type { TypedDocumentNode } from '@urql/core';
import {
  type DocumentNode,
  type FieldNode,
  type FragmentDefinitionNode,
  Kind,
  type OperationDefinitionNode,
  OperationTypeNode,
  type VariableDefinitionNode,
  visit,
} from 'graphql';

import { UnexpectedError } from './errors';

interface StoredQuery<TValue, TVariables extends AnyVariables> {
  alias: string;
  document: TypedDocumentNode<StandardData<TValue>, TVariables>;
  variables: AnyVariables;
  deferred: Deferred<TValue>;
}

export type BatchQueryData = Record<string, unknown>;

export class BatchQueryBuilder {
  // biome-ignore lint/suspicious/noExplicitAny: intentional due to the etherogenous nature of the queries
  private queries: StoredQuery<any, any>[] = [];

  addQuery = <TValue, TVariables extends AnyVariables>(
    document: TypedDocumentNode<StandardData<TValue>, TVariables>,
    variables: TVariables,
  ): ResultAsync<TValue, UnexpectedError> => {
    invariant(this.queries.length < 10, 'Batch queries supports a maximum of 10 queries');

    const alias = `value_${this.queries.length}`;
    const deferred = new Deferred<TValue>();

    this.queries.push({ alias, document, variables, deferred });

    return ResultAsync.fromPromise(deferred.promise, (err) => {
      if (UnexpectedError.is(err)) {
        return err;
      }
      return UnexpectedError.from(err);
    });
  };

  build<TVariables extends AnyVariables>(): [
    TypedDocumentNode<BatchQueryData, TVariables>,
    TVariables,
  ] {
    const allFragments: Map<string, FragmentDefinitionNode> = new Map();
    const selections: FieldNode[] = [];
    const variableDefinitions: VariableDefinitionNode[] = [];
    const mergedVariables: AnyVariables = {};

    let varId = 0;
    for (const { alias, document, variables } of this.queries) {
      const [operation, fragments] = extractQueryParts(document);

      for (const fragment of fragments) {
        const name = fragment.name.value;
        if (!allFragments.has(name)) {
          allFragments.set(name, fragment);
        }
      }

      const varMapping = new Map<string, string>();
      const localDefs =
        operation.variableDefinitions?.map((v): VariableDefinitionNode => {
          const newVarName = `${v.variable.name.value}_${varId++}`;
          varMapping.set(v.variable.name.value, newVarName);

          mergedVariables[newVarName] = variables[v.variable.name.value] ?? never();

          return {
            ...v,
            variable: {
              ...v.variable,
              name: { kind: Kind.NAME, value: newVarName },
            },
          };
        }) ?? [];

      variableDefinitions.push(...localDefs);

      const rewritten = visit(operation.selectionSet, {
        Variable(node) {
          const renamed = varMapping.get(node.name.value);
          if (!renamed) return node;
          return {
            ...node,
            name: { kind: Kind.NAME, value: renamed },
          };
        },
        Field(node) {
          return {
            ...node,
            alias: { kind: Kind.NAME, value: alias },
          };
        },
      });

      selections.push(...(rewritten.selections as FieldNode[]));
    }

    const mergedOperation: OperationDefinitionNode = {
      kind: Kind.OPERATION_DEFINITION,
      operation: OperationTypeNode.QUERY,
      variableDefinitions,
      selectionSet: {
        kind: Kind.SELECTION_SET,
        selections,
      },
    };

    const mergedDocument: DocumentNode = {
      kind: Kind.DOCUMENT,
      definitions: [mergedOperation, ...allFragments.values()],
    };
    return [mergedDocument, mergedVariables as TVariables];
  }

  resolve(data: BatchQueryData) {
    for (const { alias, deferred } of this.queries) {
      if (Object.prototype.hasOwnProperty.call(data, alias) && data[alias] !== undefined) {
        deferred.resolve(data[alias]);
      } else {
        deferred.reject(
          UnexpectedError.from(
            `Missing response data for query alias "${alias}". Please report this issue to the Lens team.`,
          ),
        );
      }
    }
  }
}

function extractQueryParts(
  document: TypedDocumentNode<StandardData<unknown>>,
): [OperationDefinitionNode, FragmentDefinitionNode[]] {
  let operation: OperationDefinitionNode | undefined;
  const fragments: FragmentDefinitionNode[] = [];
  for (const definition of document.definitions) {
    switch (definition.kind) {
      case Kind.OPERATION_DEFINITION:
        invariant(
          definition.operation === OperationTypeNode.QUERY,
          'Only query operations are supported',
        );
        invariant(operation === undefined, 'Only one operation definition is supported');

        operation = definition;
        break;

      case Kind.FRAGMENT_DEFINITION:
        fragments.push(definition);
        break;

      default:
        never(`Unexpected definition kind: ${definition.kind}`);
    }
  }

  invariant(operation, 'No operation definition found in the document');

  return [operation, fragments];
}
