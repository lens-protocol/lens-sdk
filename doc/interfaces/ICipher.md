# Interface: ICipher

A cipher that can encrypt and decrypt data.

Implementation MUST be able to encrypt and decrypt data using AES-256-CBC.

## Table of contents

### Methods

- [decrypt](ICipher.md#decrypt)
- [encrypt](ICipher.md#encrypt)
- [exportKey](ICipher.md#exportkey)

## Methods

### decrypt

▸ **decrypt**(`data`): `Promise`<`string`\>

Decrypt the provided data.

Implementations SHOULD assume data is base64-encoded strings representation of the encrypted data.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`Promise`<`string`\>

___

### encrypt

▸ **encrypt**(`data`): `Promise`<`string`\>

Encrypt the provided data.

Implementations MUST return base64-encoded strings of the encrypted data.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`Promise`<`string`\>

___

### exportKey

▸ **exportKey**(): `Promise`<`Uint8Array`\>

Export the AES-256-CBC key in a Uint8Array buffer.

#### Returns

`Promise`<`Uint8Array`\>
