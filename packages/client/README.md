# `@lens-protocol/client`

The official framework-agnostic Lens API Client.

This package enables you to interact with the Lens API via a type safe interface that abstracts away some of the GraphQL intricacies.

## Running tests

Tests are using a real wallet created from a private key stored in `.env` file. Test are run against Mumbai Sandbox API. The private key is set as a secret for Github Actions (our CI). Ask if you need it for local tests.

```
CLIENT_TEST_WALLET_PRIVATE_KEY=
```

## Examples

For all exaples below we require the same setup, we need a LensClient instance and an ethers.js Wallet as a signer.

```ts
import LensClient, { mumbai } from '@lens-protocol/client';
import { Wallet } from 'ethers';

const lensClient = new LensClient({
  environment: mumbai,
});

const wallet = new Wallet(
  'YOUR_PRIVATE_KEY', // keep it secret (!) ie. using env vars
);

const address = await wallet.getAddress();
```

### Authenticate with Lens API

```ts
const challenge = await lensClient.authentication.generateChallenge(address);
const signature = await wallet.signMessage(challenge);

await lensClient.authentication.authenticate(address, signature);
```

### Add a reaction

```ts
import { ReactionTypes } from '@lens-protocol/client';

const reactionRequest = {
  profileId: '0x0185',
  publicationId: '0x18-0x37',
  reaction: ReactionTypes.Upvote,
};

// lensClient is already authenticated from the previous step
await lensClient.reactions.add(reactionRequest);
```

### Paginated Queries

On queries that have paginated results, you can call the `next` or `prev` functions on the return value to get the results of the next or previous page.

```ts
const result = await lensClient.search.profiles({
  limit: 10,
  query: 'test',
});

const firstPageResults = result.items; // first page of results

const nextResult = await result.next();

const secondPageResults = nextResult.items; // second page of results

const prevResult = await result.prev();

prevResult.items; // we are now back to the first page and this value is equal to firstPageResults.
```

### Set a dispatcher with gasless, signed data type

```ts
const typedDataResult = await lensClient.profile.createSetDispatcherTypedData({
  profileId: '0x0185', // your profileId
});

// typedDataResult is a PromiseResult object
const setDispatcherData = typedDataResult.unwrap();

// use wallet to sign typed data
const signedTypedData = await wallet._signTypedData(
  setDispatcherData.typedData.domain,
  setDispatcherData.typedData.types,
  setDispatcherData.typedData.value,
);

await lensClient.transaction.broadcast({
  id: setDispatcherData.id,
  signature: signedTypedData,
});
```

### Follow a profile with free proxy action

```ts
const followResult = await lensClient.proxyAction.freeFollow('0x53a8');
const proxyActionId = followResult.unwrap();
console.log(proxyActionId); // "7624f076-446d-4f38-8277-326b269fe8d8"

const statusResult = await lensClient.proxyAction.checkStatus(proxyActionId);
console.log(statusResult.unwrap());
/*  {
  __typename: 'ProxyActionQueued',
  queuedAt: '2023-01-26T14:33:41.254Z'
} */
```
