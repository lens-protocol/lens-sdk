import {
  ProfileSession,
  Session,
  SessionType,
  WalletOnlySession,
  useSession,
} from '@lens-protocol/react-web';
import { ReactNode } from 'react';

import { ErrorMessage } from '../error/ErrorMessage';
import { Loading } from '../loading/Loading';

export type RenderFunction<T extends Session> = (session: T) => ReactNode;

export type LoggedInChildren<T extends Session> = ReactNode | RenderFunction<T>;

export type WhenLoggedInProps<TType extends SessionType, TSession extends Session> = {
  children: LoggedInChildren<TSession>;
  with: TType;
  fallback?: ReactNode;
};

export function WhenLoggedIn(
  props: WhenLoggedInProps<SessionType.JustWallet, WalletOnlySession>,
): JSX.Element;
export function WhenLoggedIn(
  props: WhenLoggedInProps<SessionType.WithProfile, ProfileSession>,
): JSX.Element;
export function WhenLoggedIn<
  T extends SessionType.JustWallet | SessionType.WithProfile,
  S extends WalletOnlySession | ProfileSession,
>(props: WhenLoggedInProps<T, S>) {
  const { data: session, loading, error } = useSession();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (session.type !== props.with) {
    return props.fallback ?? null;
  }

  if (typeof props.children === 'function') {
    return <>{props.children(session as S)}</>;
  }
  return <>{props.children}</>;
}
