import {
  UnspecifiedError,
  Profile,
  sessionDataVar,
  useProfile,
  useSessionDataVar,
} from '@lens-protocol/api-bindings';
import { ProfileId } from '@lens-protocol/domain/entities';
import {
  LogoutReason,
  SessionData,
  SessionType,
} from '@lens-protocol/domain/use-cases/authentication';
import { EvmAddress, invariant, never } from '@lens-protocol/shared-kernel';
import { useEffect } from 'react';

import { useLensApolloClient } from '../helpers/arguments';
import { ReadResult } from '../helpers/reads';
import { SuspenseEnabled, SuspenseResult } from '../helpers/suspense';
import { useLazyFragmentVariables } from '../helpers/variables';

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
 * {@link useSession} hook arguments
 */
export type UseSessionArgs = SuspenseEnabled;

/**
 * Returns current {@link Session} data.
 *
 * Use this hook to determine if the user is authenticated or not.
 * ```tsx
 * function Page() {
 *   const { data, error, loading } = useSession();
 *
 *   if (loading) return <Loader />;
 *
 *   if (error) return <p>Something went wrong.</p>;
 *
 *   switch (data.type) {
 *     case SessionType.Anonymous:
 *       // data is a AnonymousSession
 *       return <Login />;
 *
 *     case SessionType.JustWallet:
 *       // data is a WalletOnlySession
 *       return <MyWallet address={data.address} />;
 *
 *     case SessionType.WithProfile:
 *       // data is a ProfileSession
 *       return <MyProfile profile={data.profile} />;
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
export function useSession(args: UseSessionArgs): SuspenseResult<Session>;

/**
 * Returns current {@link Session} data.
 *
 * This signature supports [React Suspense](https://react.dev/reference/react/Suspense).
 *
 * ```tsx
 * function Page() {
 *   const { data } = useSession({ suspense: true });
 *
 *   switch (data.type) {
 *     case SessionType.Anonymous:
 *       // data is a AnonymousSession
 *       return <Login />;
 *
 *     case SessionType.JustWallet:
 *       // data is a WalletOnlySession
 *       return <MyWallet address={data.address} />;
 *
 *     case SessionType.WithProfile:
 *       // data is a ProfileSession
 *       return <MyProfile profile={data.profile} />;
 *
 *     default:
 *       return <p>Something went wrong.</p>;
 *   }
 * }
 * ```
 *
 * Further session data updates will NOT trigger a suspense.
 *
 * @category Authentication
 * @group Hooks
 */
export function useSession(): ReadResult<Session, UnspecifiedError>;

export function useSession(args?: {
  suspense: boolean;
}): ReadResult<Session, UnspecifiedError> | SuspenseResult<Session> {
  const sessionData = useSessionDataVar();

  const [primeCacheWithProfile, data] = useProfileFromCache(sessionData);

  const result = resultFrom(sessionData, data);

  const update = async (newSessionData: SessionData | null) => {
    invariant(newSessionData, 'Session data must be defined.');

    if (newSessionData.type === SessionType.WithProfile) {
      const response = await primeCacheWithProfile(newSessionData.profileId);

      if (response.error) {
        return;
      }

      invariant(response.data, 'Cannot fetch profile data');
    }
  };

  useEffect(() => {
    if (result.loading) {
      if (sessionData?.type === SessionType.WithProfile) {
        void update(sessionData);
        return;
      }

      return sessionDataVar.onNextChange(async function onNext(newSessionData) {
        await update(newSessionData);
      });
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle suspense
  if (args?.suspense) {
    if (result.loading) {
      // Do the same thing as the effect right above because the effect won't run
      // when we suspend.

      throw new Promise<void>((resolve) => {
        sessionDataVar.onNextChange(async (newSessionData) => {
          await update(newSessionData);
          resolve();
        });
      });
    }

    if (result.error) {
      throw result.error;
    }
  }

  return result;
}

function useProfileFromCache(data: SessionData | null) {
  const fill = useLazyFragmentVariables();

  const shouldFetchProfile = data?.type === SessionType.WithProfile;
  const profileId = data?.type === SessionType.WithProfile ? data.profileId : undefined;

  const {
    data: { result: profile } = { result: null },
    previousData: { result: previousProfile } = { result: null },
    error,
    refetch,
  } = useProfile(
    useLensApolloClient({
      fetchPolicy: 'cache-first',
      variables: fill({
        request: {
          forProfileId: profileId,
        },
      }),
      skip: !shouldFetchProfile,
    }),
  );

  const primeCacheWithProfile = (id: ProfileId) =>
    refetch(
      fill({
        request: {
          forProfileId: id,
        },
      }),
    );

  return [
    primeCacheWithProfile,
    {
      error,
      profile,
      previousProfile,
    },
  ] as const;
}

type UseProfileFromCacheData = ReturnType<typeof useProfileFromCache>[1];

function resultFrom(
  sessionData: SessionData | null,
  { error, profile, previousProfile }: UseProfileFromCacheData,
): ReadResult<Session, UnspecifiedError> {
  if (
    !sessionData ||
    (sessionData.type === SessionType.WithProfile && !profile && !previousProfile)
  ) {
    return {
      data: undefined,
      error: undefined,
      loading: true,
    };
  }

  if (error) {
    return {
      data: undefined,
      error: new UnspecifiedError(error),
      loading: false,
    };
  }

  switch (sessionData.type) {
    case SessionType.Anonymous:
      return {
        data: {
          type: SessionType.Anonymous,
          authenticated: false,
          lastLogoutReason: sessionData.lastLogoutReason,
        },
        error: undefined,
        loading: false,
      };

    case SessionType.JustWallet:
      return {
        data: {
          type: SessionType.JustWallet,
          authenticated: true,
          address: sessionData.address,
        },
        error: undefined,
        loading: false,
      };

    case SessionType.WithProfile:
      return {
        data: {
          type: SessionType.WithProfile,
          authenticated: true,
          address: sessionData.address,
          profile: profile ?? previousProfile ?? never('This should never happen.'),
        },
        error: undefined,
        loading: false,
      };
  }
}
