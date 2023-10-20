# @lens-protocol/api-bindings

## 0.11.0-alpha.11

### Patch Changes

- Update dependencies
- Updated dependencies
  - @lens-protocol/domain@0.11.0-alpha.7

## 0.11.0-alpha.10

### Minor Changes

- c09c5fdc: Added `useNotInterestedToggle` hook
- 0687207b: Added `useOwnedHandles` hook

## 0.11.0-alpha.9

### Minor Changes

- cfc03dff: **feat:** implements `useOpenAction` hook
- 6ab0e99a: **Added** revenue hooks: useRevenueFromFollow, useRevenueFromPublication, useRevenueFromPublications
- bdf81299: implements `useBookmarkToggle`

### Patch Changes

- 9481f48b: **feat:** implements `useApproveModule` hook. It also upgrades viem and wagmi peer deps.
- Updated dependencies [cfc03dff]
- Updated dependencies [9481f48b]
  - @lens-protocol/domain@0.11.0-alpha.6
  - @lens-protocol/shared-kernel@0.11.0-alpha.5

## 0.11.0-alpha.8

### Minor Changes

- 30ccf19d: **Added** useMyBookmarks hook
- a42e90e7: **Added** useSetProfileMetadata hook
- 9dd33b03:
  **Renamed** useFollowProfile to useFollow
  **Renamed** useUnfollowProfile to useUnfollow
  **Added** support for LensProfileManager to useFollow, useUnfollow and useUpdateFollowPolicy hooks

### Patch Changes

- 01b2c2cb: Updated to support the latest API schema
- Updated dependencies [a42e90e7]
- Updated dependencies [9dd33b03]
  - @lens-protocol/domain@0.11.0-alpha.5

## 0.11.0-alpha.7

### Minor Changes

- a929c0f6: **feat:** implements `useCreatePost` hook
- 5bc7e430: **feat:** implements `useCreateComment` hook

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
  - @lens-protocol/domain@0.11.0-alpha.4

## 0.11.0-alpha.6

### Minor Changes

- 4630efb9: add report publication
- 25b7ef51: add hide publicaiton

## 0.11.0-alpha.5

### Patch Changes

- 734d6823: Added `useProfileManagers` and `useUpdateProfileManagers` hooks
- 51f8cec6: Added `useReactionToggle` hook
- d7129e39: Added `useCurrencies` hook
- Updated dependencies [734d6823]
- Updated dependencies [51f8cec6]
  - @lens-protocol/shared-kernel@0.11.0-alpha.3
  - @lens-protocol/domain@0.11.0-alpha.3

## 0.11.0-alpha.4

### Minor Changes

- 38a40c70: add explore profiles
- 1c3a10c3: add explore publications
- reintroduce notifications for v2

### Patch Changes

- 6762b170: add feed highlights

## 0.11.0-alpha.3

### Patch Changes

- 6d0d62dd: **feat:** new `useLogin` and `useSession` hooks
- Updated dependencies [6d0d62dd]
  - @lens-protocol/shared-kernel@0.11.0-alpha.2
  - @lens-protocol/domain@0.11.0-alpha.2

## 0.11.0-alpha.2

### Patch Changes

- 6f51659c: **fix:** adds missing `__typename` and expose `ProfileFields` from `Profile.invitedBy`

## 0.11.0-alpha.1

### Patch Changes

- 25fe9a46: Support for new v2 hooks
- Updated dependencies [25fe9a46]
  - @lens-protocol/domain@0.11.0-alpha.1
  - @lens-protocol/shared-kernel@0.11.0-alpha.1

## 0.11.0-alpha.0

### Minor Changes

- 731ff1d0: Added support for Lens Protocol v2

### Patch Changes

- Updated dependencies [731ff1d0]
  - @lens-protocol/shared-kernel@0.11.0-alpha.0
  - @lens-protocol/domain@0.11.0-alpha.0

## 0.10.1

### Patch Changes

- 5f251069: **Fixed** `usePublications` to refetch on `publicationIds` change
- dfb15e1a: **Fixed** 1.3.1-next.0 release packages bundles
- ebc2e7e5: **Added** `publicationsId` to `usePublications` args
- Updated dependencies [48dd0860]
  - @lens-protocol/domain@0.10.1

## 0.10.1-next.3

### Patch Changes

- Updated dependencies [48dd0860]
  - @lens-protocol/domain@0.10.1-next.0

## 0.10.1-next.2

### Patch Changes

