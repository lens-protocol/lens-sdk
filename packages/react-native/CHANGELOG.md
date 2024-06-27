# @lens-protocol/react-native

## 2.3.1

### Patch Changes

- 73c1bfebe: **fix:** expose PublicationOperations#hasQuoted flag.
- 7f080c11b: **fix:** adds `ProfileOperations.hasBlockedMe` field.
- Updated dependencies [73c1bfebe]
- Updated dependencies [7f080c11b]
  - @lens-protocol/api-bindings@0.12.3
  - @lens-protocol/react@2.3.1

## 2.3.0

### Minor Changes

- d8b19df55: **feat:** adds React Suspense support to `usePublications` hook
- 53071caf2: **feat:** adds React Suspense support to `useSearchProfiles` hook
- 032c71c3d: **feat:** add React Suspense support to `useProfileFollowers` and `useProfileFollowing` hooks
- 3ffa19856: **feat:** add React Suspense support to `useProfiles` hook
- 980e3271c: **feat:** add React Suspense support to `useSearchPublications` hook
- 697eca13a: **feat:** add React Suspense support to `useExplorePublications`, `useExploreProfiles`, `useRecommendedProfiles` hooks
- b1cb9e78c: **feat:** experimental React Suspense support in `usePublication` hook

### Patch Changes

- 21f652d22: **fix:** custom origin header important for react native usecase
- 1f34162dc: **fix:** refresh profile following after a follow or unfollow
- 46a648de2: **feat:** add React Suspense support to `useFeed` hook
- fcd04e356: **fixes:** typedoc for some hooks
- Updated dependencies [21f652d22]
- Updated dependencies [d8b19df55]
- Updated dependencies [53071caf2]
- Updated dependencies [032c71c3d]
- Updated dependencies [3ffa19856]
- Updated dependencies [1f34162dc]
- Updated dependencies [980e3271c]
- Updated dependencies [697eca13a]
- Updated dependencies [b1cb9e78c]
- Updated dependencies [46a648de2]
- Updated dependencies [fcd04e356]
  - @lens-protocol/api-bindings@0.12.2
  - @lens-protocol/react@2.3.0

## 2.2.0

### Minor Changes

- 8d4e958e0: **feat:** experimental React Suspense support in `useProfile` hook
- 1e6b96c67: **feat:** added hooks to manage profile interests: useAddProfileInterests and useRemoveProfileInterests

### Patch Changes

- 8bc1cf3ba: **fix:** make sure initial value is returned by `useAccessToken`, `useRefreshToken`, and `useIdentityToken` in all circumstances
- 2edd76361: **feat:** added globalStats alias to publication and profile stats
- b1e474862: **chore:** remove unused error details
- 0d9bd97bd: **fix:** `useCreateProfile` fails w/ `InvariantError` on first Profile created
- Updated dependencies [8d4e958e0]
- Updated dependencies [8bc1cf3ba]
- Updated dependencies [2edd76361]
- Updated dependencies [b1e474862]
- Updated dependencies [0d9bd97bd]
- Updated dependencies [1e6b96c67]
  - @lens-protocol/react@2.2.0
  - @lens-protocol/api-bindings@0.12.1
  - @lens-protocol/domain@0.12.0

## 2.1.1

### Patch Changes

- 577b6457e: **chore:** make @lens-protocol/metadata a direct dependency
- 0c3d24594: **feat:** adds `useRefreshToken` experimental hook
- Updated dependencies [577b6457e]
- Updated dependencies [0c3d24594]
  - @lens-protocol/react@2.1.1

## 2.1.0

### Minor Changes

- 1d99b37c9: **feat:** adds `useLatestPaidActions` hook
- 05b23041f: **feat:** experimental React Suspense support in `useSession` hook
- ce997e7fd: **chore:** updated development environment to Amoy testnet

### Patch Changes

- 10757c9cf: **feat:** aligns testnet handle namespace to mainnet (i.e., `lens/`)
- 8af3e82ac: **fix:** allows signless init of sponsored Open Action and Reference modules
- Updated dependencies [8c2768dd6]
- Updated dependencies [10757c9cf]
- Updated dependencies [1d99b37c9]
- Updated dependencies [05b23041f]
- Updated dependencies [ce997e7fd]
- Updated dependencies [8af3e82ac]
  - @lens-protocol/api-bindings@0.12.0
  - @lens-protocol/react@2.1.0
  - @lens-protocol/shared-kernel@0.12.0
  - @lens-protocol/domain@0.11.1
  - @lens-protocol/storage@0.8.1

