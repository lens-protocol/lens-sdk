/**
 * The Gated module is a secondary entry point of the `@lens-protocol/client` package.
 * It provides an alternative {@link Gated.LensClient} class that supports all the
 * functionalities of the {@link Core.LensClient} plus the {@link Gated} module.
 *
 * The reason for this separation is that token-gated feature requires extra 3rd party dependencies
 * that could potentially impact the bundle size of your application. This way the
 * developer have the choice to opt-in for token-gated support only when needed.
 *
 * The usage is the same as the {@link Core.LensClient} class, but with the addition of
 * token gated configuration {@link Gated.LensClientConfig}: `authentication`, `signer`, and `encryption`.
 *
 * ## Quick start
 *
 * Install the required peer dependencies.
 *
 * ```bash
 * npm install zod @lens-protocol/metadata@latest
 *
 * # OR
 *
 * yarn add zod @lens-protocol/metadata@latest
 *
 * # OR
 *
 * pnpm add zod @lens-protocol/metadata@latest
 * ```
 *
 * Typical NodeJS setup:
 * ```ts
 * import { Wallet } from 'ethers';
 * import { production } from '@lens-protocol/client';
 * import { LensClient } from '@lens-protocol/client/gated';
 *
 * const signer = new Wallet(process.env.PRIVATE_KEY);
 *
 * const client = new LensClient({
 *   environment: production,
 *
 *   authentication: {
 *     domain: process.env.DOMAIN,
 *     uri: process.env.URI,
 *   },
 *
 *   signer,
 * });
 * ```
 *
 * Browser setup with `ethers` v6 and an EIP-1193 wallet (e.g. MetaMask):
 * ```ts
 * import { BrowserProvider } from 'ethers';
 * import { production } from '@lens-protocol/client';
 * import { LensClient } from '@lens-protocol/client/gated';
 *
 * // wrap the EIP-1193 provider with ethers v6 BrowserProvider
 * const provider = new BrowserProvider(window.ethereum);
 *
 * const client = new LensClient({
 *   environment: production,
 *
 *   authentication: {
 *     domain: window.location.hostname,
 *     uri: window.location.href,
 *   },
 *
 *   signer: await provider.getSigner(),
 * });
 * ```
 *
 * ## Encryption
 *
 * You can encrypt publication metadata using the {@link Gated.encryptPublicationMetadata} method.
 *
 * ```ts
 * import { article, erc721OwnershipCondition } from '@lens-protocol/metadata';
 *
 * // create metadata via '@lens-protocol/metadata' helpers
 * const metadata = article({ content: '...' });
 *
 * // encrypt the metadata specifying the access condition
 * const result = await client.gated.encryptPublicationMetadata(
 *   metadata,
 *   erc721OwnershipCondition({
 *     contract: { address: '0x...', chainId: 1 }
 *   })
 * );
 *
 * // handle encryption errors
 * if (result.isFailure()) {
 *   console.error(result.error);
 *   return; // bail out
 * }
 *
 * // upload the encrypted metadata to your storage of choice
 * const contentURI = await uploadToIPFS(result.value);
 *
 * // use the contentURI to create a publication
 * const result = await client.publication.postOnchain({ contentURI });
 * ```
 *
 * **What's happening?**
 * 1) create metadata via `@lens-protocol/metadata` helpers,
 * 2) encrypt it with the given access condition,
 * 3) upload it to a public location (e.g. IPFS, Arweave, public S3 bucket),
 * 4) use the resulting `contentURI` to create a Lens publication.
 *
 * ### Simple criteria
 *
 * Supported criteria available as helpers in the `@lens-protocol/metadata` package:
 * - `collectCondition` - the collection of a given publication is required
 * - `eoaOwnershipCondition` - the ownership of a given EOA is required
 * - `erc20OwnershipCondition` - the ownership of a given ERC20 amount is required
 * - `erc721OwnershipCondition` - the ownership of a given ERC721 token is required
 * - `erc1155OwnershipCondition` - the ownership of a given ERC1155 token is required
 * - `profileOwnershipCondition` - the ownership of a given profile is required
 * - `followCondition` - following a given profile is required
 *
 * Refer to the [`@lens-protocol/metadata`](https://lens-protocol.github.io/metadata/) reference for more details.
 *
 * **Collect this publication**
 *
 * It's possible to define an access condition where one of the criteria is to collect the current publication.
 *
 * Because at the time of encryption the publication is not yet created, the {@link Core.Publication.predictNextOnChainPublicationId} can be
 * used to predict the publication ID.
 *
 * ```ts
 * const condition = collectCondition({
 *   publicationId: await client.publication.predictNextOnChainPublicationId({
 *     from: profile.id,
 *   }),
 *   thisPublication: true, // flag to indicate that the current publication is the one to collect
 * });
 * ```
 *
 * ### Compound criteria
 *
 * Multiple criteria can be combined using the `orCondition` and `andCondition` helpers.
 * ```ts
 * const result = await client.gated.encryptPublicationMetadata(
 *   metadata,
 *   orCondition([
 *     profileOwnershipCondition({
 *       profileId: profile.id,
 *     }),
 *     erc721OwnershipCondition({
 *       contract: { address: '0x...', chainId: 1 }
 *     })
 *   ])
 * );
 * ```
 *
 * Supported compound criteria:
 * - `andCondition` - up to 5 criteria can be combined using the AND operator (except `orCondition` and `andCondition`)
 * - `orCondition` - up to 5 criteria can be combined using the OR operator (except `orCondition` and `andCondition`)
 *
 * ## Decryption
 *
 * You can decrypt publication metadata using the {@link Gated.decryptPublicationMetadataFragment} method.
 *
 * The method works seamlessly with publications returned by any `LensClient` method.
 *
 * ```ts
 * import { isEncryptedPublicationMetadata } from '@lens-protocol/client/gated';
 *
 * // fetch a publication, works with publications returned by any LensClient method
 * const post = await client.publication.fetch({ forId: '...' });
 *
 * // check if the publication metadata is encrypted
 * if (isEncryptedPublicationMetadata(post.metadata)) {
 *
 *   // decrypt the metadata
 *   const result = await client.gated.decryptPublicationMetadataFragment(post.metadata);
 *
 *   // handle decryption errors
 *   if (result.isFailure()) {
 *     console.error(result.error);
 *     return; // bail out
 *   }
 *
 *   // use the decrypted metadata
 *   console.log(result.value);
 * }
 * ```
 *
 * ⚠️ In case you find yourself using this feature with publication metadata fragment not originated from the `LensClient`
 * it's your responsibility to make sure the `PublicationMetadata` fragment is valid by making sure it:
 * - has `__typename` defined at every level of the fragment
 * - has the `encryptedWith` including ALL fields and sub-fields of the corresponding GQL node.
 *
 * @module Gated
 */
import { LensClient, LensClientConfig } from './LensClient';

export * from '../index';
export * from './Gated';

// NOTE: local exports takes priority over package exports, basically overriding the LensClient and
// see https://github.com/systemjs/systemjs/issues/1031#issuecomment-171262430
export { LensClient };
export type { LensClientConfig };

export { isEncryptedPublicationMetadata } from '@lens-protocol/gated-content';
export type {
  AuthenticationConfig,
  IEncryptionProvider,
  ISigner,
} from '@lens-protocol/gated-content';
