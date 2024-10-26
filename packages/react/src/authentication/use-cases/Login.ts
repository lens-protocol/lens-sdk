import type { ResultAsync } from '@lens-social/types';

export interface SessionManager<TRequest, TResult> {
  login(request: TRequest): TResult;
}

export type AccountRepository<TSession, TResult> = (session: TSession) => TResult;

export class Login<TRequest, TSession, TAccount, TSessionError, TAccountError> {
  constructor(
    private readonly sessions: SessionManager<TRequest, ResultAsync<TSession, TSessionError>>,
    private readonly fetchAccount: AccountRepository<
      TSession,
      ResultAsync<TAccount, TAccountError>
    >,
  ) {}

  execute(request: TRequest): ResultAsync<TAccount, TSessionError | TAccountError> {
    return this.sessions.login(request).andThen((session) => this.fetchAccount(session));
  }
}
