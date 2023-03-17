# Interface: ICipher

[React Hooks Web](../modules/React_Hooks_Web.md).ICipher

A cipher that can encrypt and decrypt data.

Implementation MUST be able to encrypt and decrypt data using AES-256-CBC.

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

#### Defined in

[packages/gated-content/src/IEncryptionProvider.ts:21](https://github.com/lens-protocol/lens-sdk/blob/main/packages/gated-content/src/IEncryptionProvider.ts#L21)

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

#### Defined in

[packages/gated-content/src/IEncryptionProvider.ts:14](https://github.com/lens-protocol/lens-sdk/blob/main/packages/gated-content/src/IEncryptionProvider.ts#L14)

___

### exportKey

▸ **exportKey**(): `Promise`<`Uint8Array`\>

Export the AES-256-CBC key in a Uint8Array buffer.

#### Returns

`Promise`<`Uint8Array`\>

#### Defined in

[packages/gated-content/src/IEncryptionProvider.ts:26](https://github.com/lens-protocol/lens-sdk/blob/main/packages/gated-content/src/IEncryptionProvider.ts#L26)
