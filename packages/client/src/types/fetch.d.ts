// Simple fetch typings to avoid having to install @types/node-fetch
// Once @types/node supports fetch api type definitions, we can remove this
// see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/60924
// eslint-disable-next-line
function fetch(input: unknown, init?: unknown): Promise<unknown>;
