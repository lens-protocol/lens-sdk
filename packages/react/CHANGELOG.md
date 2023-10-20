# @lens-protocol/react

## 2.0.0-alpha.12

### Patch Changes

- Update dependencies
- Updated dependencies
  - @lens-protocol/blockchain-bindings@0.10.0-alpha.8
  - @lens-protocol/api-bindings@0.11.0-alpha.12
  - @lens-protocol/domain@0.11.0-alpha.8

## 2.0.0-alpha.11

### Patch Changes

- Update dependencies
- Updated dependencies
  - @lens-protocol/api-bindings@0.11.0-alpha.11
  - @lens-protocol/domain@0.11.0-alpha.7
  - @lens-protocol/blockchain-bindings@0.10.0-alpha.7

## 2.0.0-alpha.10

### Minor Changes

- fa49d587: refactors hook arguments to be passed to the callback
- c09c5fdc: Added `useNotInterestedToggle` hook
- 0687207b: Added `useOwnedHandles` hook

### Patch Changes

- Updated dependencies [c09c5fdc]
- Updated dependencies [0687207b]
  - @lens-protocol/api-bindings@0.11.0-alpha.10

## 2.0.0-alpha.9

### Minor Changes

- cfc03dff: **feat:** implements `useOpenAction` hook
- 9481f48b: **feat:** implements `useApproveModule` hook. It also upgrades viem and wagmi peer deps.
- fca2473b: **feat:** implements `useLogout` hook
- 6ab0e99a: **Added** revenue hooks: useRevenueFromFollow, useRevenueFromPublication, useRevenueFromPublications
- cfc03dff: **feat:** implements experimental `useLazyPublication` hook
- bdf81299: implements `useBookmarkToggle`

### Patch Changes

- Updated dependencies [cfc03dff]
- Updated dependencies [9481f48b]
- Updated dependencies [6ab0e99a]
- Updated dependencies [bdf81299]
  - @lens-protocol/api-bindings@0.11.0-alpha.9
  - @lens-protocol/domain@0.11.0-alpha.6
  - @lens-protocol/shared-kernel@0.11.0-alpha.5
  - @lens-protocol/blockchain-bindings@0.10.0-alpha.6
  - @lens-protocol/storage@0.7.5-alpha.3

## 2.0.0-alpha.8

### Minor Changes

- 30ccf19d: **Added** useMyBookmarks hook
- a42e90e7: **Added** useSetProfileMetadata hook
- 9dd33b03:
  **Renamed** useFollowProfile to useFollow
  **Renamed** useUnfollowProfile to useUnfollow
  **Added** support for LensProfileManager to useFollow, useUnfollow and useUpdateFollowPolicy hooks

### Patch Changes

- 01b2c2cb: Updated to support the latest API schema
- Updated dependencies [30ccf19d]
- Updated dependencies [a42e90e7]
- Updated dependencies [9dd33b03]
- Updated dependencies [01b2c2cb]
  - @lens-protocol/api-bindings@0.11.0-alpha.8
  - @lens-protocol/domain@0.11.0-alpha.5
  - @lens-protocol/blockchain-bindings@0.10.0-alpha.5

## 2.0.0-alpha.7

### Minor Changes

- a929c0f6: **feat:** implements `useCreatePost` hook
- 5bc7e430: **feat:** implements `useCreateComment` hook
- 8b86832f: **fix:** logs out user on failed on-the-fly token refresh

### Patch Changes

- f82b90a5: Added `useUpdateFollowPolicy` hook
- d1414eda: **feat:** implements `useCreateMirror` hook
- 2f618240: Added `useFollowProfile` and `useUnfollowProfile` hooks
- Updated dependencies [a929c0f6]
- Updated dependencies [f82b90a5]
- Updated dependencies [5bc7e430]
- Updated dependencies [d1414eda]
- Updated dependencies [2f618240]
  - @lens-protocol/shared-kernel@0.11.0-alpha.4
  - @lens-protocol/api-bindings@0.11.0-alpha.7
  - @lens-protocol/domain@0.11.0-alpha.4
  - @lens-protocol/blockchain-bindings@0.10.0-alpha.4
  - @lens-protocol/storage@0.7.5-alpha.2

## 2.0.0-alpha.6

