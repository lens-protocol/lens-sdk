# Lens JavaScript SDK

The official framework-agnostic JavaScript SDK for Lens Protocol.

---

This package enables you to interact with the Lens API via a type safe interface that abstracts away some of the GraphQL intricacies.

## Documentation

- [GitHub monorepo](https://github.com/lens-protocol/lens-sdk)
- [Getting Started](https://docs.lens.xyz/docs/lensclient-sdk-1)
- [Reference](https://lens-protocol.github.io/lens-sdk/modules/_lens_protocol_client.html)

## Quick start

Install the Lens React Native SDK package using your package manager of choice:

| Package Manager | Command                                    |
| :-------------: | :----------------------------------------- |
|       npm       | `npm install @lens-protocol/client@latest` |
|      yarn       | `yarn add @lens-protocol/client@latest`    |
|      pnpm       | `pnpm add @lens-protocol/client@latest`    |

Development configuration example:

```ts
import { LensClient, development } from '@lens-protocol/client';

const client = new LensClient({
  environment: development,
});
```

Production configuration example:

```ts
import { LensClient, production } from '@lens-protocol/client';

const client = new LensClient({
  environment: production,
});
```

In a browser-based implementation you can use the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) to persist authentication state.

```ts
const client = new LensClient({
  environment: production,

  storage: window.localStorage,
});
```
