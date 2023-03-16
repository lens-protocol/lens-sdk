[lens-sdk](../README.md) / [Exports](../modules.md) / ICipher

# Interface: ICipher

Implementation MUST be able to encrypt and decrypt data using AES-256-CBC.

## Table of contents

### Methods

- [decrypt](ICipher.md#decrypt)
- [encrypt](ICipher.md#encrypt)

## Methods

### decrypt

▸ **decrypt**(`data`): `Promise`<`string`\>

Implementations SHOULD assume data is base64-encoded strings representation of the encrypted data.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[packages/gated-content/src/IEncryptionProvider.ts:13](https://github.com/lens-protocol/lens-sdk/blob/5741b72b/packages/gated-content/src/IEncryptionProvider.ts#L13)

___

### encrypt

▸ **encrypt**(`data`): `Promise`<`string`\>

Implementations MUST return base64-encoded strings of the encrypted data.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[packages/gated-content/src/IEncryptionProvider.ts:8](https://github.com/lens-protocol/lens-sdk/blob/5741b72b/packages/gated-content/src/IEncryptionProvider.ts#L8)
