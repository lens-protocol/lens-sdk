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

import { useLensApolloClient, useSourcesFromConfig } from '../helpers/arguments';
import { ReadResult } from '../helpers/reads';

export type { Session, WalletData };

/**
 * `useCurrentSession` is a hook that lets you access the current {@link Session}
 *
 * **Pro-tip**: Use this hook to determine if the user is authenticated or not, and if they have a profile or not.
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
 *   const { data, error, loading } = useCurrentSession();
 *
 *   if (loading) return <p>Loading...</p>;
 *
 *   if (error) return <p>Error: {error.message}</p>;
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

  const { data, error } = useGetProfile(
    useLensApolloClient({
      variables: useSourcesFromConfig({
        request: {
          profileId: session?.type === SessionType.WithProfile ? session.profile.id : undefined,
        },
      }),
      fetchPolicy: 'cache-only',
      skip: !session || session.type !== SessionType.WithProfile,
    }),
  );

  if (session === null) {
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

  invariant(data?.result, 'Profile not found in cache.');
  invariant(isProfileOwnedByMe(data.result), 'Profile not owned by the active wallet.');

  return {
    data: authenticatedProfile(session.wallet, data.result),
    error: undefined,
    loading: false,
  };
}
