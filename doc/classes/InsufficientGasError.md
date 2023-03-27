# Class: InsufficientGasError

## Hierarchy

- `Error`

  ↳ **`InsufficientGasError`**

## Table of contents

### Constructors

- [constructor](InsufficientGasError.md#constructor)

### Properties

- [asset](InsufficientGasError.md#asset)
- [cause](InsufficientGasError.md#cause)
- [message](InsufficientGasError.md#message)
- [name](InsufficientGasError.md#name)
- [stack](InsufficientGasError.md#stack)
- [prepareStackTrace](InsufficientGasError.md#preparestacktrace)
- [stackTraceLimit](InsufficientGasError.md#stacktracelimit)

### Methods

- [captureStackTrace](InsufficientGasError.md#capturestacktrace)

## Constructors

### constructor

• **new InsufficientGasError**(`asset`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `asset` | [`CryptoNativeAsset`](../README.md#cryptonativeasset) |

#### Overrides

Error.constructor

## Properties

### asset

• `Readonly` **asset**: [`CryptoNativeAsset`](../README.md#cryptonativeasset)

___

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

Error.cause

___

### message

• **message**: `string`

#### Inherited from

Error.message

___

### name

• **name**: ``"InsufficientGasError"``

#### Overrides

Error.name

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace
