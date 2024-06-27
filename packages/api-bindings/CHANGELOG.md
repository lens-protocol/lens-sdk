# @lens-protocol/api-bindings

## 0.12.3

### Patch Changes

- 73c1bfebe: **fix:** expose PublicationOperations#hasQuoted flag.
- 7f080c11b: **fix:** adds `ProfileOperations.hasBlockedMe` field.

## 0.12.2

### Patch Changes

- 21f652d22: **fix:** custom origin header important for react native usecase

## 0.12.1

### Patch Changes

- 2edd76361: **feat:** added globalStats alias to publication and profile stats
- Updated dependencies [b1e474862]
- Updated dependencies [1e6b96c67]
  - @lens-protocol/domain@0.12.0

## 0.12.0

### Minor Changes

- ce997e7fd: **chore:** updated development environment to Amoy testnet

### Patch Changes

- 8c2768dd6: **feat:** enabled profile field policy
- 1d99b37c9: **feat:** adds `useLatestPaidActions` hook
- 05b23041f: **feat:** experimental React Suspense support in `useSession` hook
- Updated dependencies [ce997e7fd]
  - @lens-protocol/shared-kernel@0.12.0
  - @lens-protocol/domain@0.11.1

## 0.11.0

This is a stable release, marking the closure of the alpha prerelease.

## 0.11.0-alpha.34

### Patch Changes

- 8dcaeda61: **chore:** remove unused local-only field
- 880fb5de3: **feat:** supports Unknown Reference modules
- Updated dependencies [880fb5de3]
  - @lens-protocol/domain@0.11.0-alpha.27

## 0.11.0-alpha.33

### Minor Changes

- cdaf25268: **feat:** added `useSignFrameAction` hook
  **feat:** added `useIdentityToken` hook

### Patch Changes

- dbb1657e3: **fix:** adds missing `small` and `medium` aliases to `EncryptedImageSet` and `ImageSet` fragments.
- 4183f686a: **chore:** exported missing gql types
- Updated dependencies [cdaf25268]
  - @lens-protocol/domain@0.11.0-alpha.26

## 0.11.0-alpha.32

### Minor Changes

- 8fbfdc9d4: **feat:** added `useRateLimits` hook
- 840208f26: **feat:** added `resolveCollectPolicy` helper and exchange rate details

### Patch Changes

- 177879d07: **feat:** adds experimental `useOptimisticCreatePost` hook
- 54f0be643: **feat:** add optimistic updates for publication stats
- Updated dependencies [177879d07]
  - @lens-protocol/shared-kernel@0.11.0-alpha.12
  - @lens-protocol/domain@0.11.0-alpha.25

## 0.11.0-alpha.31

### Minor Changes

- 8869b5819: **feat:** added `useRecommendProfileToggle` hook

### Patch Changes

- Updated dependencies [8869b5819]
  - @lens-protocol/domain@0.11.0-alpha.24

## 0.11.0-alpha.30

### Minor Changes

- 5ecead02d: **breaking:** Remove all what was marked as deprecated. See the detailed list below. Prepare for the major release.

  React SDKs:

  - removed `NoFeeFollowPolicy`, use `NoFollowPolicy` instead
  - removed from fragments: `followModuleReturnData`, `referenceModuleReturnData`, `openActionModuleReturnData`
  - removed `useMyBookmarks`, use `useBookmarks` instead

  Client SDK:

  - removed from `LensClientConfig`:

    - `mediaTransforms`, use the `params` option instead.
    - `origin`, use the `headers` option instead

  - removed from fragments:

    - `followModuleReturnData`, `referenceModuleReturnData`, `openActionModuleReturnData`
    - `image.transformed`, use `image.small`, `image.medium` or `image.thumbnail` instead
    - `upvoteReactions`, `downvoteReactions`, `upvoteReacted`, `downvoteReacted`, use `upvotes`, `downvotes`, `upvoted`, `downvoted` instead

  - removed `nfts.ownershipChallenge`
  - removed `isValidProfileHandle`, use `isValidHandle` instead

- 7cd6bad82: **feat:** Added `useHideCommentToggle` hook

### Patch Changes

- 9a7edace3: **fix:** pagination issue affecting many hooks
- 71a668156: **fix:** optimistic update of `Comment|Post|Quote.operations.hasCollected` field
- 6c75a89e8: **feat:** added new fields:

  - `lensClassifierScore` on ProfileStats
  - `collectNft` on all relevant OpenActionSettings
  - `isEncrypted`, `profilesMentioned` and `hashtagsMentioned` on Post, Comment and Quote

