import {
  type Account,
  Role,
  evmAddress,
  useAccountsAvailable,
  useLogin,
} from '@lens-protocol/react';
import { signMessageWith } from '@lens-protocol/react/viem';
import { useWalletClient } from 'wagmi';

function LoginWith({ account, role }: { account: Account; role: Role }) {
  const { execute } = useLogin();
  const { data } = useWalletClient();

  return (
    <>
      {account.username?.value ?? account.address}
      &nbsp;
      <button
        type='button'
        onClick={() => {
          execute({
            accountOwner: {
              account: account.address,
              owner: account.owner,
            },
            signMessage: signMessageWith(data!),
          });
        }}
      >
        Select
      </button>
    </>
  );
}

export function LoginOptions({ address }: { address: string }) {
  const { data } = useAccountsAvailable({ managedBy: evmAddress(address) });

  return (
    <>
      <p>Log in one of the following Accounts</p>
      <ul>
        {data?.items.map((item) => (
          <li key={item.account.address}>
            <LoginWith
              account={item.account}
              role={item.__typename === 'AccountOwned' ? Role.AccountOwner : Role.AccountManager}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
