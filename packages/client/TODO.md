# The structure of the low level Client SDK

## Legend:

- [A] requires authentication
- [P] paginated
- [M] mutation
- [Q] query
- [H] helper (no API interaction)

## Environments

- `production`, `development`

## Client and Authentication

Client manages the token lifecycle and storage

- `new LensClient({ environment, storage? })`
- [Q] `client.authentication.generateChallenge(address)`
- [M] `client.authentication.authenticate(address, signature)`
- [H] `client.authentication.isAuthenticated()`

## Explore

- [PQ] `client.explore.publications(request)`
- [PQ] `client.explore.profiles(request)`

## Feed

- [APQ] `client.feed.fetch(request)`
- [APQ] `client.feed.fetchHighlights(request)`

## Modules

- [AQ] `client.modules.fetchEnabledCurrencies()`
- [AQ] `client.modules.fetchEnabled()`
- [AQ] `client.modules.approvedAllowanceAmount(request)`
- [AQ] `client.modules.generateCurrencyApprovalData(request)`

## NFTs

- [PQ] `client.nfts.fetch(request)`
- [AQ] `client.nfts.ownershipChallenge(request)`

- [Q] `client.nfts.fetchGalleries(request)`
- [AM] `client.nfts.createGallery(request)`
- [AM] `client.nfts.updateGalleryInfo(request)`
- [AM] `client.nfts.updateGalleryItems(request)`
- [AM] `client.nfts.updateGalleryOrder(request)`
- [AM] `client.nfts.deleteGallery(request)`

## Notifications

- [APQ] `client.notifications.fetch(request)`

## Profile + Dispatcher

### Query profile

- [Q] `client.profile.fetch(request)`
- [PQ] `client.profile.fetchAll(request)`
- [PQ] `client.profile.mutualFollowers({ viewingProfileId, yourProfileId })`
- [Q] `client.profile.stats(request)`

- [Q] `client.profile.allRecommended()`
- [AM] `client.profile.dismissRecommended(request)`

### Edit profile

- [AM] `client.profile.create(request)`

- [AM] `client.profile.createSetProfileMetadataTypedData(request)`
- [AM] `client.profile.createSetProfileMetadataViaDispatcher(request)`

- [AM] `client.profile.createSetProfileImageURITypedData(request)`
- [AM] `client.profile.createSetProfileImageURIViaDispatcher(request)`

- [AM] `client.profile.createBurnProfileTypedData(request)`
- [AM] `client.profile.createSetDefaultProfileTypedData(request)`
- [AM] `client.profile.createSetDispatcherTypedData(request)`

- [Q] `client.profile.allInterests()`
- [AM] `client.profile.addInterests(request)`
- [AM] `client.profile.removeInterests(request)`

### Helpers

- [H] `isValidProfileHandle(handle)`

### Follow profile

- [AM] `client.profile.createFollowTypedData(request)`
- [AM] `client.profile.createUnfollowTypedData(request)`
- [AM] `client.profile.createSetFollowModuleTypedData(request)`
- [AM] `client.profile.createSetFollowNFTUriTypedData(request)`
- [APQ] `client.profile.pendingApprovalFollows(request)`

- [Q] `client.profile.doesFollow(request)`
- [PQ] `client.profile.allFollowing({ address })`
- [PQ] `client.profile.allFollowers({ profileId })`
- [Q] `client.profile.followerNftOwnedTokenIds({ address, profileId })`

## Publication(s)

### Query publications

- [Q] `client.publication.fetch(request)`
- [PQ] `client.publication.fetchAll(request)`
- [Q] `client.publication.validateMetadata(request)`
- [PQ] `client.publication.allWalletsWhoCollected({ publicationId })`
- [PQ] `client.publication.allForSale({ profileId })`
- [Q] `client.publication.metadataStatus(request)`
- [Q] `client.publication.stats(request)`

### Create or edit publications

- [AM] `client.publication.createPostTypedData(request)`
- [AM] `client.publication.createPostViaDispatcher(request)`

- [AM] `client.publication.createCommentTypedData(request)`
- [AM] `client.publication.createCommentViaDispatcher(request)`

- [AM] `client.publication.createMirrorTypedData(request)`
- [AM] `client.publication.createMirrorViaDispatcher(request)`

- [AM] `client.publication.createCollectTypedData(request)`

- [AM] `client.publication.hide({ publicationId })`
- [M] `client.publication.createAttachMediaData(request)`

- [AM] `client.publication.report(request)`

### Helpers

- [H] `buildReportingReasonInputParams(PublicationReportReason)`

## ProtocolStats

- [Q] `client.stats.fetch(request)`

## UserSigNonces

- [AQ] `client.nonces.fetch()`

## Proxy actions

- [AM] `client.proxyAction.freeFollow({ profileId })`
- [AM] `client.proxyAction.freeCollect({ publicationId })`
- [AQ] `client.proxyAction.checkStatus(proxyActionId)`
- [AQ] `client.proxyAction.waitForStatusComplete(proxyActionId)`

### Helpers

- [H] `isProxyActionError()`
- [H] `isProxyActionQueued()`
- [H] `isProxyActionStatusResult()`

## Reactions

- [AM] `client.reactions.add(request)`
- [AM] `client.reactions.remove(request)`
- [PQ] `client.reactions.toPublication({ publicationId })`

## Revenue

- [PQ] `client.revenue.profilePublications({ profileId, limit })`
- [Q] `client.revenue.profileFollow({ profileId })`
- [Q] `client.revenue.publication({ publicationId })`

## Search

- [PQ] `client.search.profiles({ query, limit })`
- [PQ] `client.search.publications({ query, limit })`

## Transaction

- [AM] `client.transaction.broadcast(request)`
- [AQ] `client.transaction.wasIndexed(txId)`
- [AQ] `client.transaction.waitForIsIndexed(txId)`

### Helpers

- [H] `isRelayerResult()`
- [H] `isRelayerError()`
- [H] `isTransactionIndexedResult()`
- [H] `isTransactionError()`
