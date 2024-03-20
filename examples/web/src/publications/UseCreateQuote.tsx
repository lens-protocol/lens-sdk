import { textOnly } from '@lens-protocol/metadata';
import { publicationId, useCreateQuote, useLazyPublication } from '@lens-protocol/react-web';
import { toast } from 'react-hot-toast';

import { RequireProfileSession } from '../components/auth';
import { PublicationCard } from '../components/cards';
import { useIrysUploadHandler } from '../hooks/useIrysUploader';

const target = publicationId('0x56-0x02');

function QuoteComposer() {
  const uploadMetadata = useIrysUploadHandler();
  const { execute: load, data } = useLazyPublication();
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
      quoteOn: target,
      metadata: await uploadMetadata(metadata),
      sponsored: formData.get('sponsored') === 'on',
    });

    // check for failure scenarios
    if (result.isFailure()) {
      toast.error(result.error.message);
      return;
    }

    toast.success(`Quote broadcasted, waiting for completion...`);

    // wait for full completion
    const completion = await result.value.waitForCompletion();

    // check for late failures
    if (completion.isFailure()) {
      toast.error(completion.error.message);
      return;
    }

    // quote was created
    const quote = completion.value;
    await load({ forId: quote.id });

    toast.success(`Quote ID: ${quote.id}`);
  };

  return (
    <>
      {data && <PublicationCard publication={data} />}
      <form onSubmit={submit}>
        <fieldset>
          <legend>Quote of {target}</legend>
          <textarea
            name="content"
            minLength={1}
            required
            rows={3}
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
            Post
          </button>

          {!loading && error && <pre>{error.message}</pre>}
        </fieldset>
      </form>
    </>
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