## 2.0.0

This is a stable release, marking the closure of the alpha prerelease.

## 2.0.0-alpha.38

### Minor Changes

- 880fb5de3: **feat:** supports Unknown Reference modules

### Patch Changes

- 8dcaeda61: **chore:** remove unused local-only field
- Updated dependencies [8dcaeda61]
- Updated dependencies [880fb5de3]
  - @lens-protocol/api-bindings@0.11.0-alpha.34
  - @lens-protocol/react@2.0.0-alpha.38
  - @lens-protocol/domain@0.11.0-alpha.27

## 2.0.0-alpha.37

### Minor Changes

- cdaf25268: **feat:** added `useSignFrameAction` hook
  **feat:** added `useIdentityToken` hook

### Patch Changes

- dbb1657e3: **fix:** adds missing `small` and `medium` aliases to `EncryptedImageSet` and `ImageSet` fragments.
- 95f361c8b: **fix:** `useAccessToken` not picking up all possible token changes
- 69c04be1d: **fix:** proactive refresh credentials
- 4183f686a: **chore:** exported missing gql types
- Updated dependencies [cdaf25268]
- Updated dependencies [dbb1657e3]
- Updated dependencies [95f361c8b]
- Updated dependencies [69c04be1d]
- Updated dependencies [4183f686a]
  - @lens-protocol/api-bindings@0.11.0-alpha.33
  - @lens-protocol/domain@0.11.0-alpha.26
  - @lens-protocol/react@2.0.0-alpha.37

## 0.1.0-alpha.13

### Minor Changes

- 177879d07: **feat:** adds experimental `useOptimisticCreatePost` hook
- 8fbfdc9d4: **feat:** added `useRateLimits` hook
- 840208f26: **feat:** added `resolveCollectPolicy` helper and exchange rate details

### Patch Changes

- 54f0be643: **feat:** add optimistic updates for publication stats
- f95ed6f5a: **feat:** refetch profile stats after content creation
- Updated dependencies [177879d07]
- Updated dependencies [54f0be643]
- Updated dependencies [f95ed6f5a]
- Updated dependencies [8fbfdc9d4]
- Updated dependencies [840208f26]
  - @lens-protocol/react@2.0.0-alpha.36
  - @lens-protocol/shared-kernel@0.11.0-alpha.12
  - @lens-protocol/api-bindings@0.11.0-alpha.32
  - @lens-protocol/domain@0.11.0-alpha.25
  - @lens-protocol/storage@0.8.0-alpha.11

## 0.1.0-alpha.12

### Minor Changes

- 8869b5819: **feat:** added `useRecommendProfileToggle` hook

### Patch Changes

- 36a077785: **fix:** useUpdateProfileManagers preconditions logic when approving signless
- 0e9de6f2a: **fix:** nonce management for link/unlink handles and unfollow profile
- Updated dependencies [8869b5819]
- Updated dependencies [36a077785]
- Updated dependencies [0e9de6f2a]
  - @lens-protocol/api-bindings@0.11.0-alpha.31
  - @lens-protocol/domain@0.11.0-alpha.24
  - @lens-protocol/react@2.0.0-alpha.35

## 0.1.0-alpha.11

### Minor Changes

- a98f6ad4e: **feat:** allow to overwrite all onchain transactions to be self-funded on the config level
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
- f71cff84b: **fix:** missing export of `OptimisticStatusResult` type
- 71a668156: **fix:** exports `CollectModuleSettings` type
- 87f6da539: **fix:** allows to define Origin header from React Native integrations
- Updated dependencies [a98f6ad4e]
- Updated dependencies [9a7edace3]
- Updated dependencies [5ecead02d]
- Updated dependencies [71a668156]
- Updated dependencies [6c75a89e8]
- Updated dependencies [9a7edace3]
- Updated dependencies [6fdfe12bc]
- Updated dependencies [9a7edace3]
- Updated dependencies [f71cff84b]
- Updated dependencies [71a668156]
- Updated dependencies [7cd6bad82]
- Updated dependencies [87f6da539]
  - @lens-protocol/domain@0.11.0-alpha.23
  - @lens-protocol/react@2.0.0-alpha.34
  - @lens-protocol/api-bindings@0.11.0-alpha.30
  - @lens-protocol/shared-kernel@0.11.0-alpha.11
  - @lens-protocol/storage@0.8.0-alpha.10

