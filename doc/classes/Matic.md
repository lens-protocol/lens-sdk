# Class: Matic

Matic is a value object representing the Matic token.

## Table of contents

### Constructors

- [constructor](Matic.md#constructor)

### Properties

- [chainType](Matic.md#chaintype)
- [decimals](Matic.md#decimals)
- [kind](Matic.md#kind)
- [name](Matic.md#name)
- [symbol](Matic.md#symbol)
- [type](Matic.md#type)

### Accessors

- [hash](Matic.md#hash)

### Methods

- [isErc20](Matic.md#iserc20)
- [isFiat](Matic.md#isfiat)
- [isNativeToken](Matic.md#isnativetoken)
- [toString](Matic.md#tostring)

## Constructors

### constructor

• **new Matic**()

## Properties

### chainType

• `Readonly` **chainType**: [`ChainType`](../enums/ChainType.md) = `ChainType.POLYGON`

___

### decimals

• `Readonly` **decimals**: ``18``

___

### kind

• `Readonly` **kind**: [`NATIVE`](../enums/Kind.md#native)

___

### name

• `Readonly` **name**: ``"Matic"``

___

### symbol

• `Readonly` **symbol**: [`MATIC`](../enums/WellKnownSymbols.md#matic)

___

### type

• `Readonly` **type**: [`MATIC`](../enums/NativeType.md#matic)

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

▸ **toString**(): [`MATIC`](../enums/WellKnownSymbols.md#matic)

#### Returns

[`MATIC`](../enums/WellKnownSymbols.md#matic)
