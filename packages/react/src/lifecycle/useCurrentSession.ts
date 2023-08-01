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
import { invariant } from '@lens-protocol/shared-kernel';
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

  const prevSession = usePrevious(session);

  const trigger = session?.type === SessionType.WithProfile;
  const profileId = session?.type === SessionType.WithProfile ? session.profile.id : undefined;

  const { data, error } = useGetProfile(
    useLensApolloClient({
      variables: useMediaTransformFromConfig(
        useSourcesFromConfig({
          request: {
            profileId,
          },
        }),
      ),
      fetchPolicy: 'cache-first',
      skip: !trigger,
    }),
  );

  const prevData = usePrevious(data);

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
    if (!prevSession) {
      // no data, no previous session, so still loading for initial data
      return {
        data: undefined,
        error: undefined,
        loading: true,
      };
    }

    if (prevSession.type === SessionType.WithProfile) {
      // no data, but we have a previous session, so that means transitioning to a new profile
      if (prevData?.result) {
        invariant(
          isProfileOwnedByMe(prevData.result),
          `Previous Active Profile [ID:${prevData.result.id}] not owned by the active wallet.\n` +
            `Check the Profile ID provided is owned by ${session.wallet.address}.`,
        );

        return {
          data: authenticatedProfile(prevSession.wallet, prevData.result),
          error: undefined,
          loading: false,
        };
      }

      // shoudn't happen, but just in case, fallback to loading
      return {
        data: undefined,
        error: undefined,
        loading: true,
      };
    }

    // transitioning from NotAuthenticatedSession to AuthenticatedProfileSession
    // OR from AuthenticatedWalletSession to AuthenticatedProfileSession
    return {
      data: prevSession,
      error: undefined,
      loading: false,
    };
  }

  invariant(
    data.result,
    `Active Profile [ID:${session.profile.id}] data not found.\n` +
      'Check the Profile ID provided exists in the current environment.',
  );
  invariant(
    isProfileOwnedByMe(data.result),
    `Active Profile [ID:${session.profile.id}] not owned by the active wallet.\n` +
      `Check the Profile ID provided is owned by ${session.wallet.address}.`,
  );

  return {
    data: authenticatedProfile(session.wallet, data.result),
    error: undefined,
    loading: false,
  };
}
