export function never(message = 'Unexpected call to never()'): never {
  throw new Error(message);
}

