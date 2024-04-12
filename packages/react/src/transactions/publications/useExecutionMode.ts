import { Profile, isPrimaryPublication, resolveReferencePolicy } from '@lens-protocol/api-bindings';
import { PublicationId, isMomokaPublicationId } from '@lens-protocol/domain/entities';
import {
  OpenActionConfig,
  ReferencePolicyConfig,
  ReferencePolicyType,
} from '@lens-protocol/domain/use-cases/publications';
import { invariant } from '@lens-protocol/shared-kernel';

import { NotFoundError } from '../../NotFoundError';
import { useLazyModuleMetadata } from '../../misc';
import { useLazyPublication } from '../../publication';
import { useSharedDependencies } from '../../shared';
import { extractUnknownModuleConfigAddresses } from './modules';

export type TransactionExecutionMode =
  | {
      signless: false;
      sponsored: false;
    }
  | {
      signless: boolean;
      sponsored: true;
    };

export type ExecutionModeArgs = {
  author: Profile;
  referencedPublicationId?: PublicationId;
  actions?: OpenActionConfig[];
  reference?: ReferencePolicyConfig;
  sponsored?: boolean;
};

export function useExecutionMode() {
  const { config } = useSharedDependencies();
  const { execute: fetchPublication } = useLazyPublication();
  const { execute: fetchModuleMetadata } = useLazyModuleMetadata();

  return async ({
    actions,
    author,
    reference,
    referencedPublicationId,
    sponsored,
  }: ExecutionModeArgs): Promise<TransactionExecutionMode> => {
    if (sponsored === false) {
      return { signless: false, sponsored: false };
    }

    if (config.sponsored === false) {
      return { signless: false, sponsored: false };
    }

    if (referencedPublicationId && isMomokaPublicationId(referencedPublicationId)) {
      return {
        signless: author.signless,
        sponsored: true,
      };
    }

    if (referencedPublicationId) {
      const result = await fetchPublication({ forId: referencedPublicationId });

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
    }

    const unknownModules = extractUnknownModuleConfigAddresses({ actions, reference });

    const results = await Promise.all(
      unknownModules.map((implementation) => fetchModuleMetadata({ implementation })),
    );

    const desired: TransactionExecutionMode = author.sponsor
      ? {
          signless: author.signless,
          sponsored: true,
        }
      : {
          signless: false,
          sponsored: false,
        };

    for (const result of results) {
      if (result.isFailure()) {
        if (result.error instanceof NotFoundError) {
          // if the module is not registered, opt for non-sponsored tx
          return {
            ...desired,
            sponsored: false,
            signless: false,
          };
        }
        throw result.error;
      }
      const { sponsoredApproved } = result.value; // ignore signlessApproved for now

      if (!sponsoredApproved) {
        return {
          ...desired,
          sponsored: false,
          signless: false,
        };
      }

      return {
        ...desired,
        sponsored: true,
      };
    }

    return desired;
  };
}
