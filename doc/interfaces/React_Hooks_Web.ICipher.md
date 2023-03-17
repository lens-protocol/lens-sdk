# Interface: ICipher

[React Hooks Web](../modules/React_Hooks_Web.md).ICipher

Implementation MUST be able to encrypt and decrypt data using AES-256-CBC.

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

[packages/gated-content/src/IEncryptionProvider.ts:13](https://github.com/lens-protocol/lens-sdk/blob/main/packages/gated-content/src/IEncryptionProvider.ts#L13)

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

[packages/gated-content/src/IEncryptionProvider.ts:8](https://github.com/lens-protocol/lens-sdk/blob/main/packages/gated-content/src/IEncryptionProvider.ts#L8)
