# @lens-protocol/shared-kernel

## 0.12.0

### Minor Changes

- ce997e7fd: **chore:** updated development environment to Amoy testnet

## 0.11.0

This is a stable release, marking the closure of the alpha prerelease.

## 0.11.0-alpha.12

### Patch Changes

- 177879d07: **feat:** adds experimental `useOptimisticCreatePost` hook

## 0.11.0-alpha.11

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

- 6fdfe12bc: **feat:** introduced `fiatAmount` helper

## 0.11.0-alpha.10

### Patch Changes

- 9691cdccc: **fix:** missing release of sub-dependency

## 0.11.0-alpha.9

### Minor Changes

- b647eab70: **feat:** Introduced `debug` mode. Exported `ConsoleLogger`.

### Patch Changes

- 1a97c390a: **chore:** Removed peer dependency on ethers@5

## 0.11.0-alpha.8

### Patch Changes

- d71f981cc: **chore:** simplifies useApproveModule implementation

## 0.11.0-alpha.7

### Patch Changes

- 2f5360796: **fix:** fixes silent token-refresh logic so that, if refresh token is still valid, a silent refresh of tokens takes places and failed requests are retried seamlessly

## 0.11.0-alpha.6

### Patch Changes

- 061df834: **chore:** configure Lens API v2 production URL

## 0.11.0-alpha.5

### Patch Changes

- 9481f48b: **feat:** implements `useApproveModule` hook. It also upgrades viem and wagmi peer deps.

## 0.11.0-alpha.4

### Minor Changes

- a929c0f6: **feat:** implements `useCreatePost` hook

## 0.11.0-alpha.3

### Patch Changes

- 734d6823: **feat:** adds `useProfileManagers` and `useUpdateProfileManagers` hooks

## 0.11.0-alpha.2

### Patch Changes

- 6d0d62dd: **feat:** new `useLogin` and `useSession` hooks

## 0.11.0-alpha.1

### Patch Changes

- 25fe9a46: Support for new v2 hooks

## 0.11.0-alpha.0

### Minor Changes

- 731ff1d0: Added support for Lens Protocol v2

## 0.10.0

### Minor Changes

- fc31f146: **Added** experimental hooks that integrate with @xmtp/react-sdk

### Patch Changes

- bdbc71d5: **Added** ability to await newly created post in `useCreatePost` hook
- 5943a0f0: **Fixed** missing dependency update related to https://github.com/lens-protocol/lens-sdk/pull/475

## 0.10.0-next.2

### Patch Changes

- bdbc71d5: **Added** ability to await newly created post in `useCreatePost` hook

## 0.10.0-next.1

### Patch Changes

- **Fixed** missing dependency update related to https://github.com/lens-protocol/lens-sdk/pull/475

## 0.10.0-next.0

### Minor Changes

- fc31f146: **Added** experimental hooks that integrate with @xmtp/react-sdk

## 0.9.0

### Minor Changes

- 225f0fa7: **Added** `usePollDetail` and `usePollVote` hooks

### Patch Changes

- 422c627e: **Added** eager check on several tx hooks so to fail fast with dev friendly error messages"

## 0.9.0-next.0

### Minor Changes

- 225f0fa7: **Added** `usePollDetail` and `usePollVote` hooks

### Patch Changes

- 422c627e: **Added** eager check on several tx hooks so to fail fast with dev friendly error messages"

## 0.8.0

### Minor Changes

- c416a2e: **Added:** self-fund protocol calls when subsidized approaches fails
- c416a2e: **Fixed:** ensures correct chain when signing typed data
- c416a2e: **Fixed:** network switch in wagmi bindings

### Patch Changes

- b738abb: Fixed `useCreatePost`, `useCreateComment`, `useCreateEncryptedPost`, and `useCreateEncryptedComment` callback argument

## 0.8.0-next.1

### Patch Changes

- b738abb: Fixed `useCreatePost`, `useCreateComment`, `useCreateEncryptedPost`, and `useCreateEncryptedComment` callback argument

## 0.8.0-next.0

### Minor Changes

- c416a2ea:
  - **Added:** self-fund protocol calls when subsidized approaches fails
  - **Fixed:** ensures correct chain when signing typed data
  - **Fixed:** network switch in wagmi bindings

## 0.7.1

### Patch Changes

- 425daba: **Fixed** 1.0.0 release packages bundles

## 0.7.0

### Minor Changes

- 37eaf8a: Added TSDoc, use shared tsconfig, better types

## 0.7.0-beta.0

### Minor Changes

- dc1350d: Added TSDoc, use shared tsconfig, better types

## 0.6.0

## 0.5.1

## 0.5.0

## 0.4.1

## 0.4.0

## 0.3.0

## 0.2.0

## 0.1.1

## 0.1.0

First developer preview release