### Minor Changes

- 4630efb9: add report publication
- 25b7ef51: add hide publicaiton

### Patch Changes

- Updated dependencies [4630efb9]
- Updated dependencies [25b7ef51]
  - @lens-protocol/api-bindings@0.11.0-alpha.6

## 2.0.0-alpha.5

### Patch Changes

- 734d6823: Added `useProfileManagers` and `useUpdateProfileManagers` hooks
- 51f8cec6: Added `useReactionToggle` hook
- d7129e39: Added `useCurrencies` hook
- Updated dependencies [734d6823]
- Updated dependencies [51f8cec6]
- Updated dependencies [d7129e39]
  - @lens-protocol/blockchain-bindings@0.10.0-alpha.3
  - @lens-protocol/shared-kernel@0.11.0-alpha.3
  - @lens-protocol/api-bindings@0.11.0-alpha.5
  - @lens-protocol/domain@0.11.0-alpha.3
  - @lens-protocol/storage@0.7.5-alpha.1

## 2.0.0-alpha.4

### Minor Changes

- 38a40c70: add explore profiles
- 1c3a10c3: add explore publications
- reintroduce notifications for v2

### Patch Changes

- 6762b170: add feed highlights
- Updated dependencies [38a40c70]
- Updated dependencies [1c3a10c3]
- Updated dependencies [6762b170]
- Updated dependencies
  - @lens-protocol/api-bindings@0.11.0-alpha.4

## 2.0.0-alpha.3

### Patch Changes

- 6d0d62dd: **feat:** new `useLogin` and `useSession` hooks
- Updated dependencies [6d0d62dd]
  - @lens-protocol/shared-kernel@0.11.0-alpha.2
  - @lens-protocol/api-bindings@0.11.0-alpha.3
  - @lens-protocol/domain@0.11.0-alpha.2
  - @lens-protocol/blockchain-bindings@0.10.0-alpha.2
  - @lens-protocol/storage@0.7.5-alpha.0

## 2.0.0-alpha.2

### Patch Changes

- 6f51659c: **fix:** adds missing `__typename` and expose `ProfileFields` from `Profile.invitedBy`
- Updated dependencies [6f51659c]
  - @lens-protocol/api-bindings@0.11.0-alpha.2

## 2.0.0-alpha.1

### Patch Changes

- 25fe9a46: **Added** new hooks: useFeed, useSearchProfiles, useSearchPublications, useProfiles, usePublications, useProfileFollowing, useProfileFollowers, useMutualFollowers, useRecommendedProfiles, useProfileActionHistory, useWhoReactedToPublication, useWhoActedOnPublication
- Updated dependencies [25fe9a46]
  - @lens-protocol/api-bindings@0.11.0-alpha.1
  - @lens-protocol/domain@0.11.0-alpha.1
  - @lens-protocol/shared-kernel@0.11.0-alpha.1
  - @lens-protocol/blockchain-bindings@0.10.0-alpha.1

## 2.0.0-alpha.0

### Major Changes

- 731ff1d0: Added support for Lens Protocol v2

### Patch Changes

- Updated dependencies [731ff1d0]
  - @lens-protocol/blockchain-bindings@0.10.0-alpha.0
  - @lens-protocol/shared-kernel@0.11.0-alpha.0
  - @lens-protocol/api-bindings@0.11.0-alpha.0
  - @lens-protocol/domain@0.11.0-alpha.0

## 1.3.1

### Patch Changes

- ace02d32: **Fixes** support for ERC1155 gated content
- 5f251069: **Fixed** `usePublications` to refetch on `publicationIds` change
- dfb15e1a: **Fixed** 1.3.1-next.0 release packages bundles
- ebc2e7e5: **Added** `publicationsId` to `usePublications` args
- 48dd0860: **Fixed** internal imports
- Updated dependencies [ace02d32]
- Updated dependencies [5f251069]
- Updated dependencies [dfb15e1a]
- Updated dependencies [ebc2e7e5]
- Updated dependencies [48dd0860]
  - @lens-protocol/gated-content@0.3.3
  - @lens-protocol/api-bindings@0.10.1
  - @lens-protocol/domain@0.10.1
  - @lens-protocol/blockchain-bindings@0.9.2

## 1.3.1-next.4

