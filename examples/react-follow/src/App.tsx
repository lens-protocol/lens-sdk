import { useAuthenticatedUser } from '@lens-protocol/react';
import { LoginForm } from './components/LoginForm';
import { MyAccount } from './MyAccount';
import { AccountsToFollow } from './ToFollow';

export function App() {
  const { data } = useAuthenticatedUser({ suspense: true });

  if (data) {
    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Lens Follow Example</h1>
        <MyAccount address={data.address} />
        <hr style={{ margin: '30px 0' }} />
        <AccountsToFollow />
      </div>
    );
  }

  return <LoginForm />;
}