- 5f251069: **Fixed** `usePublications` to refetch on `publicationIds` change

## 0.10.1-next.1

### Patch Changes

- dfb15e1a: **Fixed** 1.3.1-next.0 release packages bundles

## 0.10.1-next.0

### Patch Changes

- ebc2e7e5: **Added** `publicationsId` to `usePublications` args

## 0.10.0

### Minor Changes

- de401a59: **Added** support for optimized and transformed media inside publication and profile MediaSet
- e8dc3cd8: fixes collect/mirror count bug
- 3b67207b: **Added** `appId` to `Comment` and `Post`

### Patch Changes

- 40fce6ff: **Added** support for bookmarks: list, add, and remove from a Profile private list of publications
- ad797714: **Added** `useNotInterested` hook
- 773c2ed8: **Fixes** issues with `profileIds` not used to evaluate cache hits. Affecting `usePublications` and `useProfiles`.
- c2a91ef4: **Added** `Profile.invitedBy` field
- b7609fcb: **Fixed** `useNotification` to include `highSignalFilter` filter
- 636ff014: **Added** `profileIds` to `usePublications` hook
- 773c2ed8: **Added** missing `commentsOfOrdering` and `commentsRankingFilter` to `useComments` hook
- 19ed489e: **Added** `beforeCount` to all paginated hooks and refetch data on re-render of `usePublication` and `useProfile` hooks.
- 0f75f79d: **Added** experimental `useCurrentSession` hook
  **Fixed** issue with `Profile` entity being leaked by the `useWalletLogin` hook
  **Fixed** bug preventing logout on expired credentials detected at startup type
- d5efd895: **Fixed** crash caused by token-gated mismatch of publication author access condition"
- 773c2ed8: **Added** ability to override `sources` in `useExplorePublications` hook and support to `noRandomize` param.
- 773c2ed8: **Added** `name` support to non-collectable publications. Affects `useCreatePost`, `useCreateComment`, `useCreateEncryptedPost`, and `useCreateEncryptedComment`
- 125ec30c: **Fixed** `usePollDetails` to be robust to flagged or misconfigured Snapshot Proposals
- 6eaaaf22: **Added** `Profile.followNftAddress` field
- 4c4505d2: **Added** support for Profile Guardian
- Updated dependencies [40fce6ff]
- Updated dependencies [ad797714]
- Updated dependencies [3ffab7b9]
- Updated dependencies [0f75f79d]
- Updated dependencies [773c2ed8]
- Updated dependencies [433760f3]
- Updated dependencies [fc31f146]
- Updated dependencies [9428efeb]
- Updated dependencies [bdbc71d5]
- Updated dependencies [5943a0f0]
  - @lens-protocol/domain@0.10.0
  - @lens-protocol/shared-kernel@0.10.0

## 0.10.0-next.8

### Patch Changes

- Updated dependencies [bdbc71d5]
  - @lens-protocol/shared-kernel@0.10.0-next.2
  - @lens-protocol/domain@0.10.0-next.7

## 0.10.0-next.7

### Patch Changes

- Updated dependencies
  - @lens-protocol/shared-kernel@0.10.0-next.1
  - @lens-protocol/domain@0.10.0-next.6

## 0.10.0-next.6

### Patch Changes

- 773c2ed8: **Fixes** issues with `profileIds` not used to evaluate cache hits. Affecting `usePublications` and `useProfiles`.
- 773c2ed8: **Added** missing `commentsOfOrdering` and `commentsRankingFilter` to `useComments` hook
- 773c2ed8: **Added** ability to override `sources` in `useExplorePublications` hook and support to `noRandomize` param.
- 773c2ed8: **Added** `name` support to non-collectable publications. Affects `useCreatePost`, `useCreateComment`, `useCreateEncryptedPost`, and `useCreateEncryptedComment`
- Updated dependencies [773c2ed8]
  - @lens-protocol/domain@0.10.0-next.5

## 0.10.0-next.5

### Patch Changes

- 19ed489e: **Added** `beforeCount` to all paginated hooks and refetch data on re-render of `usePublication` and `useProfile` hooks.
- 6eaaaf22: **Added** `Profile.followNftAddress` field
- Updated dependencies [3ffab7b9]
  - @lens-protocol/domain@0.10.0-next.4

## 0.10.0-next.4

### Minor Changes

- e8dc3cd8: fixes collect/mirror count bug

### Patch Changes

