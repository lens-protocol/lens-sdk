import { Provider } from '@lens-protocol/react';
import { client } from './client';

export function App() {
  return (
    <Provider client={client}>
      <header>
        <h1>{{description}}</h1>
      </header>
      <div>
        <p>
          Edit <code>src/App.tsx</code>.
        </p>
      </div>
    </Provider>
  );
}
