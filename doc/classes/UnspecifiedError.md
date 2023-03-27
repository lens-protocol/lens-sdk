# Class: UnspecifiedError

## Hierarchy

- `CausedError`

  ↳ **`UnspecifiedError`**

## Table of contents

### Constructors

- [constructor](UnspecifiedError.md#constructor)

### Properties

- [cause](UnspecifiedError.md#cause)
- [message](UnspecifiedError.md#message)
- [name](UnspecifiedError.md#name)
- [stack](UnspecifiedError.md#stack)
- [prepareStackTrace](UnspecifiedError.md#preparestacktrace)
- [stackTraceLimit](UnspecifiedError.md#stacktracelimit)

### Methods

- [captureStackTrace](UnspecifiedError.md#capturestacktrace)

## Constructors

### constructor

• **new UnspecifiedError**(`cause`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cause` | `Error` |

#### Overrides

CausedError.constructor

## Properties

### cause

• `Optional` `Readonly` **cause**: `Error`

#### Inherited from

CausedError.cause

___

### message

• **message**: `string`

#### Inherited from

CausedError.message

___

### name

• **name**: ``"UnspecifiedError"``

#### Overrides

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
