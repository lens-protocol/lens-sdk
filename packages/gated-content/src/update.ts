import { UnknownObject } from '@lens-protocol/shared-kernel';
import traverse from 'traverse';

function pathToRegExp(path: string): RegExp {
  return new RegExp(`^${path.replaceAll('.', '\\.').replaceAll('[n]', '\\.\\d+')}$`);
}

export type AsyncUpdater = (value: string, path: string) => Promise<string>;

export async function update<TObject extends UnknownObject>(
  input: TObject,
  paths: string[],
  updater: AsyncUpdater,
): Promise<TObject> {
  const output = traverse.clone(input);
  const regexps = paths.map(pathToRegExp);
  const toUpdate = traverse
    .paths(output)
    .filter((path) => regexps.some((r) => r.test(path.join('.'))));

  for (const path of toUpdate) {
    const value = traverse.get(output, path) as unknown;

    if (typeof value === 'string') {
      const updated = await updater(value, path.join('.'));
      traverse.set(output, path, updated);
    }
  }

  return output;
}
