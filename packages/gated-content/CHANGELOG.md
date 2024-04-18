# @lens-protocol/gated-content

## 0.5.1

### Patch Changes

- 577b6457e: **chore:** make @lens-protocol/metadata a direct dependency

## 0.5.0

### Minor Changes

- ce997e7fd: **chore:** updated development environment to Amoy testnet

### Patch Changes

- Updated dependencies [ce997e7fd]
  - @lens-protocol/shared-kernel@0.12.0
  - @lens-protocol/storage@0.8.1

## 0.4.0

This is a stable release, marking the closure of the alpha prerelease.

## 0.4.0-alpha.23

### Patch Changes

- 177879d07: **feat:** adds experimental `useOptimisticCreatePost` hook
- Updated dependencies [177879d07]
  - @lens-protocol/shared-kernel@0.11.0-alpha.12
  - @lens-protocol/storage@0.8.0-alpha.11

## 0.4.0-alpha.22

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

### Patch Changes

- Updated dependencies [5ecead02d]
- Updated dependencies [6fdfe12bc]
  - @lens-protocol/shared-kernel@0.11.0-alpha.11
  - @lens-protocol/storage@0.8.0-alpha.10

## 0.3.3-alpha.21

### Patch Changes

- Updated dependencies [9691cdccc]
  - @lens-protocol/shared-kernel@0.11.0-alpha.10
  - @lens-protocol/storage@0.7.5-alpha.9

## 0.3.3-alpha.20

### Patch Changes

- 1a97c390a: **chore:** Removed peer dependency on ethers@5
- Updated dependencies [1a97c390a]
- Updated dependencies [b647eab70]
  - @lens-protocol/shared-kernel@0.11.0-alpha.9
  - @lens-protocol/storage@0.7.5-alpha.8

## 0.3.3-alpha.19

### Patch Changes

- 913bc91af: **fixed:** misconfiguration of Lit Access Control contract address

## 0.3.3-alpha.18

### Patch Changes

- Updated dependencies [9b0ad4a1a]
- Updated dependencies [f2010c008]
  - @lens-protocol/storage@0.7.5-alpha.7

## 0.3.3-alpha.17

### Patch Changes

- 0a3a61fb: **feat:** advanced contract condition for token-gated publications

## 0.3.3-alpha.16

### Patch Changes

- 89f345ba6: **chore:** updates development environment config

## 0.3.3-alpha.15

### Patch Changes

- 9a9f3130d: **fix** robust handling of legacy token-gated publication with empty `tokenIds` as ERC-721 NFT Ownership condition
- Updated dependencies [d71f981cc]
  - @lens-protocol/shared-kernel@0.11.0-alpha.8
  - @lens-protocol/storage@0.7.5-alpha.6

## 0.3.3-alpha.14

### Patch Changes

- Updated dependencies [2f5360796]
  - @lens-protocol/shared-kernel@0.11.0-alpha.7
  - @lens-protocol/storage@0.7.5-alpha.5

## 0.3.3-alpha.13

### Patch Changes

- 7ed02dd93: **fix:** decryption of undefined metadata fields that are exposed as empty strings in GQL schemas

## 0.3.3-alpha.12

### Patch Changes

- 1bd69391: **chore:** updates `@lens-protocol/metadata` package to 1.0.0

## 0.3.3-alpha.11

### Patch Changes

- Updated dependencies [061df834]
  - @lens-protocol/shared-kernel@0.11.0-alpha.6
  - @lens-protocol/storage@0.7.5-alpha.4

## 0.3.3-alpha.10

### Patch Changes

- 5f93ea77: **fix:** support `Profile.lensManager` into `Profile.signless` renaming
- 5f93ea77: **fix:** support new `HandleInfo`
- 5f93ea77: **fix:** renames of `handleLinkToProfile`, `handleUnlinkToProfile` and correlated mutations, types
- 5f93ea77: **fix:** adds `type` to Open Action module settings types

## 0.3.3-alpha.9

