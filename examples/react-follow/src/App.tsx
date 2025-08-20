import { AccountsToFollow } from './AccountToFollow';

export function App() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Lens Follow Example</h1>
      <hr style={{ margin: '30px 0' }} />
      <AccountsToFollow />
    </div>
  );
}
