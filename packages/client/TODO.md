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

- [x] new LensClient({ environment, storage? })
- [x] [Q] client.authentication.generateChallenge(address)
- [x] [M] client.authentication.authenticate(address, signature)
- [x] [H] client.authentication.isAuthenticated()

## Broadcast / Transaction

- [x] [AM] client.transaction.broadcast(request)
- [x] [AQ] client.transaction.wasIndexed({ txId })

## Explore

- [x] [PQ] client.explore.publications(request)
- [x] [PQ] client.explore.profiles(request)

## Modules

- [x] [AQ] client.modules.fetchEnabledCurrencies()
- [x] [AQ] client.modules.fetchEnabled()
- [x] [AQ] client.modules.approvedAllowanceAmount(request)
- [x] [AQ] client.modules.generateCurrencyApprovalData(request)

## NFTs

- [Q] client.nfts.fetch(request)
- [AQ] client.nfts.ownershipChallenge(request)

## Notifications

- [x] [APQ] client.notifications.fetch(request)

## Profile + Dispatcher

### Query profile

- [x] [Q] client.profile.fetch(request)
- [x] [PQ] client.profile.fetchAll(request)
- [x] [Q] client.profile.allRecommended()
- [x] [PQ] client.profile.mutualFollowers({ viewingProfileId, yourProfileId })

### Edit profile

- [x] [AM] client.profile.create(request)
- [H] client.profile.isValidHandle(handle)

- [AM] client.profile.createSetProfileMetadataTypedData(request)
- [AM] client.profile.createSetProfileMetadataViaDispatcher(request)

- [AM] client.profile.createSetProfileImageURITypedData(request)
- [AM] client.profile.createSetProfileImageURIViaDispatcher(request)

- [x] [AM] client.profile.createBurnProfileTypedData(request)
- [AM] client.profile.createSetDefaultProfileTypedData(request)
- [x] [AM] client.profile.createSetDispatcherTypedData(request)

- [AM] client.profile.addInterests(request)
- [AM] client.profile.removeInterests(request)

### Follow profile

- [x] [AM] client.profile.createFollowTypedData(request)
- [x] [AM] client.profile.createUnfollowTypedData(request)
- [AM] client.profile.createSetFollowModuleTypedData(request)
- [AM] client.profile.createSetFollowNFTUriTypedData(request)
- [APQ] client.profile.pendingApprovalFollows(request)

- [x] [Q] client.profile.doesFollow(request)
- [x] [PQ] client.profile.allFollowing({ address })
- [x] [PQ] client.profile.allFollowers({ profileId })
- [x] [Q] client.profile.followerNftOwnedTokenIds({ address, profileId })

## Publication(s)

### Query publications

- [x] [Q] client.publication.fetch(request)
- [x] [PQ] client.publication.fetchAll(request)
- [x] [Q] client.publication.validateMetadata(request)
- [x] [PQ] client.publication.allWalletsWhoCollected({ publicationId })
- [x] [PQ] client.publication.allForSale({ profileId })
- [x] [Q] client.publication.metadataStatus(request)
- [x] [Q] client.publication.stats(request)

### Create or edit publications

- [x] [AM] client.publication.createPostTypedData(request)
- [x] [AM] client.publication.createPostViaDispatcher(request)

- [x] [AM] client.publication.createCommentTypedData(request)
- [x] [AM] client.publication.createCommentViaDispatcher(request)

- [x] [AM] client.publication.createMirrorTypedData(request)
- [x] [AM] client.publication.createMirrorViaDispatcher(request)

- [x] [AM] client.publication.createCollectTypedData(request)

- [x] [AM] client.publication.hide({ publicationId })
- [x] [M] client.publication.createAttachMediaData(request)

- [x] [AM] client.publication.report(request)
- [x] [H] client.publication.buildReportReason(PublicationReportReason)

## ProtocolStats

- [x] [Q] client.stats.fetch(request)

## UserSigNonces

- [x] [AQ] client.nonces.fetch()

## Proxy actions

- [x] [AM] client.proxyAction.freeFollow({ profileId })
- [x] [AM] client.proxyAction.freeCollect({ publicationId })
- [x] [AQ] client.proxyAction.checkStatus({ proxyActionId })

## Reactions

- [x] [AM] client.reactions.add(request)
- [x] [AM] client.reactions.remove(request)
- [x] [PQ] client.reactions.toPublication({ publicationId })

## Revenue

- [x] [PQ] client.revenue.profilePublications({ profileId, limit })
- [x] [Q] client.revenue.profileFollow({ profileId })
- [x] [Q] client.revenue.publication({ publicationId })

## Search

- [x] [PQ] client.search.profiles({ query, limit })
- [x] [PQ] client.search.publications({ query, limit })

## Feed

- [x] [APQ] client.feed.fetch(request)
- [x] [APQ] client.feed.fetchHighlights(request)

## Other considerations

- more helpers like `isValidHandle`
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
