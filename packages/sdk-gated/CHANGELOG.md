# 1.2.0 - 20th January 2023

- Remove `cross-blob` and `cross-fetch` dependencies
- Package now only supports Node 18+.

# 1.1.8 - 9th January 2023

- Change browser bundle to UMD from IIFE

# 1.1.7 - 9th January 2023

- Fix issue with broken imports on nodejs and browsers

# 1.1.6 - 6th January 2023

- Fix issue where nested boolean conditions would not be transformed correctly

# 1.1.5 - 15th December 2022

- Add backwards compatibility support for shorthand ScalarOperator conditions like `=`, `>`, `>=`, `<`, `<=` and `!=`

# 1.1.4 - 12th December 2022

- Fix issue where decimal ERC20 token conditions were not being parsed correctly

# 1.1.3 - 9th December 2022

- Handle internally collect conditions with `thisPublication = true` and remove optional `publicationId` parameter from 
`decryptMetadata` method.
 
# 1.1.2 - 1st December 2022

## Bug fixes

- Fix issue where NFT token IDs would sometimes not be parsed correctly

# 1.1.1 - 1st December 2022

## Bug fixes

- Fix issue where `decryptMetadata` would throw on metadata objects that contain null access conditions
- Update some error messages for better clarity

# 1.1.0 - 20th November 2022

## Features

- Add metadata validation before encryption
- Check for ownership of Lens profile based on signed address
- Validate the signed address owns the given profile when encrypting metadata
- `CollectCondition` now accepts the following interface
  ```typescript
  interface CollectCondition {
    publicationId: string | undefined;
    thisPublication: string | undefined;
  }
  ```
  You must supply only one of these properties. `publicationId` is used to refer to an existing publication.
  `thisPublication` will be useful for people who want to expose a publication only to its collectors. It uses data
  from Lens API to calculate the next publicationId, and save it on LIT Protocol.
- Gated client looks in localStorage for a valid `AuthSig` to avoid asking for signature if not necessary.
- Remove `chainId` field from EoaCondition

## Bug fixes

- fix issue where exports were missing in browser context

## Chores

- migrate bundling from webpack to rollup

# 1.0.0 - 16th November 2022

- first published version
