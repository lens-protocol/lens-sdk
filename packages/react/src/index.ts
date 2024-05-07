/**
 * The official Lens Protocol bindings for React applications.
 *
 * This package enables you to build applications on top of the Lens Protocol using React.
 *
 * **Note**
 *
 * This is a low-level package, if you are building a web application you might want to look into `@lens-protocol/react-web` package instead.
 *
 * @module
 */

/**
 * Components
 */
export * from './BaseProvider';

/**
 * Hooks
 */
export * from './authentication';
export * from './discovery';
export * from './experimental';
export * from './misc';
export * from './notifications';
export * from './profile';
export * from './publication';
export * from './revenue';
export * from './transactions';
export * from './wallet';

/**
 * Domain essentials
 */
export type { AppId, ProfileId, PublicationId } from '@lens-protocol/domain/entities';
export { Amount, ChainType, erc20, fiat, ether, matic } from '@lens-protocol/shared-kernel';
export type {
  AmountValue,
  Asset,
  BigDecimal,
  CryptoAmount,
  CryptoAsset,
  CryptoNativeAmount,
  CryptoNativeAsset,
  Data,
  Erc20,
  Erc20Amount,
  Erc20Info,
  Ether,
  EvmAddress,
  Failure,
  Fiat,
  FiatAmount,
  IEquatableError,
  Kind,
  Matic,
  NativeType,
  PromiseResult,
  Result,
  Success,
  URI,
  URL,
} from '@lens-protocol/shared-kernel';

/**
 * Config
 */
export * from './chains';
export * from './config';
export * from './environments';

/**
 * Hooks helpers types
 */
export type {
  PaginatedArgs,
  PaginatedReadResult,
  ReadResult,
  ReadResultWithError,
  ReadResultWithoutError,
} from './helpers/reads';
export type {
  SuspendablePaginatedResult,
  SuspenseEnabled,
  SuspensePaginatedResult,
  SuspenseReadResult,
  SuspenseResult,
  SuspenseResultWithError,
} from './helpers/suspense';
export * from './helpers/tasks';

/**
 * GQL common types
 */
export type {
  App,
  ImageSizeTransform,
  ImageTransform,
  NetworkAddress,
  OptimisticStatusResult,
} from '@lens-protocol/api-bindings';

// GQL enums
export {
  CollectOpenActionModuleType,
  CommentRankingFilterType,
  ComparisonOperatorConditionType,
  CustomFiltersType,
  DecryptFailReasonType,
  ExploreProfilesOrderByType,
  ExplorePublicationsOrderByType,
  ExplorePublicationType,
  FeedEventItemType,
  FollowModuleType,
  HiddenCommentsType,
  LimitType,
  ManagedProfileVisibility,
  MarketplaceMetadataAttributeDisplayType,
  MetadataAttributeType,
  ModuleType,
  NftContractType,
  NotificationType,
  OpenActionCategoryType,
  OpenActionModuleType,
  ProfileActionHistoryType,
  ProfileInterestTypes,
  ProfilesOrderBy,
  PublicationContentWarningType,
  PublicationMetadataLicenseType,
  PublicationMetadataMainFocusType,
  PublicationMetadataTransactionType,
  PublicationReactionType,
  PublicationType,
  SearchPublicationType,
  TriStateValue,
} from '@lens-protocol/api-bindings';

/**
 * Common errors
 */
export { UnspecifiedError } from '@lens-protocol/api-bindings';
export {
  InsufficientGasError,
  PendingSigningRequestError,
  TransactionError,
  UserRejectedError,
  WalletConnectionError,
  TransactionErrorReason,
  WalletConnectionErrorReason,
} from '@lens-protocol/domain/entities';
export {
  BroadcastingError,
  BroadcastingErrorReason,
} from '@lens-protocol/domain/use-cases/transactions';
export { ClaimHandleError } from '@lens-protocol/domain/use-cases/profile';
export {
  InsufficientAllowanceError,
  InsufficientFundsError,
  WalletAlreadyInvitedError,
} from '@lens-protocol/domain/use-cases/wallets';
export { InvariantError } from '@lens-protocol/shared-kernel';
export { NotFoundError } from './NotFoundError';

/**
 * Helpers
 */
export { erc20Amount, fiatAmount } from '@lens-protocol/api-bindings';
export * from './ConsoleLogger';
export { useSharedDependencies } from './shared';
export * from './utils';