### Patch Changes

- Updated dependencies [9481f48b]
  - @lens-protocol/shared-kernel@0.11.0-alpha.5
  - @lens-protocol/storage@0.7.5-alpha.3

## 0.3.3-alpha.8

### Patch Changes

- 01b2c2cb: Updated to support the latest API schema

## 0.3.3-alpha.7

### Patch Changes

- 8c4da31a: Updated to latest api schema, used TypedDocumentNode to improve startup time
- Updated dependencies [a929c0f6]
  - @lens-protocol/shared-kernel@0.11.0-alpha.4
  - @lens-protocol/storage@0.7.5-alpha.2

## 0.3.3-alpha.6

### Patch Changes

- Updated dependencies [734d6823]
  - @lens-protocol/shared-kernel@0.11.0-alpha.3
  - @lens-protocol/storage@0.7.5-alpha.1

## 0.3.3-alpha.5

### Patch Changes

- Updated dependencies [6d0d62dd]
  - @lens-protocol/shared-kernel@0.11.0-alpha.2
  - @lens-protocol/storage@0.7.5-alpha.0

## 0.3.3-alpha.4

### Patch Changes

- c043b1d2: **feat:** token-gated support for LIP-2 metadata spec

## 0.3.3

### Patch Changes

- ace02d32: **Fixes** support for ERC1155 gated content
- Updated dependencies [5f251069]
- Updated dependencies [dfb15e1a]
- Updated dependencies [ebc2e7e5]
- Updated dependencies [48dd0860]
  - @lens-protocol/api-bindings@0.10.1
  - @lens-protocol/domain@0.10.1

## 0.3.3-next.4

### Patch Changes

- Updated dependencies [48dd0860]
  - @lens-protocol/domain@0.10.1-next.0
  - @lens-protocol/api-bindings@0.10.1-next.3

## 0.3.3-next.3

### Patch Changes

- ace02d32: **Fixes** support for ERC1155 gated content

## 0.3.3-next.2

### Patch Changes

- Updated dependencies [5f251069]
  - @lens-protocol/api-bindings@0.10.1-next.2

## 0.3.3-next.1

### Patch Changes

- Updated dependencies [dfb15e1a]
  - @lens-protocol/api-bindings@0.10.1-next.1

## 0.3.3-next.0

### Patch Changes

- Updated dependencies [ebc2e7e5]
  - @lens-protocol/api-bindings@0.10.1-next.0

## 0.3.2

### Patch Changes

- de401a59: **Added** support for optimized and transformed media inside publication and profile MediaSet
- 40fce6ff: **Added** support for bookmarks: list, add, and remove from a Profile private list of publications
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
  - @lens-protocol/domain@0.10.0
  - @lens-protocol/shared-kernel@0.10.0
  - @lens-protocol/storage@0.7.4

## 0.3.2-next.8

### Patch Changes

- Updated dependencies [bdbc71d5]
  - @lens-protocol/shared-kernel@0.10.0-next.2
  - @lens-protocol/domain@0.10.0-next.7
  - @lens-protocol/api-bindings@0.10.0-next.8
  - @lens-protocol/storage@0.7.4-next.2

## 0.3.2-next.7

### Patch Changes

- Updated dependencies
  - @lens-protocol/shared-kernel@0.10.0-next.1
  - @lens-protocol/api-bindings@0.10.0-next.7
  - @lens-protocol/domain@0.10.0-next.6
  - @lens-protocol/storage@0.7.4-next.1

## 0.3.2-next.6

### Patch Changes

- Updated dependencies [773c2ed8]
- Updated dependencies [773c2ed8]
- Updated dependencies [773c2ed8]
- Updated dependencies [773c2ed8]
  - @lens-protocol/api-bindings@0.10.0-next.6
  - @lens-protocol/domain@0.10.0-next.5

## 0.3.2-next.5

### Patch Changes