- 9a7edace3: **fix:** `useCurrencies` pagination
- 6fdfe12bc: **feat:** introduced `fiatAmount` helper
- 9a7edace3: **chore:** updade Apollo Client dependency to ^3.9.5
- 87f6da539: **fix:** allows to define Origin header from React Native integrations
- Updated dependencies [a98f6ad4e]
- Updated dependencies [5ecead02d]
- Updated dependencies [6fdfe12bc]
  - @lens-protocol/domain@0.11.0-alpha.23
  - @lens-protocol/shared-kernel@0.11.0-alpha.11

## 0.11.0-alpha.29

### Patch Changes

- Updated dependencies [9691cdccc]
  - @lens-protocol/shared-kernel@0.11.0-alpha.10
  - @lens-protocol/domain@0.11.0-alpha.22

## 0.11.0-alpha.28

### Patch Changes

- 66c6df157: **fixed:** make `useAccessToken` reactive
- 9c7fd3ee3: **feat:** `useCreateProfile` hook
- Updated dependencies [9c7fd3ee3]
  - @lens-protocol/domain@0.11.0-alpha.21

## 0.11.0-alpha.27

### Minor Changes

- 9aa0fb780: **chore:** unified implementation and naming of `isValidHandle` helper among react and client SDKs. deprecated `isValidProfileHandle` in the client sdk.
  **feat:** added `useValidateHandle` hook

### Patch Changes

- bd5a1da6a: **fix:** locks `@apollo/client` to 3.8.x until issues w/ 3.9.x are solved

## 0.11.0-alpha.26

### Minor Changes

- 79068cd37: feat: added `useReportProfile` hook
  chore: renamed `ReportReason` to `PublicationReportReason`, deprecate `ReportReason`

### Patch Changes

- a3b29e541: **feat:** adds `resolveReferencePolicy` helper to create developer friendly ReferencePolicy out of publication sparse ReferenceModule
- a58d45417: **fix:** `useOpenAction` takes Unknown Open Action Modules' `sponsoredApproved` and `signlessApproved` flags
- aa6669306: **fix:** supports `referrers` with Unknown Open Action module via `useOpenAction`
- eb6a8f07c: **feat:** `useCreatePost` takes Open Action Modules Metadata into consideration when determining sponsored/signless experience
- Updated dependencies [a3b29e541]
- Updated dependencies [aa6669306]
- Updated dependencies [eb6a8f07c]
- Updated dependencies [79068cd37]
  - @lens-protocol/domain@0.11.0-alpha.20

## 0.11.0-alpha.25

### Minor Changes

- bb9a8dd7b: **feat:** introduces `params.statsFor` and `params.profile.metadataSource` in `LensConfig`

### Patch Changes

- c2b05bdf0: **Fixed**: missing export of `findCollectModuleSettings` and `isCollectModuleSettings` helpers
- 74751f359: feat: Expose `erc20Amount` helper to make working with API Amounts easier
- 6a4df1bdb: **feat:** support Unknown Follow Modules
- Updated dependencies [1a97c390a]
- Updated dependencies [b647eab70]
  - @lens-protocol/shared-kernel@0.11.0-alpha.9
  - @lens-protocol/domain@0.11.0-alpha.19

## 0.11.0-alpha.24

### Patch Changes

- 481e1d7aa: **feat:** adds `useResolveAddress` hook

## 0.11.0-alpha.23

### Patch Changes

- a21256702: **feat:** `useModuleMetadata`, `useLazyModuleMetadata` and surfaces new unknown modules fields
- Updated dependencies [dd2f7d246]
- Updated dependencies [21c643d0c]
- Updated dependencies [78d95a3d0]
  - @lens-protocol/domain@0.11.0-alpha.18

## 0.11.0-alpha.22

### Patch Changes

- Updated dependencies [d255b3627]
- Updated dependencies [dd5088811]
- Updated dependencies [c6da5071d]
- Updated dependencies [b8279c3bd]
  - @lens-protocol/domain@0.11.0-alpha.17

## 0.11.0-alpha.21

### Patch Changes

- 9b0ad4a1a: **fix:** Added session revoke on logout + more logout improvements
- Updated dependencies [2becf4650]
- Updated dependencies [336c19f09]
- Updated dependencies [9b0ad4a1a]
  - @lens-protocol/domain@0.11.0-alpha.16

## 0.11.0-alpha.20

### Patch Changes

