/**
 * Inspired by https://dev.to/tipsy_dev/advanced-typescript-reinventing-lodash-get-4fhe
 */
import lodashGet from 'lodash/get.js';

type GetFieldType<Obj, Path> = Path extends `${infer Left}.${infer Right}`
  ? Left extends keyof Obj
    ? GetFieldType<Exclude<Obj[Left], undefined>, Right> | Extract<Obj[Left], undefined>
    : undefined
  : Path extends keyof Obj
  ? Obj[Path]
  : undefined;

export function get<TData, TPath extends string, TDefault = GetFieldType<TData, TPath>>(
  data: TData,
  path: TPath,
  defaultValue?: TDefault,
): GetFieldType<TData, TPath> | TDefault {
  const lodashPath = path.split('.');

  return lodashGet(data, lodashPath, defaultValue) as GetFieldType<TData, TPath>;
}
