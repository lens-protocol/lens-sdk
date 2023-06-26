import { LensConfig, LensProvider, LensProviderProps } from './LensProvider';
import {
  UseCreateEncryptedCommentArgs,
  useCreateEncryptedComment,
} from './useCreateEncryptedComment';
import { UseCreateEncryptedPostArgs, useCreateEncryptedPost } from './useCreateEncryptedPost';
import { UseEncryptedPublicationArgs, useEncryptedPublication } from './useEncryptedPublication';

export * from '@lens-protocol/react';

// NOTE: local exports takes priority over package exports, basically overriding the hooks with same names from @lens-protocol/react
// see https://github.com/systemjs/systemjs/issues/1031#issuecomment-171262430
export { LensProvider, useCreateEncryptedPost, useCreateEncryptedComment, useEncryptedPublication };
export type {
  LensConfig,
  LensProviderProps,
  UseCreateEncryptedPostArgs,
  UseCreateEncryptedCommentArgs,
  UseEncryptedPublicationArgs,
};

// Shadows the types from @lens-protocol/react so that they cannot be used nor surfaced in reference docs for @lens-protocol/react-web
export type EncryptionConfig = never;
export type IStorageProvider = never;
export type IObservableStorageProvider = never;

// xmtp integration
export * from './inbox';
