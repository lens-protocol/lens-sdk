import { publicationId, usePublication } from '@lens-protocol/react-web';
import { Suspense, startTransition, useState } from 'react';

import { PublicationCard } from '../components/cards';
import { Loading } from '../components/loading/Loading';

function UsePublicationInner({ id }: { id: string }) {
  const { data, error } = usePublication({ forId: publicationId(id), suspense: true });

  if (error) {
    return <p>Publication not found.</p>;
  }

  return <PublicationCard publication={data} />;
}

export function UsePublication() {
  const [id, setId] = useState('0x36-0x3f');

  const update = (event: React.ChangeEvent<HTMLInputElement>) =>
    startTransition(() => {
      if (event.target.value.length > 0) {
        setId(event.target.value);
      }
    });

  return (
    <div>
      <h1>
        <code>usePublication</code>
      </h1>

      <label>
        Publication ID <input type="text" name="localName" defaultValue={id} onChange={update} />
      </label>

      <Suspense fallback={<Loading />}>
        <UsePublicationInner id={id} />
      </Suspense>
    </div>
  );
}
