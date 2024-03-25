import {
  FrameVerifySignature,
  FrameVerifySignatureResult,
  LensClient,
  development,
} from '@lens-protocol/client';
import {
  Profile,
  publicationId,
  uri,
  useIdentityToken,
  useSignFrameAction,
  useStorage,
} from '@lens-protocol/react-web';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

import { RequireProfileSession } from '../components/auth';

function ServerVerifySignature({ toVerify }: { toVerify: FrameVerifySignature }) {
  const [verified, setVerified] = useState<FrameVerifySignatureResult>();
  const storage = useStorage();
  const client = useMemo(
    () =>
      new LensClient({
        environment: development,
        storage,
      }),
    [storage],
  );

  useEffect(() => {
    void (async () => {
      const status = await client.frames.verifyFrameSignature(toVerify);
      setVerified(status);
    })();
  }, [client, toVerify]);

  return <div>Server verifications status: {verified}</div>;
}

export function UseSignFrameActionInner({ profile }: { profile: Profile }) {
  const [frameActionToVerify, setFrameActionToVerify] = useState<FrameVerifySignature>();

  const { data, execute, loading } = useSignFrameAction();
  const identityToken = useIdentityToken();

  const sign = async () => {
    const result = await execute({
      actionResponse: '0x0000000000000000000000000000000000000000',
      buttonIndex: 2,
      inputText: 'Hello, World!',
      profileId: profile.id,
      pubId: publicationId('0x01-0x01'),
      specVersion: '1.0.0',
      state: '{"counter":1,"idempotency_key":"431b8b38-eb4d-455b"}',
      url: uri('https://mylensframe.xyz'),
    });

    if (result.isFailure()) {
      toast.error(result.error.message);
      return;
    }

    const { signature, signedTypedData } = result.value;

    if (!identityToken) {
      throw new Error('No identity token found');
    }

    setFrameActionToVerify({
      signature,
      signedTypedData,
      identityToken,
    });
  };

  return (
    <div>
      <button onClick={sign} disabled={loading}>
        Sign the frame action
      </button>
      {data && <p>Signature: {data.signature}</p>}
      {frameActionToVerify && <ServerVerifySignature toVerify={frameActionToVerify} />}
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
