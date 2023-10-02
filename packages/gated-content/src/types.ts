import { Primitive } from '@lens-protocol/shared-kernel';

type UnionOf<A> = A extends Array<unknown> ? A[number] : A[keyof A];

// Adapted from ts-toolbelt: https://github.com/millsp/ts-toolbelt/blob/master/sources/Object/Paths.ts#L21
export type PathsOf<Target, Root extends string = ''> = UnionOf<{
  [Key in keyof Target]-?: Key extends string
    ? `${Root}${Target[Key] extends Primitive | undefined | null
        ? Key
        : Target[Key] extends ReadonlyArray<infer ItemType> | null | undefined
        ? ItemType extends Primitive // acts also to distribute over union ItemType
          ? `${Key}[n]`
          : PathsOf<ItemType, `${Key}[n].`>
        : PathsOf<Target[Key], `${Key}.`>}`
    : never;
}>;

export type LitError = {
  message: string;
  name: string;
  errorCode: string;
};

export function isLitError(throwable: unknown): throwable is LitError {
  if (typeof throwable !== 'object' || throwable === null) {
    return false;
  }
  return ['name', 'message', 'errorCode'].every((key) => key in throwable);
}
