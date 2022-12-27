import { useActiveProfile, useWalletLogin, WalletType } from '@lens-protocol/react';
import Head from 'next/head';
import { useAccount, useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export default function Home() {
  const login = useWalletLogin();
  const { data: profile } = useActiveProfile();

  const { isDisconnected } = useAccount();
  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });
  const onLoginClick = async () => {
    if (isDisconnected) {
      const { connector } = await connectAsync();

      if (connector instanceof InjectedConnector) {
        const signer = await connector.getSigner();
        login(signer, WalletType.INJECTED);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Lens SDK - NextJS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌿</text></svg>"
        />
      </Head>
      <header>
        <h1>Lens SDK</h1>

        <p>
          Example app that demonstrates a possible integration strategy with&nbsp;
          <a href="https://nextjs.org/">NextJS</a>.
        </p>
      </header>
      <main>
        {profile && (
          <p>
            Welcome <b>@{profile.handle}</b>
          </p>
        )}
        {!profile && <button onClick={onLoginClick}>Log in</button>}
      </main>
    </>
  );
}
