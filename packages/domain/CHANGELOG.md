# @lens-protocol/domain

## 0.11.0-alpha.12

### Patch Changes

- Updated dependencies [2f5360796]
  - @lens-protocol/shared-kernel@0.11.0-alpha.7

## 0.11.0-alpha.11

### Minor Changes

- cf250df4: implements `useUnblockProfiles`
- 9490db8e: Added useLinkHandle and useUnlinkHandle hooks
- cf250df4: adds `useBlockProfiles` hook

### Patch Changes

- 1f28c6d6: Added useCreateQuote hook

## 0.11.0-alpha.10

### Minor Changes

- 8120f676: **feat:** reintroduces `useAccessToken` and `useApolloClient` hooks
- 8120f676: **feat:** implements `useClaimHandle`, `useCanClaimHandle`, and `useUpgradeCredentials`

### Patch Changes

- 8120f676: **feat:** allow wallet-only authentication via `useLogin`
- 061df834: **chore:** configure Lens API v2 production URL
- Updated dependencies [061df834]
  - @lens-protocol/shared-kernel@0.11.0-alpha.6

## 0.11.0-alpha.9

### Patch Changes

- 5f93ea77: **fix:** support `Profile.lensManager` into `Profile.signless` renaming
- 5f93ea77: **fix:** renames of `handleLinkToProfile`, `handleUnlinkToProfile` and correlated mutations, types

## 0.11.0-alpha.8

### Patch Changes

- Update dependencies

## 0.11.0-alpha.7

### Patch Changes

- 0687207b: Added LinkHandle and UnlinkHandle use-cases

## 0.11.0-alpha.6

### Minor Changes

- cfc03dff: **feat:** implements `useOpenAction` hook

### Patch Changes

- 9481f48b: **feat:** implements `useApproveModule` hook. It also upgrades viem and wagmi peer deps.
- Updated dependencies [9481f48b]
  - @lens-protocol/shared-kernel@0.11.0-alpha.5

## 0.11.0-alpha.5

### Minor Changes

- 30ccf19d: **Added** useMyBookmarks hook
- a42e90e7: **Added** useSetProfileMetadata hook
- 9dd33b03:
  **Renamed** useFollowProfile to useFollow
  **Renamed** useUnfollowProfile to useUnfollow
  **Added** support for LensProfileManager to useFollow, useUnfollow and useUpdateFollowPolicy hooks

## 0.11.0-alpha.4

### Minor Changes

- a929c0f6: **feat:** implements `useCreatePost` hook
- 5bc7e430: **feat:** implements `useCreateComment` hook

### Patch Changes

- f82b90a5: Added `useUpdateFollowPolicy` hook
- d1414eda: **feat:** implements `useCreateMirror` hook
- 2f618240: Added `useFollowProfile` and `useUnfollowProfile` hooks
- Updated dependencies [a929c0f6]
  - @lens-protocol/shared-kernel@0.11.0-alpha.4

## 0.11.0-alpha.3

### Patch Changes

- 734d6823: **feat:** adds `useProfileManagers` and `useUpdateProfileManagers` hooks
- 51f8cec6: **Added** useReactionToggle hook
- Updated dependencies [734d6823]
  - @lens-protocol/shared-kernel@0.11.0-alpha.3

## 0.11.0-alpha.2

### Patch Changes

- 6d0d62dd: **feat:** new `useLogin` and `useSession` hooks
- Updated dependencies [6d0d62dd]
  - @lens-protocol/shared-kernel@0.11.0-alpha.2

## 0.11.0-alpha.1

### Patch Changes

- 25fe9a46: Support for new v2 hooks
- Updated dependencies [25fe9a46]
  - @lens-protocol/shared-kernel@0.11.0-alpha.1

## 0.11.0-alpha.0

### Minor Changes

- 731ff1d0: Added support for Lens Protocol v2

### Patch Changes

- Updated dependencies [731ff1d0]
  - @lens-protocol/shared-kernel@0.11.0-alpha.0

