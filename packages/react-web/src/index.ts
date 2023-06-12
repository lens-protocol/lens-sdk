import { LensConfig, LensProvider, LensProviderProps } from './LensProvider';
import { useEnableConversations } from './inbox/useEnableConversations';
import {
  UseCreateEncryptedCommentArgs,
  useCreateEncryptedComment,
} from './useCreateEncryptedComment';
import { UseCreateEncryptedPostArgs, useCreateEncryptedPost } from './useCreateEncryptedPost';
import { UseEncryptedPublicationArgs, useEncryptedPublication } from './useEncryptedPublication';

export * from '@lens-protocol/react';

// NOTE: local exports takes priority over package exports, basically overriding the hooks with same names from @lens-protocol/react
// see https://github.com/systemjs/systemjs/issues/1031#issuecomment-171262430
export {
  LensProvider,
  // inbox
  useEnableConversations,
  // gated content
  useCreateEncryptedComment,
  useCreateEncryptedPost,
  useEncryptedPublication,
};
export type {
  LensConfig,
  LensProviderProps,
  // gated content
  UseCreateEncryptedCommentArgs,
  UseCreateEncryptedPostArgs,
  UseEncryptedPublicationArgs,
};

// Shadows the types from @lens-protocol/react so that they cannot be used nor surfaced in reference docs for @lens-protocol/react-web
export type EncryptionConfig = never;
export type IStorageProvider = never;
export type IObservableStorageProvider = never;
