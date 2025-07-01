import type { FragmentOf } from 'gql.tada';
import { graphql } from '../graphql';

export const MediaAudioFragment = graphql(
  `fragment MediaAudio on MediaAudio {
    __typename
    artist
    cover
    credits
    duration
    genre
    item
    kind
    license
    lyrics
    recordLabel
    type
    title
    durationSeconds
  }`,
);
export interface MediaAudio extends FragmentOf<typeof MediaAudioFragment> {}

export const MediaImageFragment = graphql(
  `fragment MediaImage on MediaImage {
    __typename
    altTag
    item
    license
    type
    width
    height
  }`,
);
export interface MediaImage extends FragmentOf<typeof MediaImageFragment> {}

export const MediaVideoFragment = graphql(
  `fragment MediaVideo on MediaVideo {
    __typename
    altTag
    cover
    duration
    item
    license
    type
    durationSeconds
    width
    height
  }`,
);
export interface MediaVideo extends FragmentOf<typeof MediaVideoFragment> {}

export const AnyMediaFragment = graphql(
  `fragment AnyMedia on AnyMedia {
      ... on MediaAudio {
        ...MediaAudio
      }
      ... on MediaImage {
        ...MediaImage
      }
      ... on MediaVideo {
        ...MediaVideo
      }
    }
  `,
  [MediaAudioFragment, MediaImageFragment, MediaVideoFragment],
);
export type AnyMedia = FragmentOf<typeof AnyMediaFragment>;
