import {
  PublicationContentWarning,
  PublicationMainFocus,
  PublicationMetadataFilters as LensPublicationMetadataFilters,
} from '@lens-protocol/api-bindings';

export type PublicationMetadataFilters = {
  restrictPublicationMainFocusTo?: PublicationMainFocus[];
  restrictPublicationLocaleTo?: string;
  showPublicationsWithContentWarnings?: {
    oneOf: PublicationContentWarning[];
  };
  restrictPublicationTagsTo?:
    | {
        all: string[];
      }
    | {
        oneOf: string[];
      };
};

export function createPublicationMetadataFilters(
  filters: PublicationMetadataFilters | undefined,
): LensPublicationMetadataFilters | undefined {
  if (!filters) {
    return undefined;
  }

  return {
    locale: filters.restrictPublicationLocaleTo,
    mainContentFocus: filters.restrictPublicationMainFocusTo,
    tags: filters.restrictPublicationTagsTo,
    ...(!!filters.showPublicationsWithContentWarnings?.oneOf && {
      contentWarnings: {
        includeOneOf: filters.showPublicationsWithContentWarnings.oneOf,
      },
    }),
  };
}

export type { PublicationMainFocus, PublicationContentWarning };
