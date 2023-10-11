import {
  UnspecifiedError,
  useSessionDataVar,
  Profile,
  useProfile,
} from '@lens-protocol/api-bindings';
import { LogoutReason, SessionType } from '@lens-protocol/domain/use-cases/authentication';
import { EvmAddress, invariant } from '@lens-protocol/shared-kernel';
import { useEffect, useRef } from 'react';

import { useLensApolloClient } from '../helpers/arguments';
import { ReadResult } from '../helpers/reads';

function usePreviousValue<T>(value: T) {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export { LogoutReason, SessionType };

/**
 * A not authenticated user's session
 */
export type AnonymousSession = {
  /**
   * The union discriminant.
   */
  type: SessionType.Anonymous;
  /**
   * Whether the user is authenticated or not.
   */
  authenticated: false;
  /**
   * The reason the previous session ended.
   */
  lastLogoutReason?: LogoutReason;
};

/**
 * A typical authenticated user's session.
 */
export type ProfileSession = {
  /**
   * The union discriminant.
   */
  type: SessionType.WithProfile;
  /**
   * Whether the user is authenticated or not.
   */
  authenticated: true;
  /**
   * The Profile Owner or an authorized Profile Manager.
   */
  address: EvmAddress;
  /**
   * The authenticated Profile.
   */
  profile: Profile;
};

/**
 * An authenticated user's session with just a wallet address.
 *
 * This is currently not used, but will be used in the future.
 */
export type WalletOnlySession = {
  /**
   * The union discriminant.
   */
  type: SessionType.JustWallet;
  /**
   * Whether the user is authenticated or not.
   */
  authenticated: true;
  /**
   * The Profile Owner or an authorized Profile Manager.
   */
  address: EvmAddress;
};

/**
 * Describes the details of a user's session.
 */
export type Session = AnonymousSession | ProfileSession | WalletOnlySession;

/**
 * `useSession` is a hook that lets you access the current {@link Session}
 *
 * **WARNING:** the {@link Session} type is a union type of {@link AnonymousSession}, {@link ProfileSession}, and {@link WalletOnlySession}.
 * At the moment only {@link AnonymousSession} and {@link ProfileSession} are supported. {@link WalletOnlySession} will be supported soon
 * after the official Lens Protocol v2 switch.
 *
 * @example
 * Use this hook to determine if the user is authenticated or not.
 * ```tsx
 * function Page() {
 *   const { data, loading } = useSession();
 *
 *   if (loading) return <p>Loading...</p>;
 *
 *   switch (data.type) {
 *     case SessionType.Anonymous:
 *       // session is a AnonymousSession
 *       return <Login />;
 *
 *     case SessionType.WithProfile:
 *       // session is a ProfileSession
 *       return <MyProfile profile={session.profile} />;
 *
 *     default:
 *       return <p>Something went wrong.</p>;
 *   }
 * }
 * ```
 *
 * @category Authentication
 * @group Hooks
 */
export function useSession(): ReadResult<Session, UnspecifiedError> {
  const sessionData = useSessionDataVar();

  const prevSession = usePreviousValue(sessionData);

  const trigger = sessionData?.type === SessionType.WithProfile;
  const profileId =
    sessionData?.type === SessionType.WithProfile ? sessionData.profileId : undefined;

  const { data, error, previousData } = useProfile(
    useLensApolloClient({
      variables: {
        request: {
          forProfileId: profileId,
        },
      },
      fetchPolicy: 'cache-first',
      skip: !trigger,
    }),
  );

  if (!sessionData) {
    return {
      data: undefined,
      error: undefined,
      loading: true,
    };
  }

  invariant(
    sessionData.type !== SessionType.JustWallet,
    `${SessionType.JustWallet} sessions are not supported a the moment.`,
  );

  if (sessionData.type === SessionType.Anonymous) {
    return {
      data: {
        type: SessionType.Anonymous,
        authenticated: false,
        lastLogoutReason: sessionData.lastLogoutReason,
      },
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
      if (previousData?.result) {
        return {
          data: {
            type: SessionType.WithProfile,
            authenticated: true,
            address: prevSession.address,
            profile: previousData.result,
          },
          error: undefined,
          loading: false,
        };
      }

      // shouldn't happen, but just in case, fallback to loading
      return {
        data: undefined,
        error: undefined,
        loading: true,
      };
    }

    // transitioning from NotAuthenticatedSession to AuthenticatedProfileSession
    // OR from AuthenticatedWalletSession to AuthenticatedProfileSession
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data: prevSession,
      error: undefined,
      loading: false,
    };
  }

  invariant(
    data.result,
    `Active Profile [ID:${sessionData.profileId}] data not found.\n` +
      'This is likely an issue with UI state ported across environments.',
  );

  return {
    data: {
      type: SessionType.WithProfile,
      address: sessionData.address,
      authenticated: true,
      profile: data.result,
    },
    error: undefined,
    loading: false,
  };
}
