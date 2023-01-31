# @lens-protocol/react

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
