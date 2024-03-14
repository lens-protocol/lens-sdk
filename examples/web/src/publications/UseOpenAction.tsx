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
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { Logs } from '../components/Logs';
import { RequireProfileSession, RequireWalletSession } from '../components/auth';
import { PublicationCard } from '../components/cards';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useIrysUploadHandler } from '../hooks/useIrysUploader';
import { useLogs } from '../hooks/useLogs';
import { invariant } from '../utils';

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
    return <ErrorMessage error={error} />;
  }

  const collect = async (sponsored?: boolean) => {
    const result = await execute({ publication, sponsored });

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
      <div>
        <RequireProfileSession message="Login with a profile to explore more options">
          <p>As Lens Profile you can perform:</p>
          <button
            onClick={() => collect(false)}
            disabled={publication.operations.canCollect === TriStateValue.No}
          >
            Self-funded collect
          </button>
          &nbsp;
          <button
            onClick={() => collect(true)}
            disabled={publication.operations.canCollect === TriStateValue.No}
          >
            Gasless collect
          </button>
        </RequireProfileSession>
      </div>
      <div>
        <RequireWalletSession message="Login with just a wallet to explore more options">
          <p>As wallet you can perform:</p>
          <button
            onClick={() => collect()}
            disabled={publication.operations.canCollect === TriStateValue.No}
          >
            Public collect
          </button>
        </RequireWalletSession>
      </div>
    </div>
  );
}

export function UseOpenAction() {
  const uploadMetadata = useIrysUploadHandler();
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
    const uri = await uploadMetadata(metadata);

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
        <RequireProfileSession>
          {!id && (
            <>
              {logs.length === 0 && (
                <button type="button" onClick={prepare}>
                  Prepare example
                </button>
              )}
              <Logs logs={logs} />
            </>
          )}
        </RequireProfileSession>
      )}

      {id && <TestScenario id={id} />}
    </div>
  );
}
