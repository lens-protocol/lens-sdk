# Planned structure of low level SDK

## Legend:

- [A] authenticated
- [P] paginated
- [M] mutation
- [Q] query
- [H] helper (no API interaction)

## Environments

- polygon, mumbai

## Client and Authentication

Client manages the token lifecycle and storage

- new LensClient({ environment, storage? })
- [Q] client.generateChallenge(address)
- [M] client.authenticate(address, signature)
- [H] client.isAuthenticated()

## Broadcast / Transaction

- [AM] client.transaction.broadcast(request)
- [AQ] client.transaction.wasIndexed({ txId })

## Explore

- [PQ] client.explore.publications(request)
- [PQ] client.explore.profiles(request)

## Module

- [AM] client.module.createCollectTypedData(request)
- [AQ] client.module.enabledCurrencies()
- [AQ] client.module.fetchEnabled()
- [AQ] client.module.approvedAllowanceAmount(request)
- [AQ] client.module.generateCurrencyApprovalData(request)

## NFTs

- [Q] client.nfts.fetch(request)
- [AQ] client.nfts.ownershipChallenge(request)

## Notifications

- [AQ] client.notifications.fetch(request)
- [AQ] client.notifications.unreadCount(request)

## Profile + Dispatcher

### Query profile

- [x] client.profile.fetch(request) (by id or handle, forSources) or client.profiles.fetchOne()
- [x] client.profile.fetchAll(request) (by ids, ownedBy, handles, whoMirroredPublicationId)
- [x] client.profile.fetchRecommended()
- [x] client.profile.mutualFollowers({ viewingProfileId, yourProfileId })

### Edit profile

- [AM] client.profile.create(request)
- [H] client.profile.isValidHandle(handle)

- [AM] client.profile.createSetProfileMetadataTypedData(request)
- [AM] client.profile.createSetProfileMetadataViaDispatcher(request)

- [AM] client.profile.createSetProfileImageURITypedData(request)
- [AM] client.profile.createSetProfileImageURIViaDispatcher(request)

- [AM] client.profile.createBurnProfileTypedData(request)
- [AM] client.profile.createSetDefaultProfileTypedData(request)
- [AM] client.profile.createSetDispatcherTypedData(request)

- [AM] client.profile.addInterests(request)
- [AM] client.profile.removeInterests(request)

### Follow profile

- [AM] client.profile.createFollowTypedData(request)
- [AM] client.profile.createUnfollowTypedData(request)
- [AM] client.profile.createSetFollowModuleTypedData(request)
- [AM] client.profile.createSetFollowNFTUriTypedData(request)
- [APQ] client.profile.pendingApprovalFollows(request)

- [x] client.profile.doesFollow(request)
- [x] client.profile(s).following({ address })
- [x] client.profile.fetchFollowers({ profileId })
- [x] client.profile.followerNftOwnedTokenIds({ address, profileId })

## Publication(s)

### Query publications

- [Q] client.publication.fetch(request) or client.publications.fetchOne()
- [PQ] client.publication.fetchAll(request)
- [Q] client.publication.validateMetadata(request)
- [PQ] client.publication.whoCollected({ publicationId })

- [PQ] client.publication(s).forSale({ profileId })
- [Q] client.publication.metadataStatus(request)

### Create or edit publications

- [AM] client.publication.createPostTypedData(request)
- [AM] client.publication.createPostViaDispatcher(request)

- [AM] client.publication.createCommentTypedData(request)
- [AM] client.publication.createCommentViaDispatcher(request)

- [AM] client.publication.createMirrorTypedData(request)
- [AM] client.publication.createMirrorViaDispatcher(request)

- [AM] client.publication.hide({ publicationId })
- [M] client.publication.createAttachMediaData(request)

- gated publications TBD

## ProtocolStats

- [Q] client.protocolStats.fetch(request)

## UserSigNonces

- [AQ] client.nonces.fetch()

## Proxy actions

- [AM] client.proxyActions.freeFollow({ profileId })
- [AM] client.proxyActions.freeCollect({ publicationId })
- [AQ] client.proxyActions.checkStatus({ proxyActionId })

## Reactions

- [AM] client.reactions.add(request)
- [AM] client.reactions.remove(request)
- [PQ] client.reactions.toPublication({ publicationId })

## Reporting

- [AM] client.report.publication({ publicationId, reason, additionalComments })

## Revenue

- [PQ] client.revenue.profilePublications({ profileId, limit })
- [Q] client.revenue.profileFollow({ profileId })
- [Q] client.revenue.publication({ publicationId })

## Search

- [PQ] client.search.profiles({ query, limit })
- [PQ] client.search.publications({ query, limit })

## Feed

- [PQ] client.feed.fetch({ profileId })

## Other considerations

- paginated response helper
- more helpers like `isValidHandle`
- how to split a group that has both authenticated and public requests?
- authentication required error thrown on a group or on a method call?
- allow for custom gql queries or compose query from subqueries (like profile base, profile interests, profile onChainIdentity etc.) (is that possible?)

```ts
client.profile.fetch(
  request,
  `{
    name
    bio
    handle
    interests {
      ...profileInterestsFragment,
    }
    identity {
      ...profileOnChainIdentityFragment
    }
  }`,
);
```
