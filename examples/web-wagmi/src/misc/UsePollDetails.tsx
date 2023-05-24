import {
  isPollPublication,
  PollPublication,
  publicationId,
  usePollDetails,
  usePublication,
} from '@lens-protocol/react-web';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { invariant } from '../utils';

function Poll({ publication }: { publication: PollPublication }) {
  const { data: poll, error, loading } = usePollDetails({ publication });

  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <form>
      <fieldset>
        <legend>{poll.title}</legend>

        {poll.choices.map((choice, idx) => (
          <label key={idx}>
            <input
              disabled={!poll.isActive}
              type={poll.isSingleChoice ? 'radio' : 'checkbox'}
              checked={choice.didVote} // TODO use defaultChecked once possible to vote from SDK
              readOnly // then also remove
              name="choice"
              value={idx}
            />
            &nbsp;{choice.label} ({choice.percentage.toPrecision(3)}%)
          </label>
        ))}

        {/* <div>
          <button disabled={!poll.isActive} type="submit">
            Vote
          </button>
        </div> */}

        <small style={{ display: 'inline-flex', alignItems: 'center', marginTop: '1rem' }}>
          Created by:&nbsp;
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

export function UsePollDetails() {
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
        <code>usePollDetails</code>
      </h1>

      <Poll publication={publication} />
    </div>
  );
}
