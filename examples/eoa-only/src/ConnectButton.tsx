import { evmAddress, useImpersonation } from '@lens-protocol/react';

import { useModal } from 'connectkit';

export function ConnectButton() {
  const { execute } = useImpersonation();
  const { setOpen } = useModal({
    onConnect: async ({ address }) => {
      if (!address) {
        throw new Error('Address is required to connect');
      }
      await execute({ signer: evmAddress(address) });
    },
  });

  return (
    <button type='button' onClick={() => setOpen(true)}>
      Connect
    </button>
  );
}