## 0.1.0-alpha.10

### Patch Changes

- Updated dependencies [9691cdccc]
  - @lens-protocol/shared-kernel@0.11.0-alpha.10
  - @lens-protocol/api-bindings@0.11.0-alpha.29
  - @lens-protocol/domain@0.11.0-alpha.22
  - @lens-protocol/react@2.0.0-alpha.33
  - @lens-protocol/storage@0.7.5-alpha.9

## 0.1.0-alpha.9

### Patch Changes

- 7b1cbde5d: **fix:** TSDoc and better exporting of shared parts
- Updated dependencies [7b1cbde5d]
  - @lens-protocol/react@2.0.0-alpha.32

## 0.1.0-alpha.8

### Minor Changes

- da4c26e34: **feat:** Added `useLazyProfilesManaged` hook
- 9c7fd3ee3: **feat:** `useCreateProfile` hook

### Patch Changes

- 66c6df157: **fixed:** make `useAccessToken` reactive
- Updated dependencies [da4c26e34]
- Updated dependencies [66c6df157]
- Updated dependencies [9c7fd3ee3]
  - @lens-protocol/react@2.0.0-alpha.31
  - @lens-protocol/api-bindings@0.11.0-alpha.28
  - @lens-protocol/domain@0.11.0-alpha.21

## 0.1.0-alpha.7

### Minor Changes

- 9aa0fb780: **chore:** unified implementation and naming of `isValidHandle` helper among react and client SDKs. deprecated `isValidProfileHandle` in the client sdk.
  **feat:** added `useValidateHandle` hook

### Patch Changes

- bd5a1da6a: **fix:** locks `@apollo/client` to 3.8.x until issues w/ 3.9.x are solved
- Updated dependencies [9aa0fb780]
- Updated dependencies [bd5a1da6a]
  - @lens-protocol/api-bindings@0.11.0-alpha.27
  - @lens-protocol/react@2.0.0-alpha.30

## 0.1.0-alpha.6

### Minor Changes

- a3b29e541: **feat:** adds `resolveReferencePolicy` helper to create developer friendly ReferencePolicy out of publication sparse ReferenceModule
- eb6a8f07c: **feat:** `useCreatePost` takes Open Action Modules Metadata into consideration when determining sponsored/signless experience
- 79068cd37: feat: added `useReportProfile` hook
  chore: renamed `ReportReason` to `PublicationReportReason`, deprecate `ReportReason`

### Patch Changes

- a3b29e541: **fix:** adds missing `publication.operations.canQuote` field
- a58d45417: **fix:** `useOpenAction` takes Unknown Open Action Modules' `sponsoredApproved` and `signlessApproved` flags
- aa6669306: **fix:** supports `referrers` with Unknown Open Action module via `useOpenAction`
- Updated dependencies [a3b29e541]
- Updated dependencies [a3b29e541]
- Updated dependencies [a58d45417]
- Updated dependencies [aa6669306]
- Updated dependencies [eb6a8f07c]
- Updated dependencies [79068cd37]
  - @lens-protocol/react@2.0.0-alpha.29
  - @lens-protocol/api-bindings@0.11.0-alpha.26
  - @lens-protocol/domain@0.11.0-alpha.20

## 0.1.0-alpha.5

### Minor Changes

- bb9a8dd7b: **feat:** introduces `params.statsFor` and `params.profile.metadataSource` in `LensConfig`
- b647eab70: **feat:** Introduced `debug` mode. Exported `ConsoleLogger`.
- 6a4df1bdb: **feat:** support Unknown Follow Modules

### Patch Changes

- 1a97c390a: **chore:** Removed peer dependency on ethers@5
- 821d8c492: **fix:** supports User Rejection error from Wallet that despite returning correct error code are NOT recognized by `ethers` (v5)
- c2b05bdf0: **Fixed**: missing export of `findCollectModuleSettings` and `isCollectModuleSettings` helpers
- 74751f359: feat: Expose `erc20Amount` helper to make working with API Amounts easier
- c2b05bdf0: **fixed:** return type of `useLazyModuleMetadata`
- c2b05bdf0: **fix:** exports missing `AsyncTransactionResult`
- c2b05bdf0: **fix:** exports missing `ProfileFields` type
- Updated dependencies [bb9a8dd7b]
- Updated dependencies [1a97c390a]
- Updated dependencies [821d8c492]
- Updated dependencies [c2b05bdf0]
- Updated dependencies [b647eab70]
- Updated dependencies [74751f359]
- Updated dependencies [c2b05bdf0]
- Updated dependencies [c2b05bdf0]
- Updated dependencies [6a4df1bdb]
- Updated dependencies [c2b05bdf0]
  - @lens-protocol/api-bindings@0.11.0-alpha.25
  - @lens-protocol/react@2.0.0-alpha.28
  - @lens-protocol/shared-kernel@0.11.0-alpha.9
  - @lens-protocol/domain@0.11.0-alpha.19
  - @lens-protocol/storage@0.7.5-alpha.8

