import { textOnly } from '@lens-protocol/metadata';
import { publicationId, useCreateQuote, usePublication } from '@lens-protocol/react-web';
import { toast } from 'react-hot-toast';

import { RequireProfileSession } from '../components/auth';
import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { uploadJson } from '../upload';
import { never } from '../utils';
import { PublicationCard } from './components/PublicationCard';

function QuoteComposer() {
  const {
    data: publication,
    error: publicationError,
    loading: publicationLoading,
  } = usePublication({ forId: publicationId('0x05-0x02') });

  const { execute, loading, error } = useCreateQuote();

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // create post metadata
    const metadata = textOnly({
      content: formData.get('content') as string,
    });

    // publish post
    const result = await execute({
      quoteOn: publication?.id ?? never('publication is not loaded'),
      metadata: await uploadJson(metadata),
      sponsored: formData.get('sponsored') === 'on',
    });

    // check for failure scenarios
    if (result.isFailure()) {
      toast.error(result.error.message);
      return;
    }

    // wait for full completion
    const completion = await result.value.waitForCompletion();

    // check for late failures
    if (completion.isFailure()) {
      toast.error(completion.error.message);
      return;
    }

    // quote was created
    const quote = completion.value;
    toast.success(`Quote ID: ${quote.id}`);
  };

  if (publicationLoading) return <Loading />;

  if (publicationError) return <ErrorMessage error={publicationError} />;

  return (
    <form onSubmit={submit}>
      <PublicationCard publication={publication} />

      <fieldset>
        <textarea
          name="content"
          minLength={1}
          required
          rows={3}
          placeholder="What's happening?"
          style={{ resize: 'none' }}
          disabled={loading}
        ></textarea>

        <label>
          <input
            type="checkbox"
            name="sponsored"
            disabled={loading}
            value="on"
            defaultChecked={true}
          />
          sponsored
        </label>

        <button type="submit" disabled={loading}>
          Quote
        </button>

        {!loading && error && <pre>{error.message}</pre>}
      </fieldset>
    </form>
  );
}

export function UseCreateQuote() {
  return (
    <div>
      <h1>
        <code>useCreateQuote</code>
      </h1>

      <RequireProfileSession message="Log in to create a quote.">
        <QuoteComposer />
      </RequireProfileSession>
    </div>
  );
}
