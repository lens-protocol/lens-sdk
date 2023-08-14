- typo `ActedNotificaion`
- `searchPublication` vs `searchProfiles` I suggest always plural
- `options` missing on
  ````graphql
  createOnChainQuoteTypedData(
  request: CreateOnChainQuoteRequest!
  ): CreateOnChainQuoteBroadcastItemResult!
  createOnChainPostTypedData(
  request: CreateOnChainPostRequest!
  ): CreateOnChainPostBroadcastItemResult!
  createOnChainCommentTypedData(
  request: CreateOnChainCommentRequest!
  ): CreateOnChainCommentBroadcastItemResult!
  createOnChainMirrorTypedData(
  request: CreateOnChainMirrorRequest!
  ): CreateOnChainMirrorBroadcastItemResult!```
  ````
- `tags` return conflicting types "[String!]!" and "[String!]" - union with PublicationMetadataV2
- `VideoSet` rawURL vs `AudioSet` and `rawURI`
- fix `OptimisticStatusResult` on isFollowedByMe and isFollowingMe
- add `transformed` and `ImageTransform` type
