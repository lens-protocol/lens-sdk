import { textOnly } from '@lens-protocol/metadata';
import {
  isPostPublication,
  OpenActionKind,
  OpenActionType,
  PublicationId,
  TriStateValue,
  useCreatePost,
  useOpenAction,
  usePublication,
} from '@lens-protocol/react-web';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

import { Loading } from '../components/loading/Loading';
import { uploadJson } from '../upload';
import { invariant } from '../utils';
import { PublicationCard } from './components/PublicationCard';

function TestScenario({ id }: { id: PublicationId }) {
  const { data: publication, loading, error } = usePublication({ forId: id });
  const { execute } = useOpenAction({
    action: {
      kind: OpenActionKind.COLLECT,
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const collect = async () => {
    const result = await execute({ publication });

    if (result.isFailure()) {
      toast.error(result.error.message);
      return;
    }

    const completion = await result.value.waitForCompletion();

    if (completion.isFailure()) {
      toast.error(completion.error.message);
      return;
    }

    toast.success(`You successfully collected: ${publication.id}`);
  };

  invariant(isPostPublication(publication), 'Publication is not a post');

  return (
    <div>
      <PublicationCard publication={publication} />
      <button onClick={collect} disabled={publication.operations.canCollect === TriStateValue.No}>
        Collect
      </button>
      <div className="notice">
        <p>
          At the time of this example writing there 2 known API issues:<br></br>
        </p>
        <ul>
          <li>
            <code>PublicationStats.collects</code> (alias) returns <code>0</code> when mined.
          </li>
          <li>
            <code>PublicationOperations.canCollect</code> (alias) returns always <code>false</code>
          </li>
        </ul>
      </div>
    </div>
  );
}

function useLogs() {
  const [logs, setLogs] = useState<string[]>([]);

  const clear = () => setLogs([]);

  const log = (message: string) => {
    setLogs((previous) => [...previous, message]);
  };

  return {
    logs,
    clear,
    log,
  };
}

export function UseOpenAction() {
  const { logs, clear, log } = useLogs();
  const [id, setId] = useState<PublicationId | undefined>();

  const { execute: post } = useCreatePost();

  const prepare = async () => {
    setId(undefined);
    clear();

    log('Creating metadata for test post...');
    const metadata = textOnly({
      content: 'Hello, world!',
    });

    log('Uploading metadata...');
    const uri = await uploadJson(metadata);

    log('Creating collectable test post...');
    const result = await post({
      metadata: uri,
      actions: [
        {
          type: OpenActionType.SIMPLE_COLLECT,
          followerOnly: false,
          collectLimit: 5,
        },
      ],
    });

    if (result.isFailure()) {
      log(result.error.message);
      return;
    }

    log('Waiting for tx to be mined and indexed...');
    const completion = await result.value.waitForCompletion();

    if (completion.isFailure()) {
      log(completion.error.message);
      return;
    }

    setId(completion.value.id);
  };

  return (
    <div>
      <h1>
        <code>useOpenAction</code>
      </h1>

      {!id && (
        <>
          {logs.length === 0 && (
            <button type="button" onClick={prepare}>
              Prepare example
            </button>
          )}
          {logs.length > 0 && (
            <pre>
              {logs.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </pre>
          )}
        </>
      )}

      {id && <TestScenario id={id} />}
    </div>
  );
}
