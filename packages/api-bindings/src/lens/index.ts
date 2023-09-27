import { StoreValue } from '@apollo/client';

import { PaginatedResultInfo } from './graphql/generated';

export * from './ContentInsight';
export * from './Cursor';
export * from './graphql/generated';
export type {
  Digit,
  ImageSizeTransform,
  MediaTransformParams, // overwrite the generated one
  Percentage,
  Pixel,
} from './ImageSizeTransform';
export * from './utils';

export type CursorBasedPaginatedResult<T = StoreValue> = {
  items: T[];
  pageInfo: PaginatedResultInfo;
};
