export class NotFoundError extends Error {
  name = 'NotFoundError' as const;

  constructor(message: string) {
    super(message);
  }
}
