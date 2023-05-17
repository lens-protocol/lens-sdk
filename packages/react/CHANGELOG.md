# @lens-protocol/react

## 1.1.0

### Minor Changes

- 03a8ad5d: Deprecated publication's isOptimisticMirroredByMe property, introduced isMirroredByMe
- 513373d3: Enhanced publication's hasCollectedByMe to replace deprecated hasOptimisticCollectedByMe property
- c416a2ea: **Added:** self-fund protocol calls when subsidized approaches fails
  **Fixed:** ensures correct chain when signing typed data
  **Fixed:** network switch in wagmi bindings
- cf4a4201: Added support for cover and `altTag` in publication media attributes
- ef1d7e28: Added Momoka support to React hooks

### Patch Changes

- 1d5cf31b: Fixed create mirror commit phase so to update the correct publication in cache
- 72becec0: **Fixed** documentation for `useuseActiveProfileSwitch` and `useProfilesOwnedByMe` hooks
- ca9b8cb0: **Fixes** export of `NotificationTypes`
- 04647bbe: **Fixed** issue preventing query hook from detecting active profile changes
- b738abbe: Fixed `useCreatePost`, `useCreateComment`, `useCreateEncryptedPost`, and `useCreateEncryptedComment` callback argument
- 71196cf0: Added support for more metadata fields in create publication hooks
- c4e6fcfc: **Fixes** `CollectType`, `NftAttributeDisplayType`, `ReferencePolicyType` not exported as values
- Updated dependencies [03a8ad5d]
- Updated dependencies [513373d3]
- Updated dependencies [04647bbe]
- Updated dependencies [c416a2ea]
- Updated dependencies [ef1d7e28]
- Updated dependencies [b738abbe]
- Updated dependencies [71196cf0]
  - @lens-protocol/api-bindings@0.8.0
  - @lens-protocol/blockchain-bindings@0.8.0
  - @lens-protocol/shared-kernel@0.8.0
  - @lens-protocol/domain@0.8.0
  - @lens-protocol/gated-content@0.2.2
  - @lens-protocol/storage@0.7.2

## 1.1.0-next.3

### Patch Changes

- 1d5cf31: Fixed create mirror commit phase so to update the correct publication in cache

## 1.1.0-next.2

### Minor Changes

- ef1d7e2: Added Momoka support to React hooks

### Patch Changes

- Updated dependencies [ef1d7e2]
  - @lens-protocol/api-bindings@0.8.0-next.2
  - @lens-protocol/domain@0.8.0-next.2
  - @lens-protocol/gated-content@0.2.2-next.2
  - @lens-protocol/blockchain-bindings@0.8.0-next.2

## 1.1.0-next.1

### Minor Changes

- 03a8ad5: Deprecated publication's `isOptimisticMirroredByMe` property, introduced `isMirroredByMe`

### Patch Changes

- ca9b8cb: **Fixes** export of `NotificationTypes`
- 71196cf: Added support for more metadata fields in create publication hooks
- Updated dependencies [03a8ad5]
- Updated dependencies [71196cf]
  - @lens-protocol/api-bindings@0.8.0-next.1
  - @lens-protocol/domain@0.8.0-next.1
  - @lens-protocol/gated-content@0.2.2-next.1
  - @lens-protocol/blockchain-bindings@0.8.0-next.1

## 1.1.0-next.0

### Minor Changes

- 513373d3: Enhanced publication's hasCollectedByMe to replace deprecated hasOptimisticCollectedByMe property
- c416a2ea:
  - **Added:** self-fund protocol calls when subsidized approaches fails
  - **Fixed:** ensures correct chain when signing typed data
  - **Fixed:** network switch in wagmi bindings
- cf4a4201: Added support for cover and altTag in publication media attributes

### Patch Changes

- 72becec0: **Fixed** documentation for `useuseActiveProfileSwitch` and `useProfilesOwnedByMe` hooks
- 04647bbe: **Fixed** issue preventing query hook from detecting active profile changes
- c4e6fcfc: **Fixes** `CollectType`, `NftAttributeDisplayType`, `ReferencePolicyType` not exported as values
- Updated dependencies [513373d3]
- Updated dependencies [04647bbe]
- Updated dependencies [c416a2ea]
  - @lens-protocol/api-bindings@0.8.0-next.0
  - @lens-protocol/blockchain-bindings@0.8.0-next.0
  - @lens-protocol/shared-kernel@0.8.0-next.0
  - @lens-protocol/domain@0.8.0-next.0
  - @lens-protocol/gated-content@0.2.2-next.0
  - @lens-protocol/storage@0.7.2-next.0

## 1.0.1

### Patch Changes

- 425daba: **Fixed** 1.0.0 release packages bundles
- Updated dependencies [425daba]
  - @lens-protocol/api-bindings@0.7.1
  - @lens-protocol/blockchain-bindings@0.7.1
  - @lens-protocol/domain@0.7.1
  - @lens-protocol/gated-content@0.2.1
  - @lens-protocol/shared-kernel@0.7.1
  - @lens-protocol/storage@0.7.1

