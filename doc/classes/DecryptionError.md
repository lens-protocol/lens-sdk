# Class: DecryptionError

## Hierarchy

- `Error`

  ↳ **`DecryptionError`**

## Table of contents

### Constructors

- [constructor](DecryptionError.md#constructor)

### Properties

- [cause](DecryptionError.md#cause)
- [message](DecryptionError.md#message)
- [name](DecryptionError.md#name)
- [stack](DecryptionError.md#stack)
- [prepareStackTrace](DecryptionError.md#preparestacktrace)
- [stackTraceLimit](DecryptionError.md#stacktracelimit)

### Methods

- [captureStackTrace](DecryptionError.md#capturestacktrace)

## Constructors

### constructor

• **new DecryptionError**(`message`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Overrides

Error.constructor

## Properties

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

Error.cause

___

### message

• `Readonly` **message**: `string`

#### Inherited from

Error.message

___

### name

• **name**: ``"DecryptionError"``

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
