type ErrorShape<T> = {
  code: T;
  message: string;
  stack: string;
};

export function assertErrorObjectWithCode<T>(error: unknown): asserts error is ErrorShape<T> {
  if (!Object.prototype.hasOwnProperty.call(error, 'code')) {
    throw error;
  }
}
