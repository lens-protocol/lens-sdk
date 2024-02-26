import { Reference } from '@apollo/client';

import { PaginatedResultInfo } from './graphql/generated';

export * from './graphql/generated';
export type {
  Digit,
  ImageSizeTransform,
  ImageTransform, // shadows the less type-safe generated ImageTransform
  Percentage,
  Pixel,
} from './ImageTransform';
export * from './variables';
export * from './utils';
export * from './publication';
export * from './FollowModule';
export * from './Cursor';
export * from './ReferenceModule';

export type CursorBasedPaginatedResult<T = Reference> = {
  items: T[];
  pageInfo: PaginatedResultInfo;
};
