import type { SessionClient } from '@lens-social/client';
import { useEffect, useState } from 'react';
import { useLensContext } from '../context';
import { ReadResult } from '../helpers';

export function useSessionClient(): ReadResult<SessionClient | null> {
  const { client } = useLensContext();
  const [state, setState] = useState<ReadResult<SessionClient | null>>(ReadResult.Initial());

  useEffect(() => {
    const session = client.resumeSession();

    session.match(
      (sessionClient) => setState({ data: sessionClient, loading: false, error: undefined }),
      (_) => setState({ data: null, loading: false, error: undefined }),
    );
  }, [client]);

  return state;
}