- acfad683: **fix:** React Hooks SDK startup time. 20x faster than before.
- 0a3a61fb: **feat:** advanced contract condition for token-gated publications
- 6a25dc02: **feat:** support self-funded `useOpenAction`
- d0bad262: **feat:** Added `useLastLoggedInProfile` hook
- Updated dependencies [493895b8]
- Updated dependencies [fdd0073d]
- Updated dependencies [5d243a83]
- Updated dependencies [b37f6f4e]
- Updated dependencies [2698fc65]
- Updated dependencies [6a25dc02]
- Updated dependencies [40abddd9]
  - @lens-protocol/domain@0.11.0-alpha.15

## 0.11.0-alpha.19

### Patch Changes

- 4166f51f8: **feat:** Added experimental `useLazyProfiles` and `useLazyPublications` hooks
- 5c429a0d7: **feat:** Added new invite hooks: `useInvitedProfiles`, `useWasWalletInvited`, `useLazyWasWalletInvited` and `useInviteWallets`
- Updated dependencies [5c429a0d7]
  - @lens-protocol/domain@0.11.0-alpha.14

## 0.11.0-alpha.18

### Patch Changes

- 3bf2e33dc: **feat:** Added `useBlockedProfiles` hook
  **chore:** Renamed `useMyBookmarks` to `useBookmarks`, deprecated `useMyBookmarks`
  **feat:** Added authentication checks to many hooks that require it on the API side
- c9b5c8d88: **feat:** seamless support for public collect/act in `useOpenAction`
- Updated dependencies [d71f981cc]
- Updated dependencies [c9b5c8d88]
  - @lens-protocol/shared-kernel@0.11.0-alpha.8
  - @lens-protocol/domain@0.11.0-alpha.13

## 0.11.0-alpha.17

### Patch Changes

- 2f5360796: **fix:** fixes silent token-refresh logic so that, if refresh token is still valid, a silent refresh of tokens takes places and failed requests are retried seamlessly
- 3a9720968: **feat:** Added `isLensManager` to `ProfileManager` fragment
- 5d95eccd2: **feat:** Added `useProfilesManaged` hook
- Updated dependencies [2f5360796]
  - @lens-protocol/shared-kernel@0.11.0-alpha.7
  - @lens-protocol/domain@0.11.0-alpha.12

## 0.11.0-alpha.16

### Minor Changes

- cf250df4: implements `useUnblockProfiles`
- 9490db8e: Added useLinkHandle and useUnlinkHandle hooks

### Patch Changes

- 91bd7229: Removed deprecated `useNotInterested`, use `useNotInterestedToggle` instead
  Removed deprecated `useFollowProfile`, use `useFollow` instead
  Removed deprecated `useUnfollowProfile`, use `useUnfollow` instead
- 1f28c6d6: Added useCreateQuote hook
- Updated dependencies [cf250df4]
- Updated dependencies [1f28c6d6]
- Updated dependencies [9490db8e]
- Updated dependencies [cf250df4]
  - @lens-protocol/domain@0.11.0-alpha.11

## 0.11.0-alpha.15

### Patch Changes

- becb6338: Updated to latest API schema to use correct legacy collect typed data
- 86fa12e0: **fix:** all paginated queries that accidentally overwrite each other when using same hook twice

## 0.11.0-alpha.14

### Minor Changes

- 8120f676: **feat:** reintroduces `useAccessToken` and `useApolloClient` hooks
- 8120f676: **feat:** implements `useClaimHandle`, `useCanClaimHandle`, and `useUpgradeCredentials`

### Patch Changes

- 061df834: **chore:** configure Lens API v2 production URL
- Updated dependencies [8120f676]
- Updated dependencies [8120f676]
- Updated dependencies [061df834]
- Updated dependencies [8120f676]
  - @lens-protocol/domain@0.11.0-alpha.10
  - @lens-protocol/shared-kernel@0.11.0-alpha.6

## 0.11.0-alpha.13

### Patch Changes

- 5f93ea77: **fix:** support `Profile.lensManager` into `Profile.signless` renaming
- 5f93ea77: **fix:** support new `HandleInfo`
- 5f93ea77: **fix:** renames of `handleLinkToProfile`, `handleUnlinkToProfile` and correlated mutations, types
- 5f93ea77: **fix:** supports `MetadataAttribute.type`
- 5f93ea77: **fix:** adds `type` to Open Action module settings types
- Updated dependencies [5f93ea77]
- Updated dependencies [5f93ea77]
  - @lens-protocol/domain@0.11.0-alpha.9

## 0.11.0-alpha.12

### Patch Changes

- Update dependencies
- Updated dependencies
  - @lens-protocol/domain@0.11.0-alpha.8

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
