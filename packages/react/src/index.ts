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
export type { AppId, NftId, ProfileId, PublicationId } from '@lens-protocol/domain/entities';
export {
  Amount,
  ChainType,
  WellKnownSymbols,
  erc20,
  ether,
  matic,
  usd,
} from '@lens-protocol/shared-kernel';
export type {
  AmountValue,
  Asset,
  BigDecimal,
  CryptoAmount,
  CryptoAsset,
  CryptoNativeAmount,
  CryptoNativeAsset,
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
  Url,
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
export * from './helpers/tasks';

/**
 * GQL common types
 */
export type { App } from '@lens-protocol/api-bindings';

// GQL enums
export {
  CommentRankingFilterType,
  ComparisonOperatorConditionType,
  CustomFiltersType,
  ExploreProfilesOrderByType,
  ExplorePublicationType,
  ExplorePublicationsOrderByType,
  FeedEventItemType,
  FollowModuleType,
  LimitType,
  MarketplaceMetadataAttributeDisplayType,
  NftContractType,
  NotificationType,
  OpenActionCategoryType,
  OpenActionModuleType,
  ProfileActionHistoryType,
  ProfileInterestTypes,
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
} from '@lens-protocol/domain/entities';
export {
  BroadcastingError,
  BroadcastingErrorReason,
} from '@lens-protocol/domain/use-cases/transactions';
export {
  InsufficientAllowanceError,
  InsufficientFundsError,
} from '@lens-protocol/domain/use-cases/wallets';
export { InvariantError } from '@lens-protocol/shared-kernel';
export { NotFoundError } from './NotFoundError';

/**
 * Helpers
 */
export { erc20Amount } from '@lens-protocol/api-bindings';
export * from './ConsoleLogger';
export { useSharedDependencies } from './shared';
export * from './utils';
