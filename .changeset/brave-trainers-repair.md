---
"@lens-protocol/react": minor
---

Removed `PendingSigningRequestError | UserRejectedError | WalletConnectionError` from `LensProvider` `onError` handler
Changed `useWalletLogin` to return an object with `login`, `error` and `isPending` keys
Changed `useWalletLogout` to return an object with `logout` and `isPending``