### Patch Changes

- 48dd0860: **Fixed** internal imports
- Updated dependencies [48dd0860]
  - @lens-protocol/domain@0.10.1-next.0
  - @lens-protocol/api-bindings@0.10.1-next.3
  - @lens-protocol/blockchain-bindings@0.9.2-next.0
  - @lens-protocol/gated-content@0.3.3-next.4

## 1.3.1-next.3

### Patch Changes

- ace02d32: **Fixes** support for ERC1155 gated content
- Updated dependencies [ace02d32]
  - @lens-protocol/gated-content@0.3.3-next.3

## 1.3.1-next.2

### Patch Changes

- 5f251069: **Fixed** `usePublications` to refetch on `publicationIds` change
- Updated dependencies [5f251069]
  - @lens-protocol/api-bindings@0.10.1-next.2
  - @lens-protocol/gated-content@0.3.3-next.2

## 1.3.1-next.1

### Patch Changes

- dfb15e1a: **Fixed** 1.3.1-next.0 release packages bundles
- Updated dependencies [dfb15e1a]
  - @lens-protocol/api-bindings@0.10.1-next.1
  - @lens-protocol/gated-content@0.3.3-next.1

## 1.3.1-next.0

### Patch Changes

- ebc2e7e5: **Added** `publicationsId` to `usePublications` args
- Updated dependencies [ebc2e7e5]
  - @lens-protocol/api-bindings@0.10.1-next.0
  - @lens-protocol/gated-content@0.3.3-next.0

## 1.3.0

### Minor Changes

- de401a59: **Added** support for optimized and transformed media inside publication and profile MediaSet
- c8426cb3: **Added** publication types as valid argument for `usePublications` query
- 40fce6ff: **Added** support for bookmarks: list, add, and remove from a Profile private list of publications
- ad797714: **Added** `useNotInterested` hook
- c2a91ef4: **Added** `Profile.invitedBy` field
- 636ff014: **Added** `profileIds` to `usePublications` hook
- cfe0d51e: **Added** `highSignalFilter` to `useNotifications` hook
- 3ffab7b9: **Added** newly created `Profile` to `useCreateProfile` result
- 19ed489e: **Added** `beforeCount` to all paginated hooks and refetch data on re-render of `usePublication` and `useProfile` hooks.
- 0f75f79d: **Added** experimental `useCurrentSession` hook
  **Fixed** issue with `Profile` entity being leaked by the `useWalletLogin` hook
  **Fixed** bug preventing logout on expired credentials detected at startup type
- 847a9db3: **Added** `useClearRecentPosts` hook
- 773c2ed8: **Added** ability to override `sources` in `useExplorePublications` hook and support to `noRandomize` param.
- 773c2ed8: **Added** `name` support to non-collectable publications. Affects `useCreatePost`, `useCreateComment`, `useCreateEncryptedPost`, and `useCreateEncryptedComment`
- 6eaaaf22: **Added** `Profile.followNftAddress` field
- 433760f3: **Added** ability to specify profile picture and follow policy when creating a new profile"
- fc31f146: **Added** experimental hooks that integrate with @xmtp/react-sdk
- 9428efeb: **Added** support for `attributes` and `image` for non-collectable publications. Affects `useCreatePost`, `useCreateComment`, `useCreateEncryptedPost`, and `useCreateEncryptedComment`
- e8dc3cd8: fixes collect/mirror count bug
- 3b67207b: **Added** `appId` to `Comment` and `Post`
- 4c4505d2: **Added** support for Profile Guardian
- bdbc71d5: **Added** ability to await newly created post in `useCreatePost` hook

### Patch Changes

