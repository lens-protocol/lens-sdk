import { OnchainReferrer, isPublicationId } from '@lens-protocol/api-bindings';
import { Referrers } from '@lens-protocol/domain/use-cases/publications';

export function resolveOnchainReferrers(
  referrers: Referrers | undefined,
): OnchainReferrer[] | undefined {
  return referrers?.map((value) => {
    if (isPublicationId(value)) {
      return {
        publicationId: value,
      };
    }
    return {
      profileId: value,
    };
  });
}
