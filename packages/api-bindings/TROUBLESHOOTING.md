## Apollo doesn't return the items from the cache forcing the new network request

Quite likely type policies configuration is broken.

To get the exact fields that are missing go to the `@apollo/client` `QueryManager.ts` and log the result of `readCache` method call inside `cache-first` fetch policy switch
(make sure you modify the file that gets imported by the bundler).

```ts
// ...

switch (fetchPolicy) {
    default: case "cache-first": {
      const diff = readCache();

      console.log(diff) // should have a `missing` properly

      if (diff.complete) {
        return [
          resultsFromCache(diff, queryInfo.markReady()),
        ];
      }

// ..
```

Run the app and the exact missing fields should be logged into the console.
