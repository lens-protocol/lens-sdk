import { DocumentNode } from '@apollo/client';
import { FragmentDefinitionNode, FragmentSpreadNode, visit } from 'graphql';

export function removeClientTypeFromExtendedUnion(
  fragmentName: string,
  doc: DocumentNode,
): DocumentNode {
  function enter(node: FragmentSpreadNode | FragmentDefinitionNode): null | void {
    if (fragmentName === node.name.value) {
      return null;
    }
  }

  return visit(doc, {
    InlineFragment: {
      enter: (node) => {
        if (node.typeCondition?.name.value === fragmentName) {
          return null;
        }
        return;
      },
    },
    FragmentSpread: { enter },
    FragmentDefinition: { enter },
  }) as DocumentNode; // 😞
}
