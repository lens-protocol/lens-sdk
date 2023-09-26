import { FeedEventItemType as LensFeedEventItemType } from '@lens-protocol/api-bindings';

export enum FeedEventItemType {
  Comment = LensFeedEventItemType.Comment,
  Post = LensFeedEventItemType.Post,
  Mirror = LensFeedEventItemType.Mirror,
  CollectComment = LensFeedEventItemType.CollectComment,
  CollectPost = LensFeedEventItemType.CollectPost,
}
