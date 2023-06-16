import {
  FollowOperation,
  Profile,
  ProfileOwnedByMe,
  SelfFundedOperation,
  supportsSelfFundedFallback,
  useFollow,
  useSelfFundedFallback,
} from '@lens-protocol/react-web';
import { useState } from 'react';

type UseFollowWithSelfFundedFallbackArgs = {
  followee: Profile;
  follower: ProfileOwnedByMe;
};

type PossibleError = FollowOperation['error'] | SelfFundedOperation['error'];

export function useFollowWithSelfFundedFallback({
  followee,
  follower,
}: UseFollowWithSelfFundedFallbackArgs) {
  const [error, setError] = useState<PossibleError>(undefined);
  const gasless = useFollow({ followee, follower });

  const selfFunded = useSelfFundedFallback();

  const execute = async () => {
    // it won't ask to sign if can be performed via proxy-action
    const gaslessResult = await gasless.execute();

    // did the gasless request fail?
    if (gaslessResult.isFailure()) {
      // was it rejected? is there an fallback?
      if (supportsSelfFundedFallback(gaslessResult.error)) {
        // ask your confirmation before using their funds
        const shouldPayFor = window.confirm(
          'It was not possible to cover the gas costs at this time.\n\n' +
            'Do you wish to continue with your MATIC?',
        );

        if (shouldPayFor) {
          // initiate self-funded, will require signature
          const selfFundedResult = await selfFunded.execute(gaslessResult.error.fallback);

          if (selfFundedResult.isFailure()) {
            setError(selfFundedResult.error);
          }
        }
        return;
      }

      // any other error from
      setError(gaslessResult.error);
    }
  };

  return {
    execute,
    error,
    isPending: gasless.isPending || selfFunded.isPending,
  };
}
