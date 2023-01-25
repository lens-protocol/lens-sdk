import {
  PublicationContentWarning,
  PublicationMainFocus,
  PublicationMetadataFilters,
} from '@lens-protocol/api-bindings';

export type StandardPublicationMetadataFilter = {
  restrictPublicationMainFocusTo?: PublicationMainFocus[];
  restrictPublicationTagsTo?: {
    all?: string[];
    oneOf?: string[];
  };
  restrictPublicationLocaleTo?: string;
  showPublicationsWithContentWarnings?: {
    oneOf?: PublicationContentWarning[];
  };
};

export function createPublicationMetadataFilters(
  standardFilters: StandardPublicationMetadataFilter | undefined,
): PublicationMetadataFilters | undefined {
  if (!standardFilters) {
    return undefined;
  }

  return {
    locale: standardFilters.restrictPublicationLocaleTo,
    mainContentFocus: standardFilters.restrictPublicationMainFocusTo,
    tags: standardFilters.restrictPublicationTagsTo,
    ...(!!standardFilters.showPublicationsWithContentWarnings?.oneOf && {
      contentWarnings: {
        includeOneOf: standardFilters.showPublicationsWithContentWarnings.oneOf,
      },
    }),
  };
}

export type { PublicationMainFocus, PublicationContentWarning };
