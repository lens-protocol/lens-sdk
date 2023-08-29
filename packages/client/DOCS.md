## Documentation To Do

- authentication

  - [x] challenge
  - [x] verify
  - [x] authenticate
  - [x] refresh
  - [x] isAuthenticated
  - [x] getAccessToken

- wallet

  - [] ownedHandles
  - [] profilesManaged
  - [] sigNonces

- profile

  - [] fetch
  - [] fetchAll
  - [] managers
  - [] following
  - [] recommendations
  - [] mutualFollowers
  - [] followers

  - [] claim
  - [] create
  - [] addInterests - client.profile.interests.add() ?
  - [] removeInterests - client.profile.interests.remove() ?
  - [] setMetadata
  - [] setImage
  - [] setManager
  - [] block
  - [] unblock
  - [] follow
  - [] unfollow
  - [] setFollowModule
  - [] dismissRecommended

  - [] linkHandle - Query.linkHandleToProfile (should be mutation?)
  - [] unlinkHandle - Query.unlinkHandleToProfile

  - [] createSetProfileMetadataTypedData
  - [] createSetProfileImageTypedData
  - [] createChangeProfileManagersTypedData
  - [] createBlockProfileTypedData
  - [] createUnblockProfileTypedData
  - [] createFollowTypedData
  - [] createUnfollowTypedData
  - [] createSetFollowModuleTypedData

- [] publication

  - [] fetch
  - [] fetchAll
  - [] tags
  - [] validateMetadata
  - [] stats

  - [] hide
  - [] report

  - [] postOnChain
  - [] commentOnChain
  - [] mirrorOnChain
  - [] quoteOnChain
  - [] postOnMomoka
  - [] commentOnMomoka
  - [] mirrorOnMomoka
  - [] quoteOnMomoka

  - [] createOnChainPostTypedData
  - [] createOnChainCommentTypedData
  - [] createOnChainMirrorTypedData
  - [] createOnChainQuoteTypedData
  - [] createMomokaPostTypedData
  - [] createMomokaCommentTypedData
  - [] createMomokaMirrorTypedData
  - [] createMomokaQuoteTypedData

  - [] legacyCollect
  - [] createLegacyCollectPublicationTypedData

  - [] bookmarks

    - [] fetch
    - [] add
    - [] remove

  - [] notInterested

    - [] add
    - [] undo

  - [] reactions

    - [] fetch
    - [] add
    - [] remove

  - [] actions

    - [] actOn
    - [] createActOnOpenActionTypedData

- [] feed

  - [] fetch
  - [] highlights
  - [] forYou

- [] explore

  - [] profiles
  - [] publications

- [] search

  - [] profiles
  - [] publications

- [] notifications

  - [] fetch

- [] momoka

  - [] submitters
  - [] summary
  - [] transactions
  - [] transaction

- [] nfts

  - [] fetch
  - [] fetchGalleries

  - [] ownershipChallenge
  - [] createGallery
  - [] deleteGallery
  - [] updateGalleryInfo
  - [] updateGalleryItems
  - [] updateGalleryOrder

- [] revenue

  - [] fromFollow
  - [] fromPublications
  - [] forPublication

- transaction

  - [] txIdToTxHash
  - [] status

  - [] broadcastOnChain
  - [] broadcastOnMomoka

- [] invites

  - [] invitedProfiles
  - [] profileAlreadyInvited
  - [] inviteProfile

- [] modules
  - [] currencies
  - [] supportedModules
  - [] approvedModuleAllowanceAmount
  - [] generateModuleCurrencyApprovalData
