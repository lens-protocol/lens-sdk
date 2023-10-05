import { makeVar, useReactiveVar } from '@apollo/client';
import { SessionData } from '@lens-protocol/domain/src/use-cases/authentication';

/**
 * @experimental
 */
class NotAuthenticatedSession {
  isAuthenticated(): this is AuthenticatedProfileSession {
    return false;
  }

  isNotAuthenticated(): this is NotAuthenticatedSession {
    return true;
  }
}

/**
 * @experimental
 */
class AuthenticatedProfileSession {
  constructor(readonly data: SessionData) {}

  isAuthenticated(): this is AuthenticatedProfileSession {
    return true;
  }

  isNotAuthenticated(): this is NotAuthenticatedSession {
    return false;
  }
}

export type { NotAuthenticatedSession, AuthenticatedProfileSession };

export function notAuthenticated() {
  return new NotAuthenticatedSession();
}

export function authenticated(data: SessionData) {
  return new AuthenticatedProfileSession(data);
}

/**
 * @experimental
 */
export type Session = NotAuthenticatedSession | AuthenticatedProfileSession;

const sessionVar = makeVar<Session | null>(null);

export function getSession() {
  return sessionVar();
}

export function useSessionVar() {
  return useReactiveVar(sessionVar);
}

export function resetSession() {
  sessionVar(null);
}

export function updateSession(session: Session) {
  sessionVar(session);
}
