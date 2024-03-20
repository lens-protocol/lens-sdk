import { textOnly } from '@lens-protocol/metadata';
import {
  Amount,
  InsufficientAllowanceError,
  OpenActionKind,
  OpenActionType,
  PublicationId,
  useApproveModule,
  useCreatePost,
  useCurrencies,
  useOpenAction,
  usePublication,
} from '@lens-protocol/react-web';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAccount } from 'wagmi';

import { Logs } from '../components/Logs';
import { PublicationCard } from '../components/cards';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useIrysUploadHandler } from '../hooks/useIrysUploader';
import { useLogs } from '../hooks/useLogs';
import { never } from '../utils';

function TestScenario({ publicationId }: { publicationId: PublicationId }) {
  const { data: publication, loading, error } = usePublication({ forId: publicationId });
  const { execute: collect, loading: collecting } = useOpenAction({
    action: {
      kind: OpenActionKind.COLLECT,
    },
  });
  const { execute: approve, loading: approving } = useApproveModule();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const run = async () => {
    const result = await collect({ publication });

    if (result.isSuccess()) {
      const completion = await result.value.waitForCompletion();

      if (completion.isFailure()) {
        toast.error(completion.error.message);
        return;
      }
      toast.success(`You successfully collected: ${publication.id}`);
      return;
    }

    if (result.error instanceof InsufficientAllowanceError) {
      const approval = await approve({
        on: publication,
      });

      if (approval.isFailure()) {
        toast.error(approval.error.message);
        return;
      }

      toast.success('You successfully approved the module');

      // retry to collect
      await run();
      return;
    }

    toast.error(result.error.message);
    return;
  };

  return (
    <div>
      <PublicationCard publication={publication} />
      <button onClick={run} disabled={collecting || approving}>
        Collect
      </button>
    </div>
  );
}

export function UseApproveModule() {
  const uploadMetadata = useIrysUploadHandler();
  const [id, setId] = useState<PublicationId | undefined>();
  const { address } = useAccount();
  const { data: currencies, loading, error } = useCurrencies();
  const { logs, clear, log } = useLogs();

  const { execute: post } = useCreatePost();

  const prepare = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clear();

    const formData = new FormData(event.currentTarget);
    const currencyAddress = formData.get('currency') as string;
    const currency =
      currencies?.find((c) => c.address === currencyAddress) ?? never('called too early');
    log(`Using ${currency.symbol}: ${currency.address}`);

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
          amount: Amount.erc20(currency, 1),
          followerOnly: false,
          collectLimit: 5,
          recipient: address,
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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div>
      <h1>
        <code>useApproveModule</code>
      </h1>

      {!id && (
        <>
          {logs.length === 0 && (
            <form onSubmit={prepare}>
              <label>
                Currency&nbsp;
                <select name="currency">
                  {currencies?.map((currency) => (
                    <option key={currency.address} value={currency.address}>
                      {currency.symbol}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit">Prepare example</button>
            </form>
          )}

          <Logs logs={logs} />
        </>
      )}

      {id && <TestScenario publicationId={id} />}
    </div>
  );
}
