---
"@lens-protocol/shared-kernel": minor
"@lens-protocol/api-bindings": minor
"@lens-protocol/client": minor
"@lens-protocol/domain": minor
"@lens-protocol/react": minor
"@lens-protocol/blockchain-bindings": minor
"@lens-protocol/gated-content": minor
"@lens-protocol/react-native": minor
"@lens-protocol/react-web": minor
"@lens-protocol/storage": minor
"@lens-protocol/wagmi": minor
---

**breaking:** Remove all what was marked as deprecated. See the detailed list below. Prepare for the major release.

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
