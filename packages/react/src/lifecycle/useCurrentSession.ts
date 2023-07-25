import {
  ProfileOwnedByMe,
  Session,
  SessionType,
  UnspecifiedError,
  authenticatedProfile,
  isProfileOwnedByMe,
  useGetProfile,
  useSessionVar,
} from '@lens-protocol/api-bindings';
import { WalletData } from '@lens-protocol/domain/use-cases/lifecycle';
import { invariant, never } from '@lens-protocol/shared-kernel';
import { useEffect, useRef } from 'react';

import {
  useLensApolloClient,
  useMediaTransformFromConfig,
  useSourcesFromConfig,
} from '../helpers/arguments';
import { ReadResult } from '../helpers/reads';

export type {
  NotAuthenticatedSession,
  AuthenticatedWalletSession,
  AuthenticatedProfileSession,
} from '@lens-protocol/api-bindings';

export { SessionType };

export type { Session, WalletData };

function usePrevious<T>(value: T) {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

/**
 * `useCurrentSession` is a hook that lets you access the current {@link Session}
 *
 * **Pro-tip**: Use this hook to determine if the user is authenticated or not,
 * and contextually if they have an Active Profile or not.
 *
 * @category Misc
 * @group Hooks
 * @internal Should not be used directly by consumers.
 * @experimental This API is experimental and may change in the future.
 *
 * @example
 * ```tsx
 * import { useCurrentSession } from '@lens-protocol/react-web';
 *
 * function Page() {
 *   const { data, loading } = useCurrentSession();
 *
 *   if (loading) return <p>Loading...</p>;
 *
 *   switch (data.type) {
 *     case SessionType.Anonymous:
 *       return <Login />;
 *
 *     case SessionType.JustWallet:
 *       return <CreateProfile for={session.wallet} />;
 *
 *     case SessionType.WithProfile:
 *       return <MyProfile profile={session.profile} />;
 *   }
 * }
 * ```
 */
export function useCurrentSession(): ReadResult<
  Session<WalletData, ProfileOwnedByMe>,
  UnspecifiedError
> {
  const session = useSessionVar();

  const prevSessionValue = usePrevious(session);

  const trigger = session?.type === SessionType.WithProfile;

  const { data, error } = useGetProfile(
    useLensApolloClient({
      variables: useMediaTransformFromConfig(
        useSourcesFromConfig({
          request: {
            profileId: session?.type === SessionType.WithProfile ? session.profile.id : undefined,
          },
        }),
      ),
      fetchPolicy: 'cache-first',
      skip: !trigger,
    }),
  );

  if (!session) {
    return {
      data: undefined,
      error: undefined,
      loading: true,
    };
  }

  if (session.type !== SessionType.WithProfile) {
    return {
      data: session,
      error: undefined,
      loading: false,
    };
  }

  if (error) {
    return {
      data: undefined,
      error: new UnspecifiedError(error),
      loading: false,
    };
  }

  if (!data) {
    if (!prevSessionValue) {
      return {
        data: undefined,
        error: undefined,
        loading: true,
      };
    }

    if (prevSessionValue.type === SessionType.WithProfile) {
      never(
        `Cannot retain previous session data while fetching Profile [ID:${session.profile.id}]\n` +
          `The previous authenticated session is for Profile [ID:${prevSessionValue.profile.id}].\n` +
          'This should never happen. If it does, please report it as a bug.',
      );
    }

    return {
      data: prevSessionValue,
      error: undefined,
      loading: false,
    };
  }

  invariant(
    data?.result,
    `Active Profile [ID:${session.profile.id}] data not found.\n` +
      'Check the Profile ID provided exists in the current environment.',
  );
  invariant(
    isProfileOwnedByMe(data.result),
    'Active Profile [ID:${session.profile.id}] not owned by the active wallet.\n' +
      `Check the Profile ID provided is owned by ${session.wallet.address}.`,
  );

  return {
    data: authenticatedProfile(session.wallet, data.result),
    error: undefined,
    loading: false,
  };
}
