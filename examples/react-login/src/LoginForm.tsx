import {
  type AccountAvailable,
  type EvmAddress,
  evmAddress,
  useAccountsAvailable,
  useLogin,
} from '@lens-protocol/react';
import { signMessageWith } from '@lens-protocol/react/viem';
import { useModal } from 'connectkit';
import { useAccount, useWalletClient } from 'wagmi';

function LoginWith({
  signer,
  value,
}: {
  signer: EvmAddress;
  value: AccountAvailable;
}) {
  const { execute } = useLogin();
  const { data } = useWalletClient();

  const loginAs =
    value.__typename === 'AccountManaged'
      ? {
          accountManager: {
            account: value.account.address,
            manager: signer,
          },
        }
      : {
          accountOwner: {
            account: value.account.address,
            owner: signer,
          },
        };

  return (
    <button
      type='button'
      onClick={() => {
        execute({
          ...loginAs,
          signMessage: signMessageWith(data!),
        });
      }}
    >
      {value.account.username?.value ?? value.account.address}
    </button>
  );
}

function LoginOptions({ address }: { address: string }) {
  const { data } = useAccountsAvailable({
    managedBy: evmAddress(address),
    suspense: true,
  });

  return (
    <>
      <p>Select an account</p>
      <ul>
        {data.items.map((item) => (
          <li key={item.account.address}>
            <LoginWith signer={evmAddress(address)} value={item} />
          </li>
        ))}
      </ul>
    </>
  );
}

export function LoginForm() {
  const { address } = useAccount();
  const { setOpen } = useModal();

  if (!address) {
    return (
      <button type='button' onClick={() => setOpen(true)}>
        Connect
      </button>
    );
  }

  return <LoginOptions address={address} />;
}
