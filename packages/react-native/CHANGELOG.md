# @lens-protocol/react-native

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