- b7609fcb: **Fixed** `useNotification` to include `highSignalFilter` filter
- Updated dependencies [433760f3]
- Updated dependencies [fc31f146]
  - @lens-protocol/domain@0.10.0-next.3
  - @lens-protocol/shared-kernel@0.10.0-next.0

## 0.10.0-next.3

### Patch Changes

- Updated dependencies [9428efeb]
  - @lens-protocol/domain@0.9.1-next.2

## 0.10.0-next.2

### Minor Changes

- de401a59: **Added** support for optimized and transformed media inside publication and profile MediaSet
- 3b67207b: **Added** `appId` to `Comment` and `Post`

### Patch Changes

- 40fce6ff: **Added** support for bookmarks: list, add, and remove from a Profile private list of publications
- ad797714: **Added** `useNotInterested` hook
- 636ff014: **Added** `profileIds` to `usePublications` hook
- 125ec30c: **Fixed** `usePollDetails` to be robust to flagged or misconfigured Snapshot Proposals
- Updated dependencies [40fce6ff]
- Updated dependencies [ad797714]
  - @lens-protocol/domain@0.9.1-next.1

## 0.9.2-next.1

### Patch Changes

- d5efd895: **Fixed** crash caused by token-gated mismatch of publication author access condition"

## 0.9.1

### Patch Changes

- 06a30a2c: **Fixed** crash caused by token-gated mismatch of publication author access condition"

## 0.9.1-next.0

### Patch Changes

- c2a91ef4: **Added** `Profile.invitedBy` field
- 0f75f79d: **Added** experimental `useCurrentSession` hook
  **Fixed** issue with `Profile` entity being leaked by the `useWalletLogin` hook
  **Fixed** bug preventing logout on expired credentials detected at startup type
- 4c4505d2: **Added** support for Profile Guardian
- Updated dependencies [0f75f79d]
  - @lens-protocol/domain@0.9.1-next.0

## 0.9.0

### Minor Changes

- 225f0fa7: **Added** `usePollDetail` and `usePollVote` hooks

### Patch Changes

- 3025d56a: allow self funded fallback for proxy actions
- a899553c: **Fixed** missing cache item that causes logged out flow to not work as expected
- e4be6c07: **Updated** min Lens API supported version.
- 97ecba69: **Fixed** cache redirects for Publication and Profile
- Updated dependencies [55211083]
- Updated dependencies [3025d56a]
- Updated dependencies [1d99413a]
- Updated dependencies [225f0fa7]
- Updated dependencies [ea0b40e3]
- Updated dependencies [422c627e]
  - @lens-protocol/domain@0.9.0
  - @lens-protocol/shared-kernel@0.9.0

## 0.9.0-next.2

### Patch Changes

- a899553c: **Fixed** missing cache item that causes logged out flow to not work as expected
- Updated dependencies [ea0b40e3]
  - @lens-protocol/domain@0.9.0-next.2

## 0.8.1

### Patch Changes

- 58217985: **Fixed** missing cache item that causes logged out flow to not work as expected

## 0.9.0-next.1

### Minor Changes

- 225f0fa7: **Added** `usePollDetail` and `usePollVote` hooks

### Patch Changes

- 3025d56a: allow self funded fallback for proxy actions
- 97ecba69: **Fixed** cache redirects for Publication and Profile
- Updated dependencies [3025d56a]
- Updated dependencies [225f0fa7]
- Updated dependencies [422c627e]
  - @lens-protocol/domain@0.9.0-next.1
  - @lens-protocol/shared-kernel@0.9.0-next.0

## 0.8.1-next.0

### Patch Changes

- Updated dependencies [55211083]
  - @lens-protocol/domain@0.8.1-next.0

## 0.8.0

### Minor Changes

- 03a8ad5: **Deprecated** publication's `isOptimisticMirroredByMe` property, introduced `isMirroredByMe`
- 513373d: **Enhanced** publication's `hasCollectedByMe` to replace deprecated `hasOptimisticCollectedByMe` property
- 98c6547: **Added:** support to fetch results before the current results set
- c416a2e: **Added:** self-fund protocol calls when subsidized approaches fails
- c416a2e: **Fixed:** ensures correct chain when signing typed data
- c416a2e: **Fixed:** network switch in wagmi bindings
- ef1d7e2: **Added:** Momoka support to React hooks
- 5c5bfb2: **Added:** support for SimpleCollectModule

### Patch Changes

