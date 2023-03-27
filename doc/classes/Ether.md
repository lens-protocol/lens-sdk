# Class: Ether

Ether is a value object representing the Ether token.

## Table of contents

### Constructors

- [constructor](Ether.md#constructor)

### Properties

- [chainType](Ether.md#chaintype)
- [decimals](Ether.md#decimals)
- [kind](Ether.md#kind)
- [name](Ether.md#name)
- [symbol](Ether.md#symbol)
- [type](Ether.md#type)

### Accessors

- [hash](Ether.md#hash)

### Methods

- [isErc20](Ether.md#iserc20)
- [isFiat](Ether.md#isfiat)
- [isNativeToken](Ether.md#isnativetoken)
- [toString](Ether.md#tostring)

## Constructors

### constructor

• **new Ether**()

## Properties

### chainType

• `Readonly` **chainType**: [`ChainType`](../enums/ChainType.md) = `ChainType.ETHEREUM`

___

### decimals

• `Readonly` **decimals**: `number` = `18`

___

### kind

• `Readonly` **kind**: [`NATIVE`](../enums/Kind.md#native)

___

### name

• `Readonly` **name**: `string`

___

### symbol

• `Readonly` **symbol**: `string`

___

### type

• `Readonly` **type**: [`ETHER`](../enums/NativeType.md#ether)

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
