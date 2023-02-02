---
"@lens-protocol/react": patch
---

Added `IStorageProvider` `StorageSubscription` `StorageProviderSubscriber` and `IObservableStorageProvider` to the package exports

Removed `IStorageProvider.subscribe` method (use `IObservableStorageProvider` when custom subscription logic is required)
