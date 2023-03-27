# Class: Erc20

Erc20 is a value object representing an ERC20 token.

## Table of contents

### Constructors

- [constructor](Erc20.md#constructor)

### Properties

- [address](Erc20.md#address)
- [chainType](Erc20.md#chaintype)
- [decimals](Erc20.md#decimals)
- [kind](Erc20.md#kind)
- [name](Erc20.md#name)
- [symbol](Erc20.md#symbol)

### Accessors

- [hash](Erc20.md#hash)

### Methods

- [isErc20](Erc20.md#iserc20)
- [isFiat](Erc20.md#isfiat)
- [isNativeToken](Erc20.md#isnativetoken)
- [toString](Erc20.md#tostring)

## Constructors

### constructor

• **new Erc20**(`name`, `decimals`, `symbol`, `address`, `chainType`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `decimals` | `number` |
| `symbol` | `string` |
| `address` | `string` |
| `chainType` | [`ChainType`](../enums/ChainType.md) |

## Properties

### address

• `Readonly` **address**: `string`

___

### chainType

• `Readonly` **chainType**: [`ChainType`](../enums/ChainType.md)

___

### decimals

• `Readonly` **decimals**: `number`

___

### kind

• `Readonly` **kind**: [`ERC20`](../enums/Kind.md#erc20)

___

### name

• `Readonly` **name**: `string`

___

### symbol

• `Readonly` **symbol**: `string`

## Accessors

### hash

• `get` **hash**(): `string`

#### Returns

`string`

## Methods

### isErc20

▸ **isErc20**(): this is Erc20

#### Returns

this is Erc20

___

### isFiat

▸ **isFiat**(): this is Fiat

#### Returns

this is Fiat

___

### isNativeToken

▸ **isNativeToken**(): this is CryptoNativeAsset

#### Returns

this is CryptoNativeAsset

___

### toString

▸ **toString**(): `string`

#### Returns

`string`
