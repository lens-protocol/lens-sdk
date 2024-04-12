import { useResolveAddress } from '@lens-protocol/react-web';
import { toast } from 'react-hot-toast';

export function UseResolveAddress() {
  const { execute, loading } = useResolveAddress();

  const resolve = async () => {
    const result = await execute({ handle: 'lens/wagmi' });

    if (result.isFailure()) {
      toast.error(result.error.message);
      return;
    }

    toast.success(`Resolved address: ${String(result.value)}`);
  };

  return (
    <div>
      <h1>
        <code>useResolveAddress</code>
      </h1>

      <button onClick={resolve} disabled={loading}>
        Resolve lens/wagmi
      </button>
    </div>
  );
}
