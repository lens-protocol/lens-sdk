# @lens-protocol/client

## 1.0.0-beta.0

### Minor Changes

- dc1350d: Added TSDoc, use shared tsconfig, better types

### Patch Changes

- fce5b18: Added support for new collect modules: `multirecipientFeeCollectModule`, `erc4626FeeCollectModule`, `aaveFeeCollectModule`
- 6ae90ef: Exposed `collectNftAddress` from publication fragments
- d865959: Changed `PublicationRevenue` query to return `PublicationRevenue` fragment
- c8c069c: Reduced exposed fields on MirrorFragment to guide correct usage of Mirrors
- d1499aa: Added refresh access token on `isAuthenticated` call
- Updated dependencies [dc1350d]
  - @lens-protocol/shared-kernel@0.7.0-beta.0
  - @lens-protocol/storage@0.7.0-beta.0

## 0.3.0

- Fixed `profile.createSetProfileImageURIViaDispatcher()`
- Added authentication header to all API requests if client is authenticated

### Patch Changes

- @lens-protocol/storage@0.6.0
- @lens-protocol/shared-kernel@0.6.0

## 0.2.0

### Minor Changes

- Fixed authentication in `Feed` module
- Added a few transaction helpers
- Exported multiple codegen generated types
- Added `options` argument to `profile.allRecommended`

## 0.1.1

### Patch Changes

- ed973b51: Added `electedMirror`, `mirrors`, `collects` and `reactions` to feed query
  - @lens-protocol/storage@0.5.1
  - @lens-protocol/shared-kernel@0.5.1

## 0.1.0

- Developer preview release
