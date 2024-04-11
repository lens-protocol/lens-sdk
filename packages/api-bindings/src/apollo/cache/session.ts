import { makeVar, useReactiveVar } from '@apollo/client';
import { SessionData } from '@lens-protocol/domain/use-cases/authentication';

export const sessionDataVar = makeVar<SessionData | null>(null);

export function getSessionData() {
  return sessionDataVar();
}

export function useSessionDataVar() {
  return useReactiveVar(sessionDataVar);
}

export function resetSessionData() {
  sessionDataVar(null);
}

export function updateSessionData(session: SessionData) {
  sessionDataVar(session);
}
