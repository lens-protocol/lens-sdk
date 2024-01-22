---
"@lens-protocol/client": minor
---

**feat**: added new methods:

- `feed.latestPaidActions`
- `profile.report`
- `profile.followStatusBulk`
- `nfts.collections`
- `nfts.collectionOwners`
- `nfts.mutualCollections`
- `nfts.popularCollections`

**breaking**: `nfts.fetch` doesn't require authentication, returns `Promise<PaginatedResult<NftFragment>>`
