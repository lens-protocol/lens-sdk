import { useDeferredTask, UseDeferredTask } from '../helpers/tasks';
import { useLogoutController } from './adapters/useLogoutController';

/**
 * `useLogout` is a React Hook that allows you to logout from the current session.
 *
 * @example
 * ```tsx
 * const { execute, loading } = useLogout();
 * ```
 *
 * ## Usage
 *
 * ```tsx
 * const { execute: logout } = useLogout();
 *
 * return <button onClick={logout}>Logout</button>;
 * ```
 *
 * @category Authentication
 * @group Hooks
 */
export function useLogout(): UseDeferredTask {
  return useDeferredTask(useLogoutController());
}
