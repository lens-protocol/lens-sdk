# Class: TransactionError

## Hierarchy

- `Error`

  ↳ **`TransactionError`**

## Table of contents

### Constructors

- [constructor](TransactionError.md#constructor)

### Properties

- [cause](TransactionError.md#cause)
- [message](TransactionError.md#message)
- [name](TransactionError.md#name)
- [reason](TransactionError.md#reason)
- [stack](TransactionError.md#stack)
- [prepareStackTrace](TransactionError.md#preparestacktrace)
- [stackTraceLimit](TransactionError.md#stacktracelimit)

### Methods

- [captureStackTrace](TransactionError.md#capturestacktrace)

## Constructors

### constructor

• **new TransactionError**(`reason`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `reason` | [`TransactionErrorReason`](../enums/TransactionErrorReason.md) |

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

• **name**: ``"TransactionError"``

#### Overrides

Error.name

___

### reason

• `Readonly` **reason**: [`TransactionErrorReason`](../enums/TransactionErrorReason.md)

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