- 37bf8e8: Do not fallback to `undefined` with unsupported collect module in collect policy
- 04647bb: **Fixed** issue preventing query hook from detecting active profile changes
- Updated dependencies [c416a2e]
- Updated dependencies [ef1d7e2]
- Updated dependencies [b738abb]
- Updated dependencies [5c5bfb2]
- Updated dependencies [71196cf]
  - @lens-protocol/shared-kernel@0.8.0
  - @lens-protocol/domain@0.8.0

## 0.8.0-next.4

### Patch Changes

- 37bf8e8: Do not fallback to `undefined` with unsupported collect module in collect policy

## 0.8.0-next.3

### Minor Changes

- 5c5bfb2: Added support for SimpleCollectModule

### Patch Changes

- Updated dependencies [b738abb]
- Updated dependencies [5c5bfb2]
  - @lens-protocol/shared-kernel@0.8.0-next.1
  - @lens-protocol/domain@0.8.0-next.3

## 0.8.0-next.2

### Minor Changes

- ef1d7e2: Added Momoka support to React hooks

### Patch Changes

- Updated dependencies [ef1d7e2]
  - @lens-protocol/domain@0.8.0-next.2

## 0.8.0-next.1

### Minor Changes

- 03a8ad5: Deprecated publication's `isOptimisticMirroredByMe` property, introduced `isMirroredByMe`

### Patch Changes

- Updated dependencies [71196cf]
  - @lens-protocol/domain@0.8.0-next.1

## 0.8.0-next.0

### Minor Changes

- 513373d3: Enhanced publication's hasCollectedByMe to replace deprecated hasOptimisticCollectedByMe property
- c416a2ea:
  - **Added:** self-fund protocol calls when subsidized approaches fails
  - **Fixed:** ensures correct chain when signing typed data
  - **Fixed:** network switch in wagmi bindings

### Patch Changes

- 04647bbe: **Fixed** issue preventing query hook from detecting active profile changes
- Updated dependencies [c416a2ea]
  - @lens-protocol/shared-kernel@0.8.0-next.0
  - @lens-protocol/domain@0.8.0-next.0

## 0.7.1

### Patch Changes

- 425daba: **Fixed** 1.0.0 release packages bundles
- Updated dependencies [425daba]
  - @lens-protocol/domain@0.7.1
  - @lens-protocol/shared-kernel@0.7.1

## 0.7.0

### Minor Changes

- 37eaf8a: Added TSDoc, use shared tsconfig, better types

### Patch Changes

- 6ae90ef: Exposed collectNftAddress from publication fragments
- a4e9500: allow to define sortCriteria for useExploreProfiles
- Updated dependencies [37eaf8a]
  - @lens-protocol/shared-kernel@0.7.0
  - @lens-protocol/domain@0.7.0

## 0.7.0-beta.0

### Minor Changes

- dc1350d: Added TSDoc, use shared tsconfig, better types

### Patch Changes

- 6ae90ef: Exposed `collectNftAddress` from publication fragments
- a4e9500: allow to define `sortCriteria` for `useExploreProfiles`
- Updated dependencies [dc1350d]
  - @lens-protocol/shared-kernel@0.7.0-beta.0
  - @lens-protocol/domain@0.7.0-beta.0

## 0.6.0

### Patch Changes

- Updated dependencies [4475a27]
  - @lens-protocol/domain@0.6.0
  - @lens-protocol/shared-kernel@0.6.0

## 0.5.1

### Patch Changes

- @lens-protocol/domain@0.5.1
- @lens-protocol/shared-kernel@0.5.1

## 0.5.0

### Patch Changes

- @lens-protocol/domain@0.5.0
- @lens-protocol/shared-kernel@0.5.0

## 0.4.1

### Patch Changes

- @lens-protocol/domain@0.4.1
- @lens-protocol/shared-kernel@0.4.1

## 0.4.0

### Patch Changes

- @lens-protocol/domain@0.4.0
- @lens-protocol/shared-kernel@0.4.0

## 0.3.0

### Patch Changes

- @lens-protocol/domain@0.3.0
- @lens-protocol/shared-kernel@0.3.0

## 0.2.0

### Patch Changes

- Updated dependencies [c89aed9]
- Updated dependencies [a921c32]
  - @lens-protocol/shared-kernel@1.0.0
  - @lens-protocol/domain@1.0.0

## 0.1.1

### Patch Changes

- @lens-protocol/domain@0.1.1
- @lens-protocol/shared-kernel@0.1.1

## 0.1.0

First developer preview release
