import { useAuthenticatedUser } from '@lens-protocol/react';
import { LoginForm } from './LoginForm';
import { MyAccount } from './MyAccount';

export function App() {
  const { data } = useAuthenticatedUser({ suspense: true });

  if (data) {
    return <MyAccount address={data.address} />;
  }

  return <LoginForm />;
}
