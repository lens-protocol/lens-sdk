import { invariant } from '@lens-protocol/types';
import type { AnyVariables, TypedDocumentNode } from '@urql/core';
import {
  type FragmentDefinitionNode,
  type FragmentSpreadNode,
  Kind,
  type OperationDefinitionNode,
  type SelectionSetNode,
  visit,
} from 'graphql';
import type { Maybe } from 'graphql/jsutils/Maybe';
import type { ObjMap } from 'graphql/jsutils/ObjMap';

class FragmentDeduplicator<TResult, TVariables extends AnyVariables> {
  private _fragments: ObjMap<FragmentDefinitionNode> | undefined;
  private _fragmentSpreads: Map<SelectionSetNode, Array<FragmentSpreadNode>>;
  private _recursivelyReferencedFragments: Map<
    OperationDefinitionNode,
    Array<FragmentDefinitionNode>
  >;

  constructor(
    private readonly document: TypedDocumentNode<TResult, TVariables>,
  ) {
    this._fragmentSpreads = new Map();
    this._recursivelyReferencedFragments = new Map();
  }

  dedupe(): TypedDocumentNode<TResult, TVariables> {
    const operationDefs: Array<OperationDefinitionNode> = [];
    const fragmentDefs: Array<FragmentDefinitionNode> = [];

    const toRemove: Array<FragmentDefinitionNode> = [];

    visit(this.document, {
      OperationDefinition: (node) => {
        operationDefs.push(node);
        return false;
      },
      FragmentDefinition: (node) => {
        fragmentDefs.push(node);
        return false;
      },
      Document: {
        leave: () => {
          const fragmentNameUsed = Object.create(null);
          for (const operation of operationDefs) {
            for (const fragment of this.getRecursivelyReferencedFragments(
              operation,
            )) {
              fragmentNameUsed[fragment.name.value] = true;
            }
          }

          for (const fragmentDef of fragmentDefs) {
            const fragName = fragmentDef.name.value;
            if (fragmentNameUsed[fragName] !== true) {
              toRemove.push(fragmentDef);
            }
          }
        },
      },
    });

    return visit(this.document, {
      FragmentDefinition: (node) => {
        if (toRemove.indexOf(node) !== -1) {
          return null;
        }
        return node;
      },
    });
  }

  private getRecursivelyReferencedFragments(
    operation: OperationDefinitionNode,
  ): ReadonlyArray<FragmentDefinitionNode> {
    let fragments = this._recursivelyReferencedFragments.get(operation);
    if (!fragments) {
      fragments = [];
      const collectedNames = Object.create(null);
      const nodesToVisit: Array<SelectionSetNode> = [operation.selectionSet];
      let node: SelectionSetNode | undefined;
      // biome-ignore lint/suspicious/noAssignInExpressions: for now
      while ((node = nodesToVisit.pop())) {
        for (const spread of this.getFragmentSpreads(node)) {
          const fragName = spread.name.value;
          if (collectedNames[fragName] !== true) {
            collectedNames[fragName] = true;
            const fragment = this.getFragment(fragName);
            if (fragment) {
              fragments.push(fragment);
              nodesToVisit.push(fragment.selectionSet);
            }
          }
        }
      }
      this._recursivelyReferencedFragments.set(operation, fragments);
    }
    return fragments;
  }

  private getFragmentSpreads(
    node: SelectionSetNode,
  ): ReadonlyArray<FragmentSpreadNode> {
    let spreads = this._fragmentSpreads.get(node);
    if (!spreads) {
      spreads = [];
      const setsToVisit: Array<SelectionSetNode> = [node];
      let set: SelectionSetNode | undefined;
      // biome-ignore lint/suspicious/noAssignInExpressions: safe
      while ((set = setsToVisit.pop())) {
        for (const selection of set.selections) {
          if (selection.kind === Kind.FRAGMENT_SPREAD) {
            spreads.push(selection);
          } else if (selection.selectionSet) {
            setsToVisit.push(selection.selectionSet);
          }
        }
      }
      this._fragmentSpreads.set(node, spreads);
    }
    return spreads;
  }

  private getFragment(name: string): Maybe<FragmentDefinitionNode> {
    let fragments: ObjMap<FragmentDefinitionNode>;
    if (this._fragments) {
      fragments = this._fragments;
    } else {
      fragments = Object.create(null);
      for (const defNode of this.document.definitions) {
        if (defNode.kind === Kind.FRAGMENT_DEFINITION) {
          fragments[defNode.name.value] = defNode;
        }
      }
      this._fragments = fragments;
    }
    return fragments[name];
  }
}

/**
 * @internal
 */
export class FragmentResolver {
  private constructor(
    private readonly fragments: Map<string, FragmentDefinitionNode>,
  ) {}

  static from(nodes: TypedDocumentNode[]): FragmentResolver {
    const fragments = new Map<string, FragmentDefinitionNode>();

    for (const fragment of nodes) {
      for (const definition of fragment.definitions) {
        invariant(
          definition.kind === 'FragmentDefinition',
          `expected a fragment definition, got ${fragment.definitions[0]?.kind}`,
        );
        invariant(
          !fragments.has(definition.name.value),
          `Duplicate fragment detected. A fragment named "${definition.name.value}" has already been provided, either directly or as part of another fragment document.`,
        );
        fragments.set(definition.name.value, definition);
      }
    }

    return new FragmentResolver(fragments);
  }

  replaceFrom<TResult, TVariables extends AnyVariables>(
    document: TypedDocumentNode<TResult, TVariables>,
  ): TypedDocumentNode<TResult, TVariables> {
    const injected = visit(document, {
      FragmentDefinition: (node) => {
        if (this.fragments.has(node.name.value)) {
          return null;
        }
        return node;
      },
      Document: {
        leave: (node) => {
          return {
            ...node,
            definitions: [...node.definitions, ...this.fragments.values()],
          };
        },
      },
    });

    return new FragmentDeduplicator(injected).dedupe();
  }
}