## 1.0.0

### Minor Changes

- c5dd99b: Changed arguments of `execute` method returned from `useCreateProfile` hook
- 37eaf8a: Added TSDoc, use shared tsconfig, better types

### Patch Changes

- fce5b18: Added support for new collect modules: multirecipientFeeCollectModule, erc4626FeeCollectModule, aaveFeeCollectModule
- 520a7c1: Changed GQL generated types so that Fragment suffix is no longer necessary
  - Added several missing TS type definitions
  - Added TSDoc comments to several APIs
- 0f20b5a: Changed storage keys so use environment name as namespace
- 006aff5: Fixed bug with schema validation for Date in NftAttribute
- 0f20b5a: Changed env config variables to be `development` and `production`
- a4e9500: allow to define sortCriteria for useExploreProfiles
- Updated dependencies [6ae90ef]
- Updated dependencies [0f20b5a]
- Updated dependencies [37eaf8a]
- Updated dependencies [0f20b5a]
- Updated dependencies [a4e9500]
  - @lens-protocol/api-bindings@0.7.0
  - @lens-protocol/gated-content@0.2.0
  - @lens-protocol/blockchain-bindings@0.7.0
  - @lens-protocol/shared-kernel@0.7.0
  - @lens-protocol/storage@0.7.0
  - @lens-protocol/domain@0.7.0

## 1.0.0-beta.1

### Patch Changes

- 0f20b5a: Changed storage keys so use environment name as namespace
- 0f20b5a: Changed env config variables to be `development` and `production`
- Updated dependencies [0f20b5a]
- Updated dependencies [0f20b5a]
  - @lens-protocol/gated-content@0.2.0-beta.1

## 1.0.0-beta.0

### Minor Changes

- c5dd99b: Changed arguments of `execute` method returned from `useCreateProfile` hook
- dc1350d: Added TSDoc, use shared tsconfig, better types

### Patch Changes

- fce5b18: Added support for new collect modules: `multirecipientFeeCollectModule`, `erc4626FeeCollectModule`, `aaveFeeCollectModule`
- 520a7c1: Changed GQL generated types so that `Fragment` suffix is no longer necessary
- Added several missing TS type definitions
- Added TSDoc comments to several APIs
- 006aff5: Fixed bug with schema validation for `Date` in `NftAttribute`
- a4e9500: allow to define `sortCriteria` for `useExploreProfiles`
- Updated dependencies [6ae90ef]
- Updated dependencies [dc1350d]
- Updated dependencies [a4e9500]
  - @lens-protocol/api-bindings@0.7.0-beta.0
  - @lens-protocol/blockchain-bindings@0.7.0-beta.0
  - @lens-protocol/gated-content@0.2.0-beta.0
  - @lens-protocol/shared-kernel@0.7.0-beta.0
  - @lens-protocol/storage@0.7.0-beta.0
  - @lens-protocol/domain@0.7.0-beta.0

## 0.6.0

### Minor Changes

- 6be7f14: Added support for token gated post/comment using Lit Protocol.
- d153c2e: Updated all hooks/flow requiring `observerId` to automatically use Active Profile Id.
- 4475a27: Added appId to LensConfig. It is used when creating publications.

### Patch Changes

- Updated dependencies [4475a27]
  - @lens-protocol/domain@0.6.0
  - @lens-protocol/api-bindings@0.6.0
  - @lens-protocol/blockchain-bindings@0.6.0
  - @lens-protocol/gated-content@0.0.2
  - @lens-protocol/storage@0.6.0
  - @lens-protocol/shared-kernel@0.6.0

## 0.5.1

### Patch Changes

- 44596707: Fixed `TransactionQueue already initialized` console error in strict mode
- ed973b51: Added `electedMirror`, `mirrors`, `collects` and `reactions` to feed query
  - @lens-protocol/api-bindings@0.5.1
  - @lens-protocol/blockchain-bindings@0.5.1
  - @lens-protocol/domain@0.5.1
  - @lens-protocol/storage@0.5.1
  - @lens-protocol/shared-kernel@0.5.1

## 0.5.0

### Minor Changes

- 17646fff: Removed the need for `assertRequiredSigner` when returning the signer from `getSigner` (Used in <LensProvider/>)
- 95d905c5: Added `useProfilesOwnedByMe` hook
- 7124e4e6: Added `profilePublicationsForSale` hook
- b098c376: Added missing fields to `PublicationStats` and `ProfileStats`
- 30abfeec: Updated internal dependencies

### Patch Changes

- 99eb422e: Added `DecryptionCriteria` to `CommentFragment` and `PostFragment`
  - @lens-protocol/api-bindings@0.5.0
  - @lens-protocol/blockchain-bindings@0.5.0
  - @lens-protocol/domain@0.5.0
  - @lens-protocol/shared-kernel@0.5.0
  - @lens-protocol/storage@0.5.0

