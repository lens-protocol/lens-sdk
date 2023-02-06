import { Link } from 'react-router-dom';
import { useRecentTransactions } from '@lens-protocol/react';
import { LoginButton } from '../components/auth/LoginButton';
import { WhenLoggedInWithProfile, WhenLoggedOut } from '../components/auth/auth';

function UseRecentTransactionsInner() {
  const { transactions, clearCompleted } = useRecentTransactions();

  return (
    <>
      <p>
        {
          'Perform a transaction in order to see + clear it here. An example of a transaction could be '
        }

        <Link to="/publications/useCreateMirror">mirroring a post.</Link>
      </p>

      {transactions.length === 0 && <p>No recent transactions</p>}

      {transactions.length > 0 && (
        <button
          onClick={() => {
            clearCompleted();
          }}
        >
          Clear completed transactions
        </button>
      )}

      {transactions.map((t) => {
        return (
          <div key={t.id}>
            <p>Type: {t.request.kind}</p>
            <p>
              Status: {t.status}
              {t.completed && ' (Will be cleared)'}
            </p>

            <code>{JSON.stringify(t.request, null, 2)}</code>
          </div>
        );
      })}
    </>
  );
}

export function UseRecentTransactions() {
  return (
    <div>
      <h1>
        <code>useRecentTransactions</code>
      </h1>

      <WhenLoggedInWithProfile>{() => <UseRecentTransactionsInner />}</WhenLoggedInWithProfile>

      <WhenLoggedOut>
        <div>
          <p>You must be logged in to use this example.</p>
          <LoginButton />
        </div>
      </WhenLoggedOut>
    </div>
  );
}
