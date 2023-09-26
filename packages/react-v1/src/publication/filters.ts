import {
  PublicationContentWarning,
  PublicationMainFocus,
  PublicationMetadataFilters as LensPublicationMetadataFilters,
} from '@lens-protocol/api-bindings';

/**
 * Filter publications by some of their metadata fields.
 */
export type PublicationMetadataFilters = {
  restrictPublicationMainFocusTo?: PublicationMainFocus[];

  /**
   * A string that will be used to filter publications by their language and optionally regional dialect.
   *
   * It support a subset of the {@link https://www.rfc-editor.org/info/bcp47 | BCP-47} specification.
   *
   * You can specify a language restriction by providing the corresponding ISO 639-1 language code:
   *
   * @example
   * ```
   * en # English language from any region
   * it # Italian language from any region
   * ```
   *
   * You can also specify a language and region restriction by providing the corresponding ISO 639-1 language code and ISO 3166-1 alpha-2 region code:
   *
   * @example
   * ```
   * en-US # English language from the United States
   * en-GB # English language from the United Kingdom
   * ```
   */
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
