import { useAsyncTask } from '../helpers/tasks';
import { useLoginController } from './adapters/useLoginController';

export function useLogin() {
  const login = useLoginController();
  return useAsyncTask(login);
}
