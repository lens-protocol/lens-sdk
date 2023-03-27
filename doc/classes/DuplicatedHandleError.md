# Class: DuplicatedHandleError

## Hierarchy

- `Error`

  ↳ **`DuplicatedHandleError`**

## Table of contents

### Constructors

- [constructor](DuplicatedHandleError.md#constructor)

### Properties

- [cause](DuplicatedHandleError.md#cause)
- [message](DuplicatedHandleError.md#message)
- [name](DuplicatedHandleError.md#name)
- [stack](DuplicatedHandleError.md#stack)
- [prepareStackTrace](DuplicatedHandleError.md#preparestacktrace)
- [stackTraceLimit](DuplicatedHandleError.md#stacktracelimit)

### Methods

- [captureStackTrace](DuplicatedHandleError.md#capturestacktrace)

## Constructors

### constructor

• **new DuplicatedHandleError**(`handle`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | `string` |

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

• **name**: ``"DuplicatedHandleError"``

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
