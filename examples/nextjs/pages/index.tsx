import Head from 'next/head';

import { LoginButton, WhenLoggedInWithProfile } from '../components/auth';

export default function Home() {
  return (
    <>
      <Head>
        <title>Lens SDK - Next.js</title>
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
        <LoginButton />
        <WhenLoggedInWithProfile>
          {({ profile }) => <div>{`Welcome @${profile.handle}`}</div>}
        </WhenLoggedInWithProfile>
      </main>
    </>
  );
}
