export class NotAuthenticatedError extends Error {
  name = 'NotAuthenticatedError' as const;
  message = 'Not Authenticated';
}

export class CredentialsExpiredError extends Error {
  name = 'CredentialsExpiredError' as const;
  message = 'Authentication credentials are expired';
}
