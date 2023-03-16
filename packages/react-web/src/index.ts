import { LensConfig, LensProvider, LensProviderProps } from './LensProvider';
import {
  UseCreateEncryptedCommentArgs,
  useCreateEncryptedComment,
} from './useCreateEncryptedComment';
import { UseCreateEncryptedPostArgs, useCreateEncryptedPost } from './useCreateEncryptedPost';
import { UseEncryptedPublicationArgs, useEncryptedPublication } from './useEncryptedPublication';

export * from '@lens-protocol/react';
// local exports takes priority over package exports, basically overriding the hooks with same names from @lens-protocol/react
// see https://github.com/systemjs/systemjs/issues/1031#issuecomment-171262430
export { LensProvider, useCreateEncryptedPost, useCreateEncryptedComment, useEncryptedPublication };
export type {
  LensConfig,
  LensProviderProps,
  UseCreateEncryptedPostArgs,
  UseCreateEncryptedCommentArgs,
  UseEncryptedPublicationArgs,
};
