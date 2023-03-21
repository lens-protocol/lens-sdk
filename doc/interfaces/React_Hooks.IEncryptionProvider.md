# Interface: IEncryptionProvider

[React Hooks](../modules/React_Hooks.md).IEncryptionProvider

A provider of encryption ciphers.

## Methods

### createCipher

▸ **createCipher**(): `Promise`<[`ICipher`](React_Hooks.ICipher.md)\>

Create a new cipher using a randomly generated AES-256-CBC key.

#### Returns

`Promise`<[`ICipher`](React_Hooks.ICipher.md)\>

#### Defined in

[packages/gated-content/src/IEncryptionProvider.ts:38](https://github.com/lens-protocol/lens-sdk/blob/main/packages/gated-content/src/IEncryptionProvider.ts#L38)

___

### importCipher

▸ **importCipher**(`key`): `Promise`<[`ICipher`](React_Hooks.ICipher.md)\>

Import a cipher from an AES-256-CBC key.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `Uint8Array` |

#### Returns

`Promise`<[`ICipher`](React_Hooks.ICipher.md)\>

#### Defined in

[packages/gated-content/src/IEncryptionProvider.ts:43](https://github.com/lens-protocol/lens-sdk/blob/main/packages/gated-content/src/IEncryptionProvider.ts#L43)
