# Class: FailedTransactionError

Error thrown when a transaction fails

## Hierarchy

- `CausedError`

  ↳ **`FailedTransactionError`**

## Table of contents

### Constructors

- [constructor](FailedTransactionError.md#constructor)

### Properties

- [cause](FailedTransactionError.md#cause)
- [data](FailedTransactionError.md#data)
- [message](FailedTransactionError.md#message)
- [name](FailedTransactionError.md#name)
- [stack](FailedTransactionError.md#stack)
- [prepareStackTrace](FailedTransactionError.md#preparestacktrace)
- [stackTraceLimit](FailedTransactionError.md#stacktracelimit)

### Methods

- [captureStackTrace](FailedTransactionError.md#capturestacktrace)

## Constructors

### constructor

• **new FailedTransactionError**(`cause`, `data`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cause` | [`TransactionError`](TransactionError.md) |
| `data` | [`TransactionData`](../README.md#transactiondata)<[`SupportedTransactionRequest`](../README.md#supportedtransactionrequest)\> |

#### Overrides

CausedError.constructor

## Properties

### cause

• `Optional` `Readonly` **cause**: `Error`

#### Inherited from

CausedError.cause

___

### data

• `Optional` `Readonly` **data**: [`TransactionData`](../README.md#transactiondata)<[`SupportedTransactionRequest`](../README.md#supportedtransactionrequest)\>

___

### message

• **message**: `string`

#### Inherited from

CausedError.message

___

### name

• **name**: `string`

#### Inherited from

CausedError.name

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

CausedError.stack

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

CausedError.prepareStackTrace

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

CausedError.stackTraceLimit

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

CausedError.captureStackTrace