- a5cf2198: Fixed useCurrentSession
- 09206763: **Fixed** issue with `useWalletLogin` never settling
- df70461c: **Fixed** `useUnreadNotificationCount` to work with fresh accounts
- 773c2ed8: **Fixes** issues with `profileIds` not used to evaluate cache hits. Affecting `usePublications` and `useProfiles`.
- b7609fcb: **Fixed** `useNotification` to include `highSignalFilter` filter
- 773c2ed8: **Added** missing `commentsOfOrdering` and `commentsRankingFilter` to `useComments` hook
- 125ec30c: **Fixed** `usePollDetails` to be robust to flagged or misconfigured Snapshot Proposals
- 28094a84: **Fixed** XMTP dep is optional until chat features are requested via `@lens-protocol/react-web/inbox` entrypoint
- 1d13a3ab: **Fixed** issue with network switch failing on some wallets. Thanks [@jarrodwatts](https://github.com/jarrodwatts)!
- Updated dependencies [de401a59]
- Updated dependencies [40fce6ff]
- Updated dependencies [ad797714]
- Updated dependencies [773c2ed8]
- Updated dependencies [c2a91ef4]
- Updated dependencies [b7609fcb]
- Updated dependencies [636ff014]
- Updated dependencies [773c2ed8]
- Updated dependencies [3ffab7b9]
- Updated dependencies [19ed489e]
- Updated dependencies [0f75f79d]
- Updated dependencies [d5efd895]
- Updated dependencies [773c2ed8]
- Updated dependencies [773c2ed8]
- Updated dependencies [125ec30c]
- Updated dependencies [6eaaaf22]
- Updated dependencies [433760f3]
- Updated dependencies [fc31f146]
- Updated dependencies [9428efeb]
- Updated dependencies [e8dc3cd8]
- Updated dependencies [3b67207b]
- Updated dependencies [4c4505d2]
- Updated dependencies [bdbc71d5]
- Updated dependencies [5943a0f0]
  - @lens-protocol/api-bindings@0.10.0
  - @lens-protocol/gated-content@0.3.2
  - @lens-protocol/blockchain-bindings@0.9.1
  - @lens-protocol/domain@0.10.0
  - @lens-protocol/shared-kernel@0.10.0
  - @lens-protocol/storage@0.7.4

## 1.3.0-next.11

### Patch Changes

- 09206763: **Fixed** issue with `useWalletLogin` never settling

## 1.3.0-next.10

### Minor Changes

- bdbc71d5: **Added** ability to await newly created post in `useCreatePost` hook

### Patch Changes

- Updated dependencies [bdbc71d5]
  - @lens-protocol/shared-kernel@0.10.0-next.2
  - @lens-protocol/domain@0.10.0-next.7
  - @lens-protocol/api-bindings@0.10.0-next.8
  - @lens-protocol/blockchain-bindings@0.9.1-next.7
  - @lens-protocol/gated-content@0.3.2-next.8
  - @lens-protocol/storage@0.7.4-next.2

## 1.3.0-next.9

### Patch Changes

- Updated dependencies
  - @lens-protocol/shared-kernel@0.10.0-next.1
  - @lens-protocol/api-bindings@0.10.0-next.7
  - @lens-protocol/blockchain-bindings@0.9.1-next.6
  - @lens-protocol/domain@0.10.0-next.6
  - @lens-protocol/gated-content@0.3.2-next.7
  - @lens-protocol/storage@0.7.4-next.1

## 1.3.0-next.8

### Minor Changes

- 773c2ed8: **Added** ability to override `sources` in `useExplorePublications` hook and support to `noRandomize` param.
- 773c2ed8: **Added** `name` support to non-collectable publications. Affects `useCreatePost`, `useCreateComment`, `useCreateEncryptedPost`, and `useCreateEncryptedComment`

### Patch Changes

- 773c2ed8: **Fixes** issues with `profileIds` not used to evaluate cache hits. Affecting `usePublications` and `useProfiles`.
- 773c2ed8: **Added** missing `commentsOfOrdering` and `commentsRankingFilter` to `useComments` hook
- Updated dependencies [773c2ed8]
- Updated dependencies [773c2ed8]
- Updated dependencies [773c2ed8]
- Updated dependencies [773c2ed8]
  - @lens-protocol/api-bindings@0.10.0-next.6
  - @lens-protocol/domain@0.10.0-next.5
  - @lens-protocol/gated-content@0.3.2-next.6
  - @lens-protocol/blockchain-bindings@0.9.1-next.5

## 1.3.0-next.7

### Patch Changes

- 28094a84: **Fixed** XMTP dep is optional until chat features are requested via `@lens-protocol/react-web/inbox` entrypoint

## 1.3.0-next.6

### Minor Changes

- 3ffab7b9: **Added** newly created `Profile` to `useCreateProfile` result
- 19ed489e: **Added** `beforeCount` to all paginated hooks and refetch data on re-render of `usePublication` and `useProfile` hooks.
- 6eaaaf22: **Added** `Profile.followNftAddress` field

### Patch Changes

- Updated dependencies [3ffab7b9]
- Updated dependencies [19ed489e]
- Updated dependencies [6eaaaf22]
  - @lens-protocol/domain@0.10.0-next.4
  - @lens-protocol/api-bindings@0.10.0-next.5
  - @lens-protocol/blockchain-bindings@0.9.1-next.4
  - @lens-protocol/gated-content@0.3.2-next.5

## 1.3.0-next.5

### Minor Changes

- 433760f3: **Added** ability to specify profile picture and follow policy when creating a new profile"
- fc31f146: **Added** experimental hooks that integrate with @xmtp/react-sdk
- e8dc3cd8: fixes collect/mirror count bug

### Patch Changes

- b7609fcb: **Fixed** `useNotification` to include `highSignalFilter` filter
- Updated dependencies [b7609fcb]
- Updated dependencies [433760f3]
- Updated dependencies [fc31f146]
- Updated dependencies [e8dc3cd8]
  - @lens-protocol/api-bindings@0.10.0-next.4
  - @lens-protocol/domain@0.10.0-next.3
  - @lens-protocol/shared-kernel@0.10.0-next.0
  - @lens-protocol/gated-content@0.3.2-next.4
  - @lens-protocol/blockchain-bindings@0.9.1-next.3
  - @lens-protocol/storage@0.7.4-next.0

## 1.3.0-next.4

### Minor Changes

- 9428efeb: **Added** support for `attributes` and `image` for non-collectable publications. Affects `useCreatePost`, `useCreateComment`, `useCreateEncryptedPost`, and `useCreateEncryptedComment`

### Patch Changes

- Updated dependencies [9428efeb]
  - @lens-protocol/domain@0.9.1-next.2
  - @lens-protocol/api-bindings@0.10.0-next.3
  - @lens-protocol/blockchain-bindings@0.9.1-next.2
  - @lens-protocol/gated-content@0.3.2-next.3

## 1.3.0-next.3

### Minor Changes

- de401a59: **Added** support for optimized and transformed media inside publication and profile MediaSet
- 40fce6ff: **Added** support for bookmarks: list, add, and remove from a Profile private list of publications
- ad797714: **Added** `useNotInterested` hook
- 636ff014: **Added** `profileIds` to `usePublications` hook
- 3b67207b: **Added** `appId` to `Comment` and `Post`

### Patch Changes

- a5cf2198: Fixed useCurrentSession
- 125ec30c: **Fixed** `usePollDetails` to be robust to flagged or misconfigured Snapshot Proposals
- Updated dependencies [de401a59]
- Updated dependencies [40fce6ff]
- Updated dependencies [ad797714]
- Updated dependencies [636ff014]
- Updated dependencies [125ec30c]
- Updated dependencies [3b67207b]
  - @lens-protocol/api-bindings@0.10.0-next.2
  - @lens-protocol/gated-content@0.3.2-next.2
  - @lens-protocol/blockchain-bindings@0.9.1-next.1
  - @lens-protocol/domain@0.9.1-next.1

## 1.3.0-next.2

### Patch Changes

- df70461c: **Fixed** `useUnreadNotificationCount` to work with fresh accounts
- 1d13a3ab: **Fixed** issue with network switch failing on some wallets. Thanks [@jarrodwatts](https://github.com/jarrodwatts)!

## 1.3.0-next.1

### Patch Changes

- Updated dependencies [d5efd895]
  - @lens-protocol/api-bindings@0.9.2-next.1
  - @lens-protocol/gated-content@0.3.2-next.1

## 1.2.2

### Patch Changes

- Updated dependencies [06a30a2c]
  - @lens-protocol/api-bindings@0.9.1
  - @lens-protocol/gated-content@0.3.1

## 1.3.0-next.0

### Minor Changes

- c8426cb3: **Added** publication types as valid argument for `usePublications` query
- c2a91ef4: **Added** `Profile.invitedBy` field
- cfe0d51e: **Added** `highSignalFilter` to `useNotifications` hook
- 0f75f79d: **Added** experimental `useCurrentSession` hook
  **Fixed** issue with `Profile` entity being leaked by the `useWalletLogin` hook
  **Fixed** bug preventing logout on expired credentials detected at startup type
- 847a9db3: **Added** `useClearRecentPosts` hook
- 4c4505d2: **Added** support for Profile Guardian

### Patch Changes

- Updated dependencies [c2a91ef4]
- Updated dependencies [0f75f79d]
- Updated dependencies [4c4505d2]
  - @lens-protocol/api-bindings@0.9.1-next.0
  - @lens-protocol/domain@0.9.1-next.0
  - @lens-protocol/gated-content@0.3.1-next.0
  - @lens-protocol/blockchain-bindings@0.9.1-next.0

## 1.2.1

### Patch Changes

- 6be8cfb6: **Fixed** `useCreateComment` and `useCreateEncryptedComment` validation errors

## 1.2.0

### Minor Changes

- cb5b900d: **Added** sandbox environment support
- af4b1133: Detects malformed URLs from user's provided `upload` handler
- 3025d56a: allow self funded fallback for proxy actions
- 225f0fa7: **Added** `usePollDetail` and `usePollVote` hooks
- 422c627e: **Added** eager check on several tx hooks so to fail fast with dev friendly error messages"

### Patch Changes

- 55211083: Synchronize state change between `useActiveWallet` and `useActiveProfile` hooks
- 422c627e: **Fixed** missing DecryptionCriteria validation
- 1d99413a: Fixed: wrong reaction state when optimisticaly adding a reaction if another reaction already exists
- ea0b40e3: **Fixed** active profile to be always `null` when there is not active wallet
- 2dbe0035: - Adds the ability to override the `createGatedClient` function for gated content functionality.
- 97ecba69: **Fixed** cache redirects for Publication and Profile
- Updated dependencies [cb5b900d]
- Updated dependencies [55211083]
- Updated dependencies [3025d56a]
- Updated dependencies [1d99413a]
- Updated dependencies [225f0fa7]
- Updated dependencies [ea0b40e3]
- Updated dependencies [a899553c]
- Updated dependencies [422c627e]
- Updated dependencies [2dbe0035]
- Updated dependencies [148e9636]
- Updated dependencies [e4be6c07]
- Updated dependencies [97ecba69]
  - @lens-protocol/gated-content@0.3.0
  - @lens-protocol/domain@0.9.0
  - @lens-protocol/api-bindings@0.9.0
  - @lens-protocol/blockchain-bindings@0.9.0
  - @lens-protocol/shared-kernel@0.9.0
  - @lens-protocol/storage@0.7.3

## 1.2.0-next.4

### Patch Changes

- ea0b40e3: **Fixed** active profile to be always `null` when there is not active wallet
- Updated dependencies [ea0b40e3]
- Updated dependencies [a899553c]
  - @lens-protocol/domain@0.9.0-next.2
  - @lens-protocol/api-bindings@0.9.0-next.2
  - @lens-protocol/blockchain-bindings@0.9.0-next.2
  - @lens-protocol/gated-content@0.3.0-next.4

## 1.1.1

### Patch Changes

- Updated dependencies [58217985]
  - @lens-protocol/api-bindings@0.8.1
  - @lens-protocol/gated-content@0.2.3

## 1.2.0-next.3

### Patch Changes

- 2dbe0035: - Adds the ability to override the `createGatedClient` function for gated content functionality.
- Updated dependencies [2dbe0035]
  - @lens-protocol/gated-content@0.3.0-next.3

## 1.2.0-next.2

### Minor Changes

- 3025d56a: allow self funded fallback for proxy actions
- 225f0fa7: **Added** `usePollDetail` and `usePollVote` hooks
- 422c627e: **Added** eager check on several tx hooks so to fail fast with dev friendly error messages"

### Patch Changes

- 422c627e: **Fixed** missing DecryptionCriteria validation
- 97ecba69: **Fixed** cache redirects for Publication and Profile
- Updated dependencies [3025d56a]
- Updated dependencies [225f0fa7]
- Updated dependencies [422c627e]
- Updated dependencies [97ecba69]
  - @lens-protocol/api-bindings@0.9.0-next.1
  - @lens-protocol/domain@0.9.0-next.1
  - @lens-protocol/blockchain-bindings@0.9.0-next.1
  - @lens-protocol/shared-kernel@0.9.0-next.0
  - @lens-protocol/gated-content@0.3.0-next.2
  - @lens-protocol/storage@0.7.3-next.0

## 1.2.0-next.1

### Patch Changes

- 55211083: Synchronize state change between `useActiveWallet` and `useActiveProfile` hooks
- Updated dependencies [55211083]
- Updated dependencies [148e9636]
  - @lens-protocol/domain@0.8.1-next.0
  - @lens-protocol/gated-content@0.3.0-next.1
  - @lens-protocol/api-bindings@0.8.1-next.0
  - @lens-protocol/blockchain-bindings@0.8.1-next.0

## 1.2.0-next.0

### Minor Changes

- cb5b900d: **Added** sandbox environment support
- af4b1133: Detects malformed URLs from user's provided `upload` handler

### Patch Changes

- Updated dependencies [cb5b900d]
  - @lens-protocol/gated-content@0.3.0-next.0

## 1.1.0

### Minor Changes

- 03a8ad5: **Deprecated** publication's `isOptimisticMirroredByMe` property, introduced `isMirroredByMe`
- 513373d: **Enhanced** publication's `hasCollectedByMe` to replace deprecated `hasOptimisticCollectedByMe` property
- 98c6547: **Added** support to fetch results before the current results set
- c416a2e: **Added:** self-fund protocol calls when subsidized approach fails
- c416a2e: **Fixed:** ensures correct chain when signing typed data
- c416a2e: **Fixed:** network switch in wagmi bindings
- cf4a420: **Added** support for cover and `altTag` in publication media attributes
- ef1d7e2: **Added** Momoka support to React hooks
- 5c5bfb2: **Added** support for `SimpleCollectModule`

### Patch Changes

- 1d5cf31: **Fixed** create mirror commit phase so to update the correct publication in cache
- 72becec: **Fixed** documentation for `useuseActiveProfileSwitch` and `useProfilesOwnedByMe` hooks
- ca9b8cb: **Fixes** export of `NotificationTypes`
- 04647bb: **Fixed** issue preventing query hook from detecting active profile changes
- b738abb: **Fixed** `useCreatePost`, `useCreateComment`, `useCreateEncryptedPost`, and `useCreateEncryptedComment` callback argument
- 71196cf: **Added** support for more metadata fields in create publication hooks
- c4e6fcf: **Fixes** `CollectType`, `NftAttributeDisplayType`, `ReferencePolicyType` not exported as values
- Updated dependencies [03a8ad5]
- Updated dependencies [37bf8e8]
- Updated dependencies [513373d]
- Updated dependencies [98c6547]
- Updated dependencies [04647bb]
- Updated dependencies [c416a2e]
- Updated dependencies [ef1d7e2]
- Updated dependencies [b738abb]
- Updated dependencies [5c5bfb2]
- Updated dependencies [71196cf]
  - @lens-protocol/api-bindings@0.8.0
  - @lens-protocol/blockchain-bindings@0.8.0
  - @lens-protocol/shared-kernel@0.8.0
  - @lens-protocol/domain@0.8.0
  - @lens-protocol/gated-content@0.2.2
  - @lens-protocol/storage@0.7.2

## 1.1.0-next.5

### Patch Changes

- Updated dependencies [37bf8e8]
  - @lens-protocol/api-bindings@0.8.0-next.4
  - @lens-protocol/gated-content@0.2.2-next.4

## 1.1.0-next.4

### Minor Changes

- 5c5bfb2: Added support for SimpleCollectModule

### Patch Changes

- b738abb: Fixed `useCreatePost`, `useCreateComment`, `useCreateEncryptedPost`, and `useCreateEncryptedComment` callback argument
- Updated dependencies [b738abb]
- Updated dependencies [5c5bfb2]
  - @lens-protocol/shared-kernel@0.8.0-next.1
  - @lens-protocol/domain@0.8.0-next.3
  - @lens-protocol/api-bindings@0.8.0-next.3
  - @lens-protocol/blockchain-bindings@0.8.0-next.3
  - @lens-protocol/gated-content@0.2.2-next.3
  - @lens-protocol/storage@0.7.2-next.1

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
