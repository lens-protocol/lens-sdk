## `@lens-protocol/eslint-config`

Project's [ESLint](https://eslint.org/) config.

## Usage

**Install**:

```bash
$ pnpm add -D @lens-protocol/eslint-config
```

**Install peer dependencies**

```bash
$ pnpm add -D eslint
```

**Add a [flat config](https://eslint.org/blog/2022/08/new-config-system-part-2/) `eslint.config.js` file to your package**:

```js
export default {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['@lens-protocol/eslint-config'],
  // ...
};
```