## 0.10.1

### Patch Changes

- 48dd0860: **Fixed** internal imports

## 0.10.1-next.0

### Patch Changes

- 48dd0860: **Fixed** internal imports

## 0.10.0

### Minor Changes

- fc31f146: **Added** experimental hooks that integrate with @xmtp/react-sdk

### Patch Changes

- 40fce6ff: **Added** support for bookmarks: list, add, and remove from a Profile private list of publications
- ad797714: **Added** `useNotInterested` hook
- 3ffab7b9: **Added** newly created `Profile` to `useCreateProfile` result
- 0f75f79d: **Added** experimental `useCurrentSession` hook
  **Fixed** issue with `Profile` entity being leaked by the `useWalletLogin` hook
  **Fixed** bug preventing logout on expired credentials detected at startup type
- 773c2ed8: **Added** `name` support to non-collectable publications. Affects `useCreatePost`, `useCreateComment`, `useCreateEncryptedPost`, and `useCreateEncryptedComment`
- 433760f3: **Added** ability to specify profile picture and follow policy when creating a new profile"
- 9428efeb: **Added** support for `attributes` and `image` for non-collectable publications. Affects `useCreatePost`, `useCreateComment`, `useCreateEncryptedPost`, and `useCreateEncryptedComment`
- bdbc71d5: **Added** ability to await newly created post in `useCreatePost` hook
- Updated dependencies [fc31f146]
- Updated dependencies [bdbc71d5]
- Updated dependencies [5943a0f0]
  - @lens-protocol/shared-kernel@0.10.0

## 0.10.0-next.7

### Patch Changes

- bdbc71d5: **Added** ability to await newly created post in `useCreatePost` hook
- Updated dependencies [bdbc71d5]
  - @lens-protocol/shared-kernel@0.10.0-next.2

## 0.10.0-next.6

### Patch Changes

- Updated dependencies
  - @lens-protocol/shared-kernel@0.10.0-next.1

## 0.10.0-next.5

### Patch Changes

- 773c2ed8: **Added** `name` support to non-collectable publications. Affects `useCreatePost`, `useCreateComment`, `useCreateEncryptedPost`, and `useCreateEncryptedComment`

## 0.10.0-next.4

### Patch Changes

- 3ffab7b9: **Added** newly created `Profile` to `useCreateProfile` result

## 0.10.0-next.3

### Minor Changes

- fc31f146: **Added** experimental hooks that integrate with @xmtp/react-sdk

### Patch Changes

- 433760f3: **Added** ability to specify profile picture and follow policy when creating a new profile"
- Updated dependencies [fc31f146]
  - @lens-protocol/shared-kernel@0.10.0-next.0

## 0.9.1-next.2

### Patch Changes

- 9428efeb: **Added** support for `attributes` and `image` for non-collectable publications. Affects `useCreatePost`, `useCreateComment`, `useCreateEncryptedPost`, and `useCreateEncryptedComment`

## 0.9.1-next.1

### Patch Changes

- 40fce6ff: **Added** support for bookmarks: list, add, and remove from a Profile private list of publications
- ad797714: **Added** `useNotInterested` hook

## 0.9.1-next.0

### Patch Changes

- 0f75f79d: **Added** experimental `useCurrentSession` hook
  **Fixed** issue with `Profile` entity being leaked by the `useWalletLogin` hook
  **Fixed** bug preventing logout on expired credentials detected at startup type

## 0.9.0

### Minor Changes

- 225f0fa7: **Added** `usePollDetail` and `usePollVote` hooks

### Patch Changes

- 55211083: Synchronize state change between `useActiveWallet` and `useActiveProfile` hooks
- 3025d56a: allow self funded fallback for proxy actions
- 1d99413a: Fixed: wrong reaction state when optimisticaly adding a reaction if another reaction already exists
- ea0b40e3: **Fixed** active profile to be always `null` when there is not active wallet
- Updated dependencies [225f0fa7]
- Updated dependencies [422c627e]
  - @lens-protocol/shared-kernel@0.9.0

