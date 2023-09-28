export function never(message = 'Unexpected call to never()'): never {
  throw new Error(message);
}

export function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
