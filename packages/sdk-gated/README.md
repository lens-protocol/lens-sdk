# Lens SDK

This package enables gated encrypting and decrypting publication metadata compatible with the Lens API. Works on Node.js 18+ and the browser.

## Installation

#### npm

```bash
npm install @lens-protocol/sdk-gated
```

#### yarn

```bash
yarn add @lens-protocol/sdk-gated
```

## Usage

Pretty straightforward, instantiate the `LensGatedSDK` client providing the required parameters.

Make sure you are encrypting valid MetadataV2 objects or you will get errors. See more on valid
metadata standards [here](https://docs.lens.xyz/docs/metadata-standards). To validate metadata using the Lens API before
encrypting, see [here](https://docs.lens.xyz/docs/validate-metadata).

```typescript
import { Web3Provider } from '@ethersproject/providers';
import {
  AndCondition,
  OrCondition,
  FollowCondition,
  CollectCondition,
  EncryptedMetadata,
  EoaOwnership,
  Erc20TokenOwnership,
  MetadataV2,
  NftOwnership,
  ProfileOwnership,
  PublicationMainFocus,
  ContractType,
  ScalarOperator,
  LensGatedSDK,
  LensEnvironment,
} from '@lens-protocol/sdk-gated';

let metadata: MetadataV2 = {
  version: '2.0.0',
  name: 'name',
  description: 'description',
  attributes: [],
  content: 'content',
  metadata_id: '1',
  appId: 'app_id',
  mainContentFocus: PublicationMainFocus.TextOnly,
  locale: 'en',
};

const uploadMetadataHandler = async (data: EncryptedMetadata): Promise<string> => {
  // Upload the encrypted metadata to your server and return a publicly accessible url
  return Promise.resolve('test');
};

const nftAccessCondition: NftOwnership = {
  contractAddress: '0x0000000000000000000000000000000000000000', // the address of the NFT collection, make sure it is a valid address depending on the chosen network
  chainID: 80001, // the chain ID of the network the NFT collection is deployed on;
  contractType: ContractType.Erc721, // the type of the NFT collection, ERC721 and ERC1155 are supported
  tokenIds: ['1', '2', '3'], // OPTIONAL - the token IDs of the NFTs that grant access to the metadata, if ommitted, owning any NFT from the collection will grant access
};

const eoaAccessCondition: EoaOwnership = {
  address: '0x0000000000000000000000000000000000000000', // the address of the EOA that grants access to the metadata
  chainID: 80001, // the chain ID of the network
};

const erc20AccessCondition: Erc20TokenOwnership = {
  contractAddress: '0x0000000000000000000000000000000000000000', // the address of the ERC20 token that signers should own
  chainID: 80001, // the chain ID of the network
  amount: '1000000000000000000', // the amount of the ERC20 token that grants access to the metadata
  decimals: 18, // the decimals of the ERC20 token that grants access to the metadata
  condition: ScalarOperator.GreaterThanOrEqual, // the condition that must be met to grant access to the metadata, supported conditions are: '==', '!=', '>', '<', '>=', '<='
};

const profileAccessCondition: ProfileOwnership = {
  profileId: '0x01',
};

const followAccessCondition: FollowCondition = {
  profileId: '0x01',
};

const collectAccessCondition: CollectCondition = {
  publicationId: '0x01-0x01',
};

const andCondition: AndCondition = {
  criteria: [
    {
      token: erc20AccessCondition,
    },
    {
      follow: followAccessCondition,
    },
  ],
};

const orCondition: OrCondition = {
  criteria: [
    {
      collect: collectAccessCondition,
    },
    {
      profile: profileAccessCondition,
    },
  ],
}(async () => {
  const sdk = await LensGatedSDK.create({
    provider: new Web3Provider(window.ethereum), // or any ethers Provider
    signer: signer, // a wallet or JsonRpcSigner from wagmi or similar
    env: LensEnvironment.Mumbai,
  });

  // this must be called anytime you change networks, exposed so you can add this to your Web3Provider event handling
  // but not necessary to call explicitly
  await sdk.connect({
    address: '0x1234123412341234123412341234123412341234', // your signer's wallet address
    env: LensEnvironment.Polygon,
  });

  const { error, contentURI, encryptedMetadata } = await sdk.gated.encryptMetadata(
    metadata,
    '0x01', // the signed in user's profile id
    {
      nft: nftAccessCondition,
    }, // or any other access condition object
    uploadMetadataHandler
  );
  console.log(contentURI);
  // contentURI is ready to be used in the `contentURI` field of your `createPostTypedMetadata` call
  // also exposing the encrypted metadata in case you want to do something with it
  // ... create post using the Lens API ...

  // decrypt metadata
  // in most usecases you will fetch the metadata from the Lens API `getPublications` or similar call that returns
  // publication content,then for content with `isGated` = true, you can apply the decryption function to the
  // publication's metadata object
  const { decrypted } = await sdk.gated.decryptMetadata(encryptedMetadata);

  // deinitializes variables and deletes the SIWE-compatible signature from storage
  await sdk.disconnect();
})();
```

## Access Control

The currently supported access control models are:

- Follow condition: decrypts content if you follow a given profile id
- Collect condition: decrypts content if you have collected a given publication
- Profile ownership: decrypts content if you own a given profile NFT
- NFT ownership: generic NFT ownership condition for all remaining usecases like:
  - If you own an NFT from a given collection (Bored Apes etc.)
  - If you own an NFT within a specific range of Token IDs (Your first 100 followers)
- ERC20 token ownership: decrypts content if you own X amount of a given ERC20 token (People with more than 0.1 WETH)
- EOA ownership: decrypts content exclusively to a given EOA address
- Boolean combinations of the above (using AND and OR operators)
  - Please note that boolean combinations are limited to 5 conditions at a time and cannot be nested.