## 0.9.0-next.2

### Patch Changes

- ea0b40e3: **Fixed** active profile to be always `null` when there is not active wallet

## 0.9.0-next.1

### Minor Changes

- 225f0fa7: **Added** `usePollDetail` and `usePollVote` hooks

### Patch Changes

- 3025d56a: allow self funded fallback for proxy actions
- Updated dependencies [225f0fa7]
- Updated dependencies [422c627e]
  - @lens-protocol/shared-kernel@0.9.0-next.0

## 0.8.1-next.0

### Patch Changes

- 55211083: Synchronize state change between `useActiveWallet` and `useActiveProfile` hooks

## 0.8.0

### Minor Changes

- c416a2e: **Added:** self-fund protocol calls when subsidized approaches fails
- c416a2e: **Fixed:** ensures correct chain when signing typed data
- c416a2e: **Fixed:** network switch in wagmi bindings
- ef1d7e2: **Added** Momoka support to React hooks
- 5c5bfb2: **Added** support for `SimpleCollectModule`

### Patch Changes

- b738abb: **Fixed** `useCreatePost`, `useCreateComment`, `useCreateEncryptedPost`, and `useCreateEncryptedComment` callback argument
- 71196cf: **Added** support for more metadata fields in create publication hooks
- Updated dependencies [c416a2e]
- Updated dependencies [b738abb]
  - @lens-protocol/shared-kernel@0.8.0

## 0.8.0-next.3

### Minor Changes

- 5c5bfb2: Added support for SimpleCollectModule

### Patch Changes

- b738abb: Fixed `useCreatePost`, `useCreateComment`, `useCreateEncryptedPost`, and `useCreateEncryptedComment` callback argument
- Updated dependencies [b738abb]
  - @lens-protocol/shared-kernel@0.8.0-next.1

## 0.8.0-next.2

### Minor Changes

- ef1d7e2: Added Momoka support to React hooks

## 0.8.0-next.1

### Patch Changes

- 71196cf: Added support for more metadata fields in create publication hooks

## 0.8.0-next.0

### Minor Changes

- c416a2ea:
  - **Added:** self-fund protocol calls when subsidized approaches fails
  - **Fixed:** ensures correct chain when signing typed data
  - **Fixed:** network switch in wagmi bindings

### Patch Changes

- Updated dependencies [c416a2ea]
  - @lens-protocol/shared-kernel@0.8.0-next.0

## 0.7.1

### Patch Changes

- 425daba: **Fixed** 1.0.0 release packages bundles
- Updated dependencies [425daba]
  - @lens-protocol/shared-kernel@0.7.1

## 0.7.0

### Minor Changes

- 37eaf8a: Added TSDoc, use shared tsconfig, better types

### Patch Changes

- Updated dependencies [37eaf8a]
  - @lens-protocol/shared-kernel@0.7.0

## 0.7.0-beta.0

### Minor Changes

- dc1350d: Added TSDoc, use shared tsconfig, better types

### Patch Changes

- Updated dependencies [dc1350d]
  - @lens-protocol/shared-kernel@0.7.0-beta.0

## 0.6.0

### Patch Changes

- @lens-protocol/shared-kernel@0.6.0

## 0.5.1

### Patch Changes

- @lens-protocol/shared-kernel@0.5.1

## 0.5.0

### Patch Changes

- @lens-protocol/shared-kernel@0.5.0

## 0.4.1

### Patch Changes

- @lens-protocol/shared-kernel@0.4.1

## 0.4.0

### Patch Changes

- @lens-protocol/shared-kernel@0.4.0

## 0.3.0

### Patch Changes

- @lens-protocol/shared-kernel@0.3.0

## 0.2.0

### Patch Changes

- Updated dependencies [c89aed9]
  - @lens-protocol/shared-kernel@1.0.0

## 0.1.1

### Patch Changes

- @lens-protocol/shared-kernel@0.1.1

## 0.1.0

First developer preview release
