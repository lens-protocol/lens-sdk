import { PublicationContentWarning, PublicationMainFocus } from '@lens-protocol/api-bindings';

export type PublicationFilters = {
  restrictPublicationMainFocusTo?: PublicationMainFocus[];
  restrictPublicationTagsTo?: {
    all?: string[];
    oneOf?: string[];
  };
  showPublicationsWithContentWarnings?: {
    oneOf?: PublicationContentWarning[];
  };
};

export type { PublicationMainFocus, PublicationContentWarning };
