import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from '@lens-protocol/api';
import { ReactNode } from 'react';

type LensClientProps = {
  children: ReactNode;
};

export function LensClient({ children }: LensClientProps) {
  const client = createApolloClient({
    backendURL: 'https://api.lens.dev',
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
