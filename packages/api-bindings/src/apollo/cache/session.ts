import { makeVar, useReactiveVar } from '@apollo/client';
import { SessionData } from '@lens-protocol/domain/src/use-cases/authentication';

const sessionVar = makeVar<SessionData | null>(null);

export function getSessionData() {
  return sessionVar();
}

export function useSessionDataVar() {
  return useReactiveVar(sessionVar);
}

export function resetSession() {
  sessionVar(null);
}

export function updateSessionData(session: SessionData) {
  sessionVar(session);
}
