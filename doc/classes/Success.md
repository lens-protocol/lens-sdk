# Class: Success<T, E\>

A `Success<T, E>` represents a successful computation that returns a value of type `T`.

`E` in `Success<T, E>` is the type of the error that would have been returned in case of failure.
It's present only to allow type safety of the `isFailure` method.

## Type parameters

| Name |
| :------ |
| `T` |
| `E` |

## Table of contents

### Constructors

- [constructor](Success.md#constructor)

### Properties

- [value](Success.md#value)

### Methods

- [isFailure](Success.md#isfailure)
- [isSuccess](Success.md#issuccess)
- [unwrap](Success.md#unwrap)

## Constructors

### constructor

• **new Success**<`T`, `E`\>(`value`)

#### Type parameters

| Name |
| :------ |
| `T` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

## Properties

### value

• `Readonly` **value**: `T`

## Methods

### isFailure

▸ **isFailure**(): this is Failure<T, E\>

#### Returns

this is Failure<T, E\>

___

### isSuccess

▸ **isSuccess**(): this is Success<T, E\>

#### Returns

this is Success<T, E\>

___

### unwrap

▸ **unwrap**(): `T`

#### Returns

`T`
