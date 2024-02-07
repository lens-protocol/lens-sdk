import { useValidateHandle } from '@lens-protocol/react-web';
import { toast } from 'react-hot-toast';

export function UseValidateHandle() {
  const { execute, loading } = useValidateHandle();

  const validate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const localName = formData.get('localName') as string;

    const result = await execute({ localName });

    if (result.isFailure()) {
      toast.error(result.error.message);
      return;
    }

    toast.success(`You can create a new profile with handle: ${localName}`);
    return;
  };

  return (
    <div>
      <h1>
        <code>useValidateHandle</code>
      </h1>

      <form onSubmit={validate}>
        <fieldset>
          <legend>New handle</legend>
          <label>
            Local name:&nbsp;
            <input type="text" name="localName" placeholder="wagmi" disabled={loading} />
          </label>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <button disabled={loading}>Validate</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
