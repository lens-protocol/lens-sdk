import {
  ClaimHandleArgs,
  ClaimProfileWithHandleErrorReasonType,
  ReservedClaimable,
  useCanClaimHandle,
  useClaimHandle,
  useUpgradeCredentials,
} from '@lens-protocol/react-web';
import React from 'react';
import { toast } from 'react-hot-toast';

import { RequireWalletSession } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { formatProfileIdentifier } from '../utils/formatProfileIdentifier';

function ClaimHandleOptions() {
  const { data, loading, error } = useCanClaimHandle();
  const { execute, loading: claiming } = useClaimHandle();
  const { execute: upgrade } = useUpgradeCredentials();

  const claim = async (args: ClaimHandleArgs) => {
    const result = await execute(args);

    // check for failure scenarios
    if (result.isFailure()) {
      if (result.error.name === 'ClaimHandleError') {
        switch (result.error.reason) {
          case ClaimProfileWithHandleErrorReasonType.HandleAlreadyClaimed:
            toast.error(`The ${result.error.localName} already claimed`);
            return;
          case ClaimProfileWithHandleErrorReasonType.HandleAlreadyExists:
            toast.error(`The ${result.error.localName} already exists`);
            return;
          case ClaimProfileWithHandleErrorReasonType.HandleReserved:
            toast.error(`The ${result.error.localName} is reserved`);
            return;

          case ClaimProfileWithHandleErrorReasonType.CanNotFreeText:
          case ClaimProfileWithHandleErrorReasonType.ClaimNotFound:
          case ClaimProfileWithHandleErrorReasonType.ClaimNotLinkedToWallet:
          case ClaimProfileWithHandleErrorReasonType.ClaimTimeExpired:
          case ClaimProfileWithHandleErrorReasonType.ContractExecuted:
            toast.error(result.error.message);
            return;
        }
      }
      toast.error(result.error.message);
      return;
    }

    const profile = result.value;

    // upgrade the credentials to a full profile session
    const upgraded = await upgrade({
      profileId: profile.id,
    });

    // check for failure scenarios
    if (upgraded.isFailure()) {
      toast.error(upgraded.error.message);
      return;
    }

    // successfully logged-in with new profile
    toast.success(`Successfully logged-in as: ${formatProfileIdentifier(profile)}`);
  };

  const claimReserved = (reserved: ReservedClaimable) => claim({ reserved });

  const claimFreeText = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const localName = formData.get('localName') as string;

    await claim({ localName });
  };

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      {data.reserved.length === 0 && data.canMintProfileWithFreeTextHandle === false && (
        <p>You cannot claim an handle at this time. Please try again later.</p>
      )}

      {data.reserved.length > 0 && (
        <fieldset>
          <legend>Reserved handles</legend>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              gap: '1rem',
            }}
          >
            {data.reserved.map((handle) => (
              <button
                key={handle.id}
                value={handle.id}
                type="button"
                disabled={claiming}
                onClick={() => claimReserved(handle)}
              >
                {handle.withHandle}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {data.canMintProfileWithFreeTextHandle && (
        <form onSubmit={claimFreeText}>
          <fieldset>
            <legend>Free text handle</legend>
            <label>
              Local name:&nbsp;
              <input type="text" name="localName" placeholder="wagmi" disabled={claiming} />
            </label>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <button disabled={claiming}>Submit</button>
            </div>
          </fieldset>
        </form>
      )}
    </>
  );
}

export function UseClaimHandle() {
  return (
    <div>
      <h1>
        <code>useClaimHandle</code>
      </h1>
      <div>
        <RequireWalletSession message="To try this example you need to login with with just a wallet session.">
          <ClaimHandleOptions />
        </RequireWalletSession>
      </div>
    </div>
  );
}
