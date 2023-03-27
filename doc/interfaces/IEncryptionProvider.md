# Interface: IEncryptionProvider

A provider of encryption ciphers.

## Table of contents

### Methods

- [createCipher](IEncryptionProvider.md#createcipher)
- [importCipher](IEncryptionProvider.md#importcipher)

## Methods

### createCipher

▸ **createCipher**(): `Promise`<[`ICipher`](ICipher.md)\>

Create a new cipher using a randomly generated AES-256-CBC key.

#### Returns

`Promise`<[`ICipher`](ICipher.md)\>

___

### importCipher

▸ **importCipher**(`key`): `Promise`<[`ICipher`](ICipher.md)\>

Import a cipher from an AES-256-CBC key.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `Uint8Array` |

#### Returns

`Promise`<[`ICipher`](ICipher.md)\>
