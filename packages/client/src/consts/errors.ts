export class NotAuthenticatedError extends Error {
  name = 'NotAuthenticatedError' as const;

  constructor() {
    super('Not Authenticated');
  }
}
