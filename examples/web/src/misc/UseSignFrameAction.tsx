import {
  FramesEip721TypedDataSpec,
  Profile,
  publicationId,
  uri,
  useSignFrameAction,
} from '@lens-protocol/react-web';
import { toast } from 'react-hot-toast';

import { RequireProfileSession } from '../components/auth';

export function UseSignFrameActionInner({ profile }: { profile: Profile }) {
  const { data, execute, loading } = useSignFrameAction();
  const identityToken = useIdentityToken();

  const sign = async () => {
    const result = await execute({
      actionResponse: '0x0000000000000000000000000000000000000000',
      buttonIndex: 2,
      inputText: 'Hello, World!',
      profileId: profile.id,
      pubId: publicationId('0x01-0x01'),
      specVersion: FramesEip721TypedDataSpec.OnePointOnePointOne,
      state: '{"counter":1,"idempotency_key":"431b8b38-eb4d-455b"}',
      url: uri('https://mylensframe.xyz'),
    });

    if (result.isFailure()) {
      toast.error(result.error.message);
      return;
    }

    const action = {
      ...result.value,
      identityToken,
    };

    const response = await fetch('https://mylensframe.xyz/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action),
    });
  };

  return (
    <div>
      <button onClick={sign} disabled={loading}>
        Sign the frame action
      </button>
      {data && <p>{data.signature}</p>}
    </div>
  );
}

export function UseSignFrameAction() {
  return (
    <div>
      <h1>
        <code>useSignFrameAction</code>
      </h1>

      <RequireProfileSession message="Log in to view this example.">
        {({ profile }) => <UseSignFrameActionInner profile={profile} />}
      </RequireProfileSession>
    </div>
  );
}
