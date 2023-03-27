# Class: WalletConnectionError

## Hierarchy

- `Error`

  ↳ **`WalletConnectionError`**

## Table of contents

### Constructors

- [constructor](WalletConnectionError.md#constructor)

### Properties

- [cause](WalletConnectionError.md#cause)
- [message](WalletConnectionError.md#message)
- [name](WalletConnectionError.md#name)
- [reason](WalletConnectionError.md#reason)
- [stack](WalletConnectionError.md#stack)
- [prepareStackTrace](WalletConnectionError.md#preparestacktrace)
- [stackTraceLimit](WalletConnectionError.md#stacktracelimit)

### Methods

- [captureStackTrace](WalletConnectionError.md#capturestacktrace)

## Constructors

### constructor

• **new WalletConnectionError**(`reason`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reason` | [`WalletConnectionErrorReason`](../enums/WalletConnectionErrorReason.md) |

#### Overrides

Error.constructor

## Properties

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

• **name**: ``"WalletConnectionError"``

#### Overrides

Error.name

___

### reason

• `Readonly` **reason**: [`WalletConnectionErrorReason`](../enums/WalletConnectionErrorReason.md)

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
