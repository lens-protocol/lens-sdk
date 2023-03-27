# Class: Fiat

Fiat is a value object representing a fiat currency.

## Table of contents

### Constructors

- [constructor](Fiat.md#constructor)

### Properties

- [decimals](Fiat.md#decimals)
- [kind](Fiat.md#kind)
- [name](Fiat.md#name)
- [symbol](Fiat.md#symbol)

### Accessors

- [hash](Fiat.md#hash)

### Methods

- [isErc20](Fiat.md#iserc20)
- [isFiat](Fiat.md#isfiat)
- [toString](Fiat.md#tostring)

## Constructors

### constructor

• **new Fiat**(`name`, `symbol`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `symbol` | `string` |

## Properties

### decimals

• `Readonly` **decimals**: `number`

___

### kind

• `Readonly` **kind**: [`FIAT`](../enums/Kind.md#fiat)

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

### toString

▸ **toString**(): `string`

#### Returns

`string`
