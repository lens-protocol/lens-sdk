# `@lens-protocol/client`

This package contains low level client for GraphQL Lens API.

**Its interface will change without notice, use it at your own risk.**

## Examples

For all exaples below we require the same setup, we need a LensClient instance and an ethers.js Wallet as a signer.

```ts
import { LensClient, staging } from '@lens-protocol/client';
import { Wallet } from 'ethers';

const lens = new LensClient({
  environment: staging,
});

const wallet = new Wallet(
  'YOUR_PRIVATE_KEY', // keep it secret (!) ie. using env vars
);

const address = await wallet.getAddress();
```

### Authenticate with Lens API

```ts
import { LensAuth } from '@lens-protocol/client';

const authClient = new LensAuth(lens);
const challenge = await authClient.generateChallenge(address);

// sign with wallet
const signature = await wallet.signMessage(challenge);
const { accessToken, refreshToken } = await authClient.generateCredentials(address, signature);
```

### Get your default profile and all profiles owned by you

```ts
import { LensProfile } from '@lens-protocol/client';

const profileClient = new LensProfile(lens);

const defaultProfile = await profileClient.getDefaultProfile({ address });

console.log(defaultProfile);

/* {
  __typename: 'Profile',
  id: '0x53a8',
  handle: 'handle.test',
  ...
} */

const allMyProfiles = await profileClient.getAllProfilesByOwnerAddress({
  address,
  limit: 10,
});

console.log(allMyProfiles);

/* {
  items: [
    {
      __typename: 'Profile',
      id: '0x63ef',
      handle: 'redditcompromised.test',
      ...
    }
  ],
  pageInfo: {
    prev: '{"offset":0}',
    next: '{"offset":1}',
    totalCount: 1
  }
} */
```

### Set a dispatcher with gasless, signed data type

```ts
import { LensProfileWithAuth, LensTransaction } from '@lens-protocol/client';

const profileAuthClient = new LensProfileWithAuth(lens, accessToken);
const txClient = new LensTransaction(lens, accessToken);

const setDispatcherData = await profileAuthClient.createSetDispatcherTypedData({
  profileId: defaultProfile.id, // your profileId
});

// use wallet to sign typed data
const signedTypedData = await wallet._signTypedData(
  setDispatcherData.typedData.domain,
  setDispatcherData.typedData.types,
  setDispatcherData.typedData.value,
);

await txClient.broadcast({
  id: setDispatcherData.id,
  signature: signedTypedData,
});
```

### Follow a profile with free proxy action

```ts
import { LensProxyAction } from '@lens-protocol/client';

const proxyActionClient = new LensProxyAction(lens, accessToken);

const proxyActionId = await proxyActionClient.freeFollow('0x53a8');

console.log(proxyActionId); // "7624f076-446d-4f38-8277-326b269fe8d8"

const status = await proxyActionClient.checkStatus(proxyActionId);

console.log(status);

/*  {
  __typename: 'ProxyActionQueued',
  queuedAt: '2023-01-26T14:33:41.254Z'
} */
```
