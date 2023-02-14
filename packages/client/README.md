# `@lens-protocol/client`

The official framework-agnostic Lens API Client.

This package enables you to interact with the Lens API via a type safe interface that abstracts away some of the GraphQL intricacies.

> **Warning**
>
> The Lens SDK is still in its initial development phase. Anything MAY change at any time.
> This is a Developer Preview aimed primarily at existing integrators so to gather [early feedback](https://github.com/lens-protocol/lens-sdk/discussions/48).

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