- Updated dependencies [3ffab7b9]
- Updated dependencies [19ed489e]
- Updated dependencies [6eaaaf22]
  - @lens-protocol/domain@0.10.0-next.4
  - @lens-protocol/api-bindings@0.10.0-next.5

## 0.3.2-next.4

### Patch Changes

- Updated dependencies [b7609fcb]
- Updated dependencies [433760f3]
- Updated dependencies [fc31f146]
- Updated dependencies [e8dc3cd8]
  - @lens-protocol/api-bindings@0.10.0-next.4
  - @lens-protocol/domain@0.10.0-next.3
  - @lens-protocol/shared-kernel@0.10.0-next.0
  - @lens-protocol/storage@0.7.4-next.0

## 0.3.2-next.3

### Patch Changes

- Updated dependencies [9428efeb]
  - @lens-protocol/domain@0.9.1-next.2
  - @lens-protocol/api-bindings@0.10.0-next.3

## 0.3.2-next.2

### Patch Changes

- de401a59: **Added** support for optimized and transformed media inside publication and profile MediaSet
- 40fce6ff: **Added** support for bookmarks: list, add, and remove from a Profile private list of publications
- Updated dependencies [de401a59]
- Updated dependencies [40fce6ff]
- Updated dependencies [ad797714]
- Updated dependencies [636ff014]
- Updated dependencies [125ec30c]
- Updated dependencies [3b67207b]
  - @lens-protocol/api-bindings@0.10.0-next.2
  - @lens-protocol/domain@0.9.1-next.1

## 0.3.2-next.1

### Patch Changes

- Updated dependencies [d5efd895]
  - @lens-protocol/api-bindings@0.9.2-next.1

## 0.3.1

### Patch Changes

- Updated dependencies [06a30a2c]
  - @lens-protocol/api-bindings@0.9.1

## 0.3.1-next.0

### Patch Changes

- Updated dependencies [c2a91ef4]
- Updated dependencies [0f75f79d]
- Updated dependencies [4c4505d2]
  - @lens-protocol/api-bindings@0.9.1-next.0
  - @lens-protocol/domain@0.9.1-next.0

## 0.3.0

### Minor Changes

- cb5b900d: **Added** sandbox environment support
- 148e9636: feat: **Added** linea goerli support to gated content

### Patch Changes

- 2dbe0035: - Adds the ability to override the `createGatedClient` function for gated content functionality.
- Updated dependencies [55211083]
- Updated dependencies [3025d56a]
- Updated dependencies [1d99413a]
- Updated dependencies [225f0fa7]
- Updated dependencies [ea0b40e3]
- Updated dependencies [a899553c]
- Updated dependencies [422c627e]
- Updated dependencies [e4be6c07]
- Updated dependencies [97ecba69]
  - @lens-protocol/domain@0.9.0
  - @lens-protocol/api-bindings@0.9.0
  - @lens-protocol/shared-kernel@0.9.0
  - @lens-protocol/storage@0.7.3

## 0.3.0-next.4

### Patch Changes

- Updated dependencies [ea0b40e3]
- Updated dependencies [a899553c]
  - @lens-protocol/domain@0.9.0-next.2
  - @lens-protocol/api-bindings@0.9.0-next.2

## 0.2.3

### Patch Changes

- Updated dependencies [58217985]
  - @lens-protocol/api-bindings@0.8.1

## 0.3.0-next.3

### Patch Changes

- 2dbe0035: - Adds the ability to override the `createGatedClient` function for gated content functionality.

## 0.3.0-next.2

### Patch Changes

- Updated dependencies [3025d56a]
- Updated dependencies [225f0fa7]
- Updated dependencies [422c627e]
- Updated dependencies [97ecba69]
  - @lens-protocol/api-bindings@0.9.0-next.1
  - @lens-protocol/domain@0.9.0-next.1
  - @lens-protocol/shared-kernel@0.9.0-next.0
  - @lens-protocol/storage@0.7.3-next.0

## 0.3.0-next.1

### Minor Changes

- 148e9636: feat: **Added** linea goerli support to gated content