## 0.1.0-alpha.4

### Minor Changes

- 481e1d7aa: **feat:** adds `useResolveAddress` hook

### Patch Changes

- c074c4ded: **fixed:** issue #777
- fa944c274: **fixed:** TSDocs typos/mistakes
- Updated dependencies [481e1d7aa]
- Updated dependencies [c074c4ded]
- Updated dependencies [fa944c274]
  - @lens-protocol/react@2.0.0-alpha.27
  - @lens-protocol/api-bindings@0.11.0-alpha.24

## 0.1.0-alpha.3

### Minor Changes

- dd2f7d246: feat: adds self-funded support for unfollow
- a21256702: **feat:** `useModuleMetadata`, `useLazyModuleMetadata` and surfaces new unknown modules fields

### Patch Changes

- 21c643d0c: **fix:** Revoke credentials only on user initiated logout
- Updated dependencies [dd2f7d246]
- Updated dependencies [a21256702]
- Updated dependencies [750767231]
- Updated dependencies [21c643d0c]
- Updated dependencies [78d95a3d0]
  - @lens-protocol/domain@0.11.0-alpha.18
  - @lens-protocol/react@2.0.0-alpha.26
  - @lens-protocol/api-bindings@0.11.0-alpha.23

## 0.1.0-alpha.2

### Minor Changes

- d255b3627: **feat:** Added `useDismissRecommendedProfiles` hook

### Patch Changes

- daf688200: **fixed:** logic that infers when to create Momoka publications
- Updated dependencies [daf688200]
- Updated dependencies [d255b3627]
- Updated dependencies [dd5088811]
- Updated dependencies [c6da5071d]
- Updated dependencies [b8279c3bd]
  - @lens-protocol/react@2.0.0-alpha.25
  - @lens-protocol/domain@0.11.0-alpha.17
  - @lens-protocol/api-bindings@0.11.0-alpha.22

## 0.0.1-alpha.1

### Patch Changes

- 9b0ad4a1a: **fix:** Added session revoke on logout + more logout improvements
- dd2ab15a5: **feat:** Ensured interoperability between Client and React SDKs, exported `localStorage()`, added new hook `useStorage`
- f2010c008: **fix:** `LensClient` and Lens React Hooks interoperability
- Updated dependencies [2becf4650]
- Updated dependencies [336c19f09]
- Updated dependencies [9b0ad4a1a]
- Updated dependencies [dd2ab15a5]
- Updated dependencies [f2010c008]
  - @lens-protocol/domain@0.11.0-alpha.16
  - @lens-protocol/react@2.0.0-alpha.24
  - @lens-protocol/api-bindings@0.11.0-alpha.21
  - @lens-protocol/storage@0.7.5-alpha.7

## 0.0.1-alpha.0

### Minor Changes

- acfad683: **feat:** initial version of `@lens-protocol/react-native` package
- 493895b8: **feat:** self-funded `useFollow`
- b37f6f4e: **feat:** self-funded `useSetProfileMetadata`

### Patch Changes

- Updated dependencies [acfad683]
- Updated dependencies [493895b8]
- Updated dependencies [acfad683]
- Updated dependencies [fdd0073d]
- Updated dependencies [5d243a83]
- Updated dependencies [b29efcb2]
- Updated dependencies [0a3a61fb]
- Updated dependencies [b37f6f4e]
- Updated dependencies [2e351a8c]
- Updated dependencies [2698fc65]
- Updated dependencies [6a25dc02]
- Updated dependencies [40abddd9]
- Updated dependencies [d0bad262]
  - @lens-protocol/react@2.0.0-alpha.23
  - @lens-protocol/domain@0.11.0-alpha.15
  - @lens-protocol/api-bindings@0.11.0-alpha.20
