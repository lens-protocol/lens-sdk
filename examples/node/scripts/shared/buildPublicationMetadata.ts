import {
  PublicationMainFocus,
  PublicationMetadataDisplayTypes,
  PublicationMetadataV2Input,
} from "@lens-protocol/client";
import { v4 } from "uuid";

export function buildPublicationMetadata(
  meta: Partial<PublicationMetadataV2Input> = {}
): PublicationMetadataV2Input {
  return {
    appId: "lenster",
    attributes: [
      {
        displayType: PublicationMetadataDisplayTypes.String,
        traitType: "Created with",
        value: "LensClient SDK",
      },
    ],
    content: "Post created with LensClient SDK",
    description: "Description of the post created with LensClient SDK",
    locale: "en-US",
    mainContentFocus: PublicationMainFocus.TextOnly,
    metadata_id: v4(),
    name: "Post created with LensClient SDK",
    tags: ["lens-sdk"],
    version: "2.0.0",
    ...meta,
  };
}
