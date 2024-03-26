import { Profile, isPrimaryPublication, resolveReferencePolicy } from '@lens-protocol/api-bindings';
import { PublicationId, isMomokaPublicationId } from '@lens-protocol/domain/entities';
import {
  OpenActionConfig,
  ReferencePolicyConfig,
  ReferencePolicyType,
} from '@lens-protocol/domain/use-cases/publications';
import { invariant } from '@lens-protocol/shared-kernel';

import { useLazyPublication } from '../../publication';
import { useSharedDependencies } from '../../shared';
import { extractUnknownModuleConfigAddresses } from './modules';
import { useExecutionMode, TransactionExecutionMode } from './useExecutionMode';

export type ReferenceExecutionModeArgs = {
  author: Profile;
  referencedPublicationId: PublicationId;
  actions?: OpenActionConfig[];
  reference?: ReferencePolicyConfig;
  sponsored?: boolean;
};

export function useReferenceExecutionMode() {
  const { config } = useSharedDependencies();
  const { execute: fetch } = useLazyPublication();
  const resolve = useExecutionMode();

  return async ({
    actions,
    author,
    reference,
    referencedPublicationId,
    sponsored,
  }: ReferenceExecutionModeArgs): Promise<TransactionExecutionMode> => {
    if (isMomokaPublicationId(referencedPublicationId)) {
      return {
        signless: author.signless,
        sponsored: true,
      };
    }

    if (sponsored === false) {
      return { signless: false, sponsored: false };
    }

    if (config.sponsored === false) {
      return { signless: false, sponsored: false };
    }

    const result = await fetch({ forId: referencedPublicationId });

    const publication = result.unwrap();

    invariant(
      isPrimaryPublication(publication),
      `Referenced publication ${referencedPublicationId} is not a primary publication: ${publication.__typename}`,
    );

    const referencePolicy = resolveReferencePolicy(publication);

    if (referencePolicy.type === ReferencePolicyType.UNKNOWN) {
      if (!referencePolicy.sponsoredApproved) {
        return { signless: false, sponsored: false };
      }
    }

    return resolve({
      author,
      unknownModules: extractUnknownModuleConfigAddresses({ actions, reference }),
    });
  };
}
