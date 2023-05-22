import { LensConfig, LensProvider, LensProviderProps } from './LensProvider';
import {
  useConversations,
  UseConversationsArgs,
  useEnableConversations,
  UseEnableConversationsArgs,
} from './inbox';
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
  useConversations,
  useEnableConversations,
  // gated content
  useCreateEncryptedComment,
  useCreateEncryptedPost,
  useEncryptedPublication,
};
export type {
  LensConfig,
  LensProviderProps,
  // inbox
  UseConversationsArgs,
  UseEnableConversationsArgs,
  // gated content
  UseCreateEncryptedCommentArgs,
  UseCreateEncryptedPostArgs,
  UseEncryptedPublicationArgs,
};

// Shadows the types from @lens-protocol/react so that they cannot be used nor surfaced in reference docs for @lens-protocol/react-web
export type EncryptionConfig = never;
export type IStorageProvider = never;
export type IObservableStorageProvider = never;
