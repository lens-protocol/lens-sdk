import { textOnly } from '@lens-protocol/metadata';
import {
  Amount,
  AnyPublication,
  OpenActionType,
  useCreatePost,
  useCurrencies,
  useLazyPublication,
  useApproveModule,
  useOpenAction,
  OpenActionKind,
  InsufficientAllowanceError,
} from '@lens-protocol/react-web';
import { toast } from 'react-hot-toast';

import { Logs } from '../components/Logs';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useLogs } from '../hooks/useLogs';
import { PublicationCard } from '../publications/components/PublicationCard';
import { uploadJson } from '../upload';
import { never } from '../utils';

function TestScenario({ publication }: { publication: AnyPublication }) {
  const { execute: collect, loading: collecting } = useOpenAction({
    action: {
      kind: OpenActionKind.COLLECT,
    },
  });
  const { execute: approve, loading: approving } = useApproveModule();

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
      const outcome = await approve({
        on: publication,
      });

      if (outcome.isFailure()) {
        toast.error(outcome.error.message);
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
  const { data: currencies, loading, error } = useCurrencies();
  const { data: collectable, execute: fetch } = useLazyPublication();
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
    const uri = await uploadJson(metadata);

    log('Creating collectable test post...');
    const result = await post({
      metadata: uri,
      actions: [
        {
          type: OpenActionType.SIMPLE_COLLECT,
          amount: Amount.erc20(currency, 1),
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

    await fetch({ forId: completion.value.id });
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

      {!collectable && (
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

      {collectable && <TestScenario publication={collectable} />}
    </div>
  );
}
