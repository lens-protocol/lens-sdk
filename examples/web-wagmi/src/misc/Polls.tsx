import {
  isPollPublication,
  PollPublication,
  publicationId,
  usePollDetails,
  usePollVote,
  usePublication,
} from '@lens-protocol/react-web';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { invariant, never } from '../utils';

function Poll({ publication }: { publication: PollPublication }) {
  const { data: poll, error: detailsError, loading } = usePollDetails({ publication });
  const { execute: vote, error: voteError, isPending } = usePollVote({ publication });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const choice = parseInt((formData.get('choice') as string) ?? never());

    await vote(choice);
  };

  if (loading) return <Loading />;

  if (detailsError) return <ErrorMessage error={detailsError} />;

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <legend>
          {poll.title} ({poll.isActive ? 'active' : 'closed'})
        </legend>

        {poll.choices.map((choice, idx) => (
          <label key={idx}>
            <input
              disabled={!poll.isActive}
              type={poll.isSingleChoice ? 'radio' : 'checkbox'}
              defaultChecked={choice.didVote}
              name="choice"
              value={idx}
            />
            &nbsp;{choice.label} ({choice.percentage.toPrecision(3)}%)
          </label>
        ))}

        <div>
          <button disabled={!poll.isActive || isPending} type="submit">
            Vote
          </button>

          {voteError && <pre>{voteError.message}</pre>}
        </div>

        <small style={{ display: 'inline-flex', alignItems: 'center', marginTop: '1rem' }}>
          <img
            src={`//cdn.stamp.fyi/avatar/${poll.space.id}?s=32`}
            style={{ borderRadius: '50%' }}
          />
          &nbsp;
          <a href={poll.url} target="_blank" rel="noreferrer">
            {poll.space.name}
          </a>
        </small>
      </fieldset>
    </form>
  );
}

export function Polls() {
  const {
    data: publication,
    error,
    loading,
  } = usePublication({ publicationId: publicationId('0x1b-0x0139-DA-efa430a5') });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  invariant(isPollPublication(publication), 'Expected a poll publication');

  return (
    <div>
      <h1>
        <code>Polls</code>
      </h1>

      <Poll publication={publication} />
    </div>
  );
}
