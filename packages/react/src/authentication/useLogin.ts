import { Profile } from '@lens-protocol/api-bindings';
import { LoginError, LoginRequest } from '@lens-protocol/domain/use-cases/authentication';

import { UseDeferredTask, useDeferredTask } from '../helpers/tasks';
import { useLoginController } from './adapters/useLoginController';

export function useLogin(): UseDeferredTask<Profile, LoginError, LoginRequest> {
  const login = useLoginController();
  return useDeferredTask(login);
}
