import { makeVar, useReactiveVar } from '@apollo/client';
import { ProfileIdentifier } from '@lens-protocol/domain/use-cases/profile';

export const activeProfileIdentifierVar = makeVar<ProfileIdentifier | null>(null);

export function useActiveProfileIdentifierVar() {
  return useReactiveVar(activeProfileIdentifierVar);
}
