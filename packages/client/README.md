# `@lens-protocol/client`

This package contains low level client for GraphQL Lens API.

**Its interface will change without notice, use it at your own risk.**

## Examples

For all exaples below we require the same setup, we need a LensClient instance and an ethers.js Wallet as a signer.

```ts
import LensClient, { mumbai } from '@lens-protocol/client';
import { Wallet } from 'ethers';

const lensClient = LensClient.init(mumbai);

const wallet = new Wallet(
  'YOUR_PRIVATE_KEY', // keep it secret (!) ie. using env vars
);

const address = await wallet.getAddress();
```

### Authenticate with Lens API

```ts
const challenge = await lensClient.generateChallenge(address);
const signature = await wallet.signMessage(challenge);

const { accessToken, refreshToken } = await lensClient.authenticate(address, signature);

// lensClient is ready for authenticated requests, you can store refreshToken for later use
```

### Verify credentials and reauthenticate from stored credentials

```ts
const storedCredentials = {
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV...',
  refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV...',
};

const isValid = await lensClient.isAccessTokenValid(storedCredentials.accessToken);

if (!isValid) {
  const { accessToken, refreshToken } = await lensClient.refreshCredentials(
    storedCredentials.refreshToken,
  );

  // lensClient is ready for authenticated requests, you can store refreshToken for later use
}
```

### Fetch your profile and add a reaction

```ts
import { ReactionTypes } from '@lens-protocol/client';

// lensClient is already authenticated from the previous steps
const myProfile = await lensClient.profile.fetchDefault(address);

const reactionRequest = {
  profileId: myProfile.id,
  publicationId: '0x18-0x37',
  reaction: ReactionTypes.Upvote,
};

await lensClient.reaction.add(reactionRequest);
```