### Patch Changes

- Updated dependencies [55211083]
  - @lens-protocol/domain@0.8.1-next.0
  - @lens-protocol/api-bindings@0.8.1-next.0

## 0.3.0-next.0

### Minor Changes

- cb5b900d: **Added** sandbox environment support

## 0.2.2

### Patch Changes

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
  - @lens-protocol/shared-kernel@0.8.0
  - @lens-protocol/domain@0.8.0
  - @lens-protocol/storage@0.7.2

## 0.2.2-next.4

### Patch Changes

- Updated dependencies [37bf8e8]
  - @lens-protocol/api-bindings@0.8.0-next.4

## 0.2.2-next.3

### Patch Changes

- Updated dependencies [b738abb]
- Updated dependencies [5c5bfb2]
  - @lens-protocol/shared-kernel@0.8.0-next.1
  - @lens-protocol/domain@0.8.0-next.3
  - @lens-protocol/api-bindings@0.8.0-next.3
  - @lens-protocol/storage@0.7.2-next.1

## 0.2.2-next.2

### Patch Changes

- Updated dependencies [ef1d7e2]
  - @lens-protocol/api-bindings@0.8.0-next.2
  - @lens-protocol/domain@0.8.0-next.2

## 0.2.2-next.1

### Patch Changes

- Updated dependencies [03a8ad5]
- Updated dependencies [71196cf]
  - @lens-protocol/api-bindings@0.8.0-next.1
  - @lens-protocol/domain@0.8.0-next.1

## 0.2.2-next.0

### Patch Changes

- Updated dependencies [513373d3]
- Updated dependencies [04647bbe]
- Updated dependencies [c416a2ea]
  - @lens-protocol/api-bindings@0.8.0-next.0
  - @lens-protocol/shared-kernel@0.8.0-next.0
  - @lens-protocol/domain@0.8.0-next.0
  - @lens-protocol/storage@0.7.2-next.0

## 0.2.1

### Patch Changes

- 425daba: **Fixed** 1.0.0 release packages bundles
- Updated dependencies [425daba]
  - @lens-protocol/api-bindings@0.7.1
  - @lens-protocol/domain@0.7.1
  - @lens-protocol/shared-kernel@0.7.1
  - @lens-protocol/storage@0.7.1

## 0.2.0

### Minor Changes

- 37eaf8a: Added TSDoc, use shared tsconfig, better types

### Patch Changes

- 0f20b5a: Changed storage keys so use environment name as namespace
- 0f20b5a: Changed env config variables to be `development` and `production`
- Updated dependencies [6ae90ef]
- Updated dependencies [37eaf8a]
- Updated dependencies [a4e9500]
  - @lens-protocol/api-bindings@0.7.0
  - @lens-protocol/shared-kernel@0.7.0
  - @lens-protocol/storage@0.7.0
  - @lens-protocol/domain@0.7.0

## 0.2.0-beta.1

### Patch Changes

- 0f20b5a: Changed storage keys so use environment name as namespace
- 0f20b5a: Changed env config variables to be `development` and `production`

## 0.2.0-beta.0

### Minor Changes

- dc1350d: Added TSDoc, use shared tsconfig, better types

### Patch Changes

- Updated dependencies [6ae90ef]
- Updated dependencies [dc1350d]
- Updated dependencies [a4e9500]
  - @lens-protocol/api-bindings@0.7.0-beta.0
  - @lens-protocol/shared-kernel@0.7.0-beta.0
  - @lens-protocol/storage@0.7.0-beta.0
  - @lens-protocol/domain@0.7.0-beta.0

## 0.1.0

- 6be7f14: Added support for token gated post/comment using Lit Protocol.

### Patch Changes

- Updated dependencies [4475a27]
  - @lens-protocol/domain@0.6.0
  - @lens-protocol/api-bindings@0.6.0
  - @lens-protocol/storage@0.6.0
  - @lens-protocol/shared-kernel@0.6.0