## 0.4.1

### Patch Changes

- 58c9d8e: Fixes the pagination support on the publication related queries
  - @lens-protocol/api-bindings@0.4.1
  - @lens-protocol/blockchain-bindings@0.4.1
  - @lens-protocol/domain@0.4.1
  - @lens-protocol/shared-kernel@0.4.1
  - @lens-protocol/storage@0.4.1

## 0.4.0

### Minor Changes

- b5350d9: Removed the `walletType` argument from the `login` method of `useWalletLogin` hook
- f0897b1: Added `useApproveModule` and internal toolings for EIP-1559 gas estimation
- 169352f: Added `metadataFilter` to `useFeed`, `useExplorePublications` and `useComments`.
- fa654d3: Added ability to collect a publication
- daad9ed: Added `useWhoMirroredPublication` hook

### Patch Changes

- de56baf: Added `IStorageProvider` `StorageSubscription` `StorageProviderSubscriber` and `IObservableStorageProvider` to the package exports

  Removed `IStorageProvider.subscribe` method (use `IObservableStorageProvider` when custom subscription logic is required)

  - @lens-protocol/api-bindings@0.4.0
  - @lens-protocol/blockchain-bindings@0.4.0
  - @lens-protocol/domain@0.4.0
  - @lens-protocol/shared-kernel@0.4.0
  - @lens-protocol/storage@0.4.0

## 0.3.0

### Minor Changes

- fc53150: Added `useProfilesOwnedBy` hook
- e830624: Removed `PendingSigningRequestError | UserRejectedError | WalletConnectionError` from `LensProvider` `onError` handler
  Changed `useWalletLogin` to return an object with `login`, `error` and `isPending` keys
  Changed `useWalletLogout` to return an object with `logout` and `isPending``
- 275f811: Added `useReportPublication` hook
- fb53a70: Added `useWhoCollectedPublication` hook
- b2c5ab5: Removes `Fields` suffix from GQL fragments type definitions
- 751d066: Added `useCreateMirror` hook
- c75bb6d: Added `useActiveProfileSwitcher`
- eb010f1: Added `useProfilePublicationRevenue` hook
- e6ba141: Added `useUpdateDispatcherConfig` hook
- cad27c4: Added `useHidePublication` hook
- b5c0427: Added ability to update profile follow policy
- 828089a: Added `useUpdateProfileImage` hook
- ab034e9: Added `RevenueAggregate.totalAmount: Amount<Erc20>`
- e3cc08e: Removed `totalCount` from paginated queries
- 2f15aa8: Added `useEnabledModules` hook
- 8bfd767: Added `isValidHandle` helper
- 1b3d049: Changed `useUpdatedProfileImage` to support dispatcher
- 6613321: Fixed duplicated `@apollo/client` package when using `pnpm` package manager
- 0236b7c: Changed return type of `useActiveWallet` hook.
- 422e571: Added capability to filter by event type in `useFeed` hook.
- bd33559: Fixed `usePublications` pagination support

### Patch Changes

- Updated dependencies
  - @lens-protocol/api-bindings@0.3.0
  - @lens-protocol/blockchain-bindings@0.3.0
  - @lens-protocol/domain@0.3.0
  - @lens-protocol/shared-kernel@0.3.0
  - @lens-protocol/storage@0.3.0

## 0.2.0

### Minor Changes

- 930d252: Added `useSearchProfiles` and `useSearchPublications` hooks
- 7b8e3f8: Added `useWhoReacted` hook
- c6a168e: Added `useCreateComment` hook
- 4e2b448: Added `useExplorePublications` hook
- 5f46cde: Added `useUnfollow` hook
- c89aed9: Added `useFollow` hook
- 1c607e2: Added `usePublicationRevenue` hook
- 2054ad6: Added `useProfileFollowRevenue` hook
- a921c32: Added `useReaction` hook

### Patch Changes

- Updated dependencies [930d252]
- Updated dependencies [7b8e3f8]
- Updated dependencies [4e2b448]
- Updated dependencies [5f46cde]
- Updated dependencies [c89aed9]
- Updated dependencies [1c607e2]
- Updated dependencies [a921c32]
  - @lens-protocol/api-bindings@1.0.0
  - @lens-protocol/blockchain-bindings@1.0.0
  - @lens-protocol/shared-kernel@1.0.0
  - @lens-protocol/domain@1.0.0
  - @lens-protocol/storage@1.0.0

## 0.1.1

### Patch Changes

- e8c5846: Fixes @lens-protocol/react/web exports config.
  - @lens-protocol/api-bindings@0.1.1
  - @lens-protocol/domain@0.1.1
  - @lens-protocol/shared-kernel@0.1.1
  - @lens-protocol/storage@0.1.1

## 0.1.0

First developer preview release

- feat: authentication w/ transparent token renewal
- feat: React Hooks to:
  - fetch publications
  - fetch profiles
  - fetch followers/following
  - create post
  - fetch feed
  - notifications
